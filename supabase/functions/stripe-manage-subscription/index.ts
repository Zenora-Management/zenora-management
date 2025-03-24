
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.6.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, user_id, subscription_id } = await req.json();

    if (!action) {
      throw new Error("Missing action parameter");
    }

    if (!user_id) {
      throw new Error("Missing user_id parameter");
    }

    if (!subscription_id) {
      throw new Error("Missing subscription_id parameter");
    }

    // Verify that the subscription belongs to this user
    const { data: subscriptionData, error: fetchError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user_id)
      .eq("stripe_subscription_id", subscription_id)
      .single();

    if (fetchError || !subscriptionData) {
      throw new Error("Subscription not found or does not belong to this user");
    }

    let result;

    switch (action) {
      case "cancel": {
        // Cancel the subscription at the end of the current period
        result = await stripe.subscriptions.update(subscription_id, {
          cancel_at_period_end: true,
        });

        // Update the status in our database
        await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user_id);

        break;
      }

      case "reactivate": {
        // Reactivate a canceled subscription
        result = await stripe.subscriptions.update(subscription_id, {
          cancel_at_period_end: false,
        });

        // Update the status in our database
        await supabase
          .from("subscriptions")
          .update({
            status: "active",
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user_id);

        break;
      }

      case "get": {
        // Get subscription details
        result = await stripe.subscriptions.retrieve(subscription_id);
        break;
      }

      default:
        throw new Error(`Unsupported action: ${action}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        data: result 
      }),
      {
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        },
      }
    );
  } catch (error) {
    console.error("Error managing subscription:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 400,
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        },
      }
    );
  }
});
