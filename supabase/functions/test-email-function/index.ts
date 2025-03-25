
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

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
    console.log("Starting email function test");
    
    // Create test data
    const testData = {
      name: "Test User",
      email: "test@example.com",
      subject: "Test Email Function",
      message: "This is a test message to verify the email function is working correctly.",
      isDemoRequest: false
    };
    
    // Log the test data
    console.log("Test data:", testData);

    // Call the actual email function to test it
    const emailFunctionUrl = "https://hmmmztyrqhxjovingweq.supabase.co/functions/v1/send-contact-email";
    
    const response = await fetch(emailFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    // Parse the response
    const responseData = await response.json();
    
    // Log the response
    console.log("Email function test result:", {
      status: response.status,
      ok: response.ok,
      data: responseData
    });

    return new Response(
      JSON.stringify({ 
        success: response.ok, 
        message: "Email function test completed",
        testResult: {
          status: response.status,
          data: responseData
        }
      }),
      {
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        },
        status: response.ok ? 200 : 500,
      }
    );
  } catch (error) {
    console.error("Error in test-email-function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        success: false 
      }),
      {
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        },
        status: 500,
      }
    );
  }
});
