
/**
 * Utility for handling contact form submissions
 */
export async function sendContactEmail({
  name,
  email,
  phone,
  subject,
  message,
  plan,
  isDemoRequest = false
}: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  plan?: string;
  isDemoRequest?: boolean;
}): Promise<{ success: boolean; message: string }> {
  try {
    console.log("sendContactEmail called with:", { name, email, phone, subject, messageLength: message.length, plan, isDemoRequest });
    
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
        body: JSON.stringify({ name, email, phone, subject, message, plan }),
      }
    );

    if (!supabaseResponse.ok) {
      console.error("Database error:", await supabaseResponse.text());
      throw new Error(`Database error: ${supabaseResponse.statusText}`);
    }
    
    console.log("Message saved to database successfully");

    // Get the Supabase URL for the Edge Function - using a direct URL to ensure it works
    const functionUrl = "https://hmmmztyrqhxjovingweq.supabase.co/functions/v1/send-contact-email";
    
    console.log("Calling edge function at:", functionUrl);
    
    // Call the edge function with proper error handling
    const functionResponse = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        subject,
        message,
        plan,
        isDemoRequest
      }),
    });

    console.log("Edge function response status:", functionResponse.status);
    
    // Handle empty responses (which cause JSON parsing errors)
    let responseData;
    const responseText = await functionResponse.text();
    console.log("Edge function raw response:", responseText);
    
    try {
      // Only try to parse if there's actual content
      if (responseText.trim()) {
        responseData = JSON.parse(responseText);
      } else {
        responseData = { error: "Empty response from server" };
      }
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      responseData = { error: "Invalid JSON response from server" };
    }

    // Handle function response
    if (!functionResponse.ok) {
      console.error("Function error:", responseData);
      return { 
        success: false, 
        message: `Failed to process email: ${responseData?.error || 'Server error'}` 
      };
    }

    console.log("Email sent successfully:", responseData);
    
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
