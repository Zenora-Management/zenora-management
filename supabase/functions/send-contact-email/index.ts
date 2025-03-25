// @ts-ignore
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = "re_yU3wwLHR_A11YEXDykR2hnMgKPB8vHJif";
const TO_EMAIL = "zenoramgmt@gmail.com";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message, isDemoRequest } = await req.json();

    console.log("Starting email send process");
    console.log("Request data:", { name, email, subject, isDemoRequest });

    try {
      // Prepare email content with better formatting
      const emailSubject = isDemoRequest ? `[DEMO REQUEST] ${subject}` : subject;
      const emailBody = `
New Contact Form Submission

From: ${name} (${email})
Subject: ${subject}

Message:
${message}

Sent from: Zenora Website Contact Form
      `;

      console.log("Sending email via Resend...");
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Zenora Contact Form <onboarding@resend.dev>",
          to: [TO_EMAIL],
          subject: emailSubject,
          text: emailBody,
          reply_to: email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Resend API Error:", result);
        throw new Error(`Failed to send email: ${result.message || 'Unknown error'}`);
      }

      console.log("Email sent successfully:", result);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Email sent successfully",
          data: {
            recipientEmail: email,
            subject: emailSubject,
            timestamp: new Date().toISOString()
          }
        }),
        {
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json" 
          },
          status: 200,
        }
      );
    } catch (emailError) {
      console.error("Email Error Details:", {
        message: emailError.message,
        stack: emailError.stack,
        name: emailError.name
      });
      throw new Error(`Failed to send email: ${emailError.message}`);
    }
  } catch (error) {
    console.error("Error in send-contact-email function:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        success: false,
        details: {
          message: error.message,
          stack: error.stack,
          name: error.name
        }
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
