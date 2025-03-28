
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  plan?: string;
  isDemoRequest?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message, plan, isDemoRequest } = await req.json() as EmailRequest;
    
    console.log("Received contact form submission:", { name, email, subject, messageLength: message.length, plan, isDemoRequest });

    // Email to client (auto-responder)
    const clientEmail = await sendClientEmail(name, email, subject);
    
    // Email to company (notification)
    const companyEmail = await sendCompanyEmail(name, email, phone, subject, message, plan, isDemoRequest);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        clientEmail,
        companyEmail
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error in edge function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Unknown error occurred" 
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
        status: 500
      }
    );
  }
});

async function sendClientEmail(name: string, email: string, subject: string) {
  // Construct the email message for the client
  const plainText = `
    Hello ${name},

    Thank you for contacting Zenora Management. We have received your inquiry regarding "${subject}".

    Our team will review your message and get back to you shortly. We typically respond within 24 business hours.

    In the meantime, if you have any urgent questions, please call us at (510) 770-4237.

    Best regards,
    The Zenora Management Team
  `;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-image: linear-gradient(to right, #8b5cf6, #3b82f6); padding: 20px; color: white; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Us</h1>
      </div>
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Hello ${name},</p>
        <p>Thank you for contacting Zenora Management. We have received your inquiry regarding "<strong>${subject}</strong>".</p>
        <p>Our team will review your message and get back to you shortly. We typically respond within 24 business hours.</p>
        <p>In the meantime, if you have any urgent questions, please call us at <strong>(510) 770-4237</strong>.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0;">Best regards,</p>
          <p style="margin: 0;"><strong>The Zenora Management Team</strong></p>
        </div>
      </div>
    </div>
  `;

  try {
    // Use Gmail API to send email
    const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("GMAIL_ACCESS_TOKEN")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        raw: btoa(
          `From: "Zenora Management" <zenoramgmt@gmail.com>\r\n` +
          `To: ${email}\r\n` +
          `Subject: We've Received Your Message - Zenora Management\r\n` +
          `Content-Type: text/html; charset=utf-8\r\n\r\n` +
          htmlContent
        ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
      })
    });

    const data = await response.json();
    console.log("Client email sent, response:", data);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("Error sending client email:", error);
    return { success: false, error: error.message };
  }
}

async function sendCompanyEmail(
  name: string, 
  email: string, 
  phone: string, 
  subject: string, 
  message: string, 
  plan?: string,
  isDemoRequest?: boolean
) {
  // Get plan details if applicable
  let planDetails = "";
  if (plan) {
    const planName = getPlanName(plan);
    planDetails = `
      <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #8b5cf6;">
        <h3 style="margin-top: 0; color: #4b5563;">Selected Plan: ${planName}</h3>
        ${getPlanDescription(plan)}
      </div>
    `;
  }

  // Construct the notification email
  const plainText = `
    New Contact Form Submission

    Name: ${name}
    Email: ${email}
    Phone: ${phone || "Not provided"}
    Subject: ${subject}
    ${plan ? `Plan: ${getPlanName(plan)}` : ""}
    ${isDemoRequest ? "This is a demo request" : ""}

    Message:
    ${message}
  `;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-image: linear-gradient(to right, #8b5cf6, #3b82f6); padding: 20px; color: white; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        ${isDemoRequest ? '<p style="background-color: rgba(255,255,255,0.2); display: inline-block; padding: 5px 10px; border-radius: 4px; margin-top: 10px;">Demo Request</p>' : ''}
      </div>
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #8b5cf6;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;">${phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
            <td style="padding: 8px 0;">${subject}</td>
          </tr>
        </table>
        
        ${planDetails}
        
        <div style="margin-top: 20px;">
          <h3 style="color: #4b5563; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Message:</h3>
          <div style="white-space: pre-line; color: #4b5563;">${message}</div>
        </div>
        
        <div style="margin-top: 30px; background-color: #f9fafb; padding: 15px; border-radius: 8px; text-align: center;">
          <p style="margin: 0;">To respond to this inquiry, simply reply to this email or contact the client directly.</p>
        </div>
      </div>
    </div>
  `;

  try {
    // Use Gmail API to send email to company
    const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("GMAIL_ACCESS_TOKEN")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        raw: btoa(
          `From: "Zenora Contact Form" <zenoramgmt@gmail.com>\r\n` +
          `To: "Zenora Team" <zenoramgmt@gmail.com>\r\n` +
          `Reply-To: "${name}" <${email}>\r\n` +
          `Subject: New Contact Form: ${subject}\r\n` +
          `Content-Type: text/html; charset=utf-8\r\n\r\n` +
          htmlContent
        ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
      })
    });

    const data = await response.json();
    console.log("Company notification email sent, response:", data);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("Error sending company notification email:", error);
    return { success: false, error: error.message };
  }
}

function getPlanName(planId: string): string {
  switch (planId) {
    case "client":
      return "Client Plan";
    case "referral":
      return "Referral Discount Plan";
    case "transfer":
      return "Transfer Discount Plan";
    case "enterprise":
      return "Enterprise Plan";
    default:
      return planId.charAt(0).toUpperCase() + planId.slice(1);
  }
}

function getPlanDescription(planId: string): string {
  switch (planId) {
    case "client":
      return "<p>Base plan for single property owners - $1,999/year</p>";
    case "referral":
      return "<p>$500 discount for referred clients - $1,499/year</p>";
    case "transfer":
      return "<p>$500 discount when switching from another company - $1,499/year</p>";
    case "enterprise":
      return "<p>For portfolio investors with 10+ properties - Custom pricing</p>";
    default:
      return "";
  }
}
