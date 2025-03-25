
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

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
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    // Create a Supabase client with the service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const requestData = await req.json();
    const { email, type, redirectTo, phoneNumber } = requestData;

    if (type === "phone_verification") {
      if (!phoneNumber) {
        return new Response(
          JSON.stringify({ error: "Phone number is required for phone verification" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      // Generate a random 6-digit code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // In a real implementation, you would integrate with an SMS API like Twilio
      // For now, we'll just log the code and return it in development
      console.log(`[MOCK SMS] Sending verification code ${verificationCode} to ${phoneNumber}`);
      
      // Store the verification code in a table or temporarily in Redis/cache
      // For this demo, we'll return it in the response (ONLY FOR DEVELOPMENT)
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Verification code sent", 
          // Remove this in production - only for development testing!
          code: verificationCode 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      // Email verification flow
      if (!email) {
        return new Response(
          JSON.stringify({ error: "Email is required for email verification" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Get the site URL from environment variables or use a default
      const siteUrl = Deno.env.get("SITE_URL") || "http://localhost:5173";
      
      // The redirectTo parameter should be a full URL
      const redirectUrl = redirectTo || `${siteUrl}/dashboard`;

      // Send the email using Supabase auth API
      const { error } = await supabase.auth.admin.generateLink({
        type: "signup",
        email,
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error("Error generating magic link:", error);
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Verification email sent" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error in verification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
