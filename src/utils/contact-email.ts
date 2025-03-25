
/**
 * Utility for handling contact form submissions
 */
export async function sendContactEmail({
  name,
  email,
  subject,
  message,
  isDemoRequest = false
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  isDemoRequest?: boolean;
}): Promise<{ success: boolean; message: string }> {
  try {
    // First, add the message to the database
    const supabaseResponse = await fetch(
      "https://hmmmztyrqhxjovingweq.supabase.co/rest/v1/contact_messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtbW16dHlycWh4am92aW5nd2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzA3NjksImV4cCI6MjA1ODI0Njc2OX0.IPWVZc1dLYpFKs8rBuoHZFsGnwrw-_ol9LdCsQpu7Gs",
          "Content-Profile": "public",
        },
        body: JSON.stringify([{ name, email, subject, message }]),
      }
    );

    if (!supabaseResponse.ok) {
      throw new Error(`Database error: ${supabaseResponse.statusText}`);
    }

    // Get the Supabase URL for the Edge Function
    const SUPABASE_URL = "https://hmmmztyrqhxjovingweq.supabase.co";
    
    // Call the edge function
    const functionUrl = `${SUPABASE_URL}/functions/v1/send-contact-email`;
    const functionResponse = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        isDemoRequest
      }),
    });

    // Handle function response
    if (!functionResponse.ok) {
      const errorData = await functionResponse.json();
      console.error("Function error:", errorData);
      return { 
        success: false, 
        message: `Failed to process email: ${errorData.error || 'Unknown error'}` 
      };
    }

    const data = await functionResponse.json();
    return { 
      success: true, 
      message: "Your message has been sent successfully!" 
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return { 
      success: false, 
      message: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}
