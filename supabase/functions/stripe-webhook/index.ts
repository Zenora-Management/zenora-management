import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.6.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
if (!stripeWebhookSecret) {
  console.warn("Warning: STRIPE_WEBHOOK_SECRET is not set. Webhook signature verification will be skipped.");
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

serve(async (req) => {
  try {
    // Get the signature from the header
    const signature = req.headers.get("stripe-signature");
    if (!signature && stripeWebhookSecret) {
      return new Response("Missing stripe-signature header", { status: 400 });
    }

    // Get the request body
    const body = await req.text();

    // Verify the event (if webhook secret is provided)
    let event;
    if (stripeWebhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
      } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response(`Webhook signature verification failed: ${err.message}`, { status: 400 });
      }
    } else {
      // If no webhook secret, parse the body directly (not recommended for production)
      event = JSON.parse(body);
    }

    // Handle the event
    console.log(`Received event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata.user_id;
        const subscriptionId = session.subscription;

        if (userId && subscriptionId) {
          // Get customer details from the session
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const customerId = subscription.customer as string;

          // Get plan details
          const priceId = subscription.items.data[0].price.id;
          let planType = "client";  // Default to client plan
          let planInterval = "month";

          // Map price ID to plan type (customize based on your Stripe products)
          if (priceId.includes("discount")) {
            planType = "discount";
          } else if (priceId.includes("enterprise")) {
            planType = "enterprise";
          }

          // Map interval
          if (subscription.items.data[0].price.recurring?.interval === "year") {
            planInterval = "year";
          }

          // Insert or update subscription record with access permission enabled
          const { error } = await supabase
            .from("subscriptions")
            .upsert({
              user_id: userId,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              plan_type: planType,
              plan_interval: planInterval,
              status: subscription.status,
              has_access_permission: true, // Grant access with active subscription
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            }, { onConflict: "user_id" });

          if (error) {
            console.error("Error updating subscription in database:", error);
          } else {
            console.log(`Subscription created for user ${userId}`);
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        // Get the user ID from Supabase
        const { data: subscriptionData, error: fetchError } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (fetchError || !subscriptionData) {
          console.error("Error fetching user for subscription:", fetchError);
          break;
        }

        const userId = subscriptionData.user_id;

        // Set access permission based on subscription status
        const hasAccess = subscription.status === 'active' || subscription.status === 'trialing';

        // Update subscription details
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
            has_access_permission: hasAccess,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);

        if (error) {
          console.error("Error updating subscription status:", error);
        } else {
          console.log(`Subscription updated for user ${userId}`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer as string;

        // Get the user ID from Supabase
        const { data: subscriptionData, error: fetchError } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (fetchError || !subscriptionData) {
          console.error("Error fetching user for subscription:", fetchError);
          break;
        }

        const userId = subscriptionData.user_id;

        // Update subscription status and revoke access
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            has_access_permission: false, // Revoke access when subscription is canceled
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", userId);

        if (error) {
          console.error("Error updating subscription status to canceled:", error);
        } else {
          console.log(`Subscription canceled for user ${userId}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
});
