import { User } from '@supabase/supabase-js';

// Admin emails for special handling
export const ADMIN_EMAILS = ["zenoramgmt@gmail.com", "anshparikh@gmail.com", "anvisrini@gmail.com"];

/**
 * Check if a user is an admin based on their email and user_metadata
 */
export function checkIsAdmin(user: User | null): boolean {
  if (!user) return false;
  
  // Check admin status in both places for redundancy
  const isAdminByEmail = ADMIN_EMAILS.includes(user.email || '');
  const isAdminByMetadata = user.user_metadata?.is_admin === true;
  
  console.log('Admin check - Email:', user.email);
  console.log('Admin check - Is admin by email:', isAdminByEmail);
  console.log('Admin check - Is admin by metadata:', isAdminByMetadata);
  
  // Favor email check over metadata since metadata can get out of sync
  return isAdminByEmail || isAdminByMetadata;
}

/**
 * Navigate to a path safely, ensuring that we're not navigating to the same path
 * which can cause React Router to ignore the navigation
 */
export function safeNavigate(
  navigate: (path: string) => void, 
  path: string, 
  currentPath: string
): void {
  if (currentPath !== path) {
    console.log(`Navigating from ${currentPath} to ${path}`);
    navigate(path);
  } else {
    console.log(`Already at ${path}, skipping navigation`);
  }
}

/**
 * Send a custom password reset email using our edge function
 */
export async function sendPasswordResetEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    console.log("Sending custom password reset email to:", email);
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hmmmztyrqhxjovingweq.supabase.co";
    const response = await fetch(
      `${supabaseUrl}/functions/v1/send-verification-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type: "recovery",
          redirectTo: window.location.origin + '/login'
        }),
      }
    );
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error("Error sending password reset email:", result);
      throw new Error(result.error || result.message || "Failed to send password reset email");
    }
    
    console.log("Password reset email sent successfully:", result);
    
    return {
      success: true,
      message: "Password reset email sent successfully. Please check your inbox."
    };
  } catch (error) {
    console.error("Error in password reset email process:", error instanceof Error ? error.message : "Unknown error");
    return {
      success: false,
      message: `Failed to send password reset email: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}
