
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

    console.log("Starting email send process");
    console.log("Request data:", { name, email, subject, isDemoRequest });

    const client = new SmtpClient();
    
    try {
      console.log("Connecting to SMTP server");
      await client.connectTLS({
        hostname: "smtp.gmail.com",
        port: 465,
        username: "zenoramgmt@gmail.com",
        password: "ngke jnos ejeb otgc", // App password
      });
      console.log("Successfully connected to SMTP server");
    } catch (smtpError) {
      console.error("SMTP connection error:", smtpError);
      throw new Error(`Failed to connect to SMTP server: ${smtpError.message}`);
    }

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

    try {
      // Send the email to admin
      console.log("Sending email to admin");
      const adminResult = await client.send({
        from: "zenoramgmt@gmail.com",
        to: "zenoramgmt@gmail.com",
        subject: emailSubject,
        html: emailContent,
      });
      console.log("Admin email sent successfully:", adminResult);

      // Send confirmation email to the user
      if (email) {
        console.log("Sending confirmation email to user");
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

        const userResult = await client.send({
          from: "zenoramgmt@gmail.com",
          to: email,
          subject: "We've received your message - Zenora Property Management",
          html: userEmailContent,
        });
        console.log("User confirmation email sent successfully:", userResult);
      }
    } catch (sendError) {
      console.error("Error sending email:", sendError);
      throw new Error(`Failed to send email: ${sendError.message}`);
    }

    await client.close();
    console.log("SMTP client closed");

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
