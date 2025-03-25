
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
      
      // Get Twilio credentials from environment variables
      const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
      const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
      const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");
      
      if (!accountSid || !authToken || !twilioPhoneNumber) {
        console.error("Missing Twilio credentials");
        return new Response(
          JSON.stringify({ error: "SMS service configuration error" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      try {
        // Format the phone number (ensure it has the + prefix)
        const formattedPhoneNumber = phoneNumber.startsWith('+') 
          ? phoneNumber 
          : `+${phoneNumber}`;
        
        // Send SMS using Twilio
        const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
        const twilioResponse = await fetch(twilioEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`
          },
          body: new URLSearchParams({
            From: twilioPhoneNumber,
            To: formattedPhoneNumber,
            Body: `Your Zenora verification code is: ${verificationCode}`
          }).toString()
        });
        
        const twilioResult = await twilioResponse.json();
        console.log("Twilio response:", twilioResult);
        
        if (!twilioResponse.ok) {
          console.error("Twilio API error:", twilioResult);
          return new Response(
            JSON.stringify({ 
              error: "Failed to send SMS", 
              details: twilioResult?.message || "Unknown Twilio error" 
            }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
        
        // For development, return the code in the response
        // In production, you would want to store this securely and validate it later
        const isDevelopment = !Deno.env.get("PRODUCTION");
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Verification code sent", 
            // Only include code in development
            ...(isDevelopment ? { code: verificationCode } : {})
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (smsError) {
        console.error("SMS sending error:", smsError);
        return new Response(
          JSON.stringify({ error: "Failed to send SMS verification", details: smsError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
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
