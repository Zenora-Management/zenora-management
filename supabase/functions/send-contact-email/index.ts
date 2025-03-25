
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

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
    const { name, email, subject, message, isDemoRequest } = await req.json();

    const client = new SmtpClient();
    
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: "zenoramgmt@gmail.com",
      password: "ngke jnos ejeb otgc", // App password
    });

    // Prepare email content
    let emailSubject = subject;
    let emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Add special note if this is a demo request
    if (isDemoRequest) {
      emailSubject = `[DEMO REQUEST] ${subject}`;
      emailContent = `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>This is a demo request and should be prioritized.</strong></p>
        <p><strong>Note:</strong> The user has been directed to the Calendly scheduling page.</p>
      `;
    }

    // Send the email
    await client.send({
      from: "zenoramgmt@gmail.com",
      to: "zenoramgmt@gmail.com",
      subject: emailSubject,
      html: emailContent,
    });

    // Send confirmation email to the user
    if (email) {
      const userEmailContent = `
        <h2>Thank you for contacting Zenora Property Management!</h2>
        <p>Dear ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Here's a summary of your inquiry:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        ${isDemoRequest ? '<p>You can schedule a demo at <a href="https://calendly.com/zenoramgmt/30min">our Calendly page</a>.</p>' : ''}
        <p>Best regards,</p>
        <p>
          Ansh Parikh<br/>
          CEO & Founder<br/>
          Zenora Property Management
        </p>
      `;

      await client.send({
        from: "zenoramgmt@gmail.com",
        to: email,
        subject: "We've received your message - Zenora Property Management",
        html: userEmailContent,
      });
    }

    await client.close();

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
