import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { InsertTables } from '@/types/supabase';
import { ADMIN_EMAILS, checkIsAdmin } from '@/utils/auth-utils';

interface UseAuthOperationsProps {
  authChangeInProgress: boolean;
  setAuthChangeInProgress: (status: boolean) => void;
}

/**
 * Hook to provide authentication operations (sign in, sign up, sign out)
 */
export const useAuthOperations = ({ 
  authChangeInProgress, 
  setAuthChangeInProgress 
}: UseAuthOperationsProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string, isAdmin: boolean = false) => {
    if (authChangeInProgress) {
      console.log("Auth change already in progress, aborting sign in");
      return;
    }
    
    try {
      setLoading(true);
      console.log(`Signing in user with email: ${email}, isAdmin parameter: ${isAdmin}`);
      
      // Check if this is an admin email
      const isAdminEmail = ADMIN_EMAILS.includes(email);
      
      // Enforce admin access control: admin emails can only log in through admin login
      if (isAdminEmail && !isAdmin) {
        console.error("Admin email attempting to login through regular user login");
        toast({
          title: "Access Restricted",
          description: "Admin users must use the admin login option",
          variant: "destructive",
        });
        throw new Error("Admin users must use the admin login option");
      }
      
      // Similarly, prevent non-admin emails from using admin login
      if (!isAdminEmail && isAdmin) {
        console.error("Non-admin email attempting to login through admin login");
        toast({
          title: "Access Denied",
          description: "You are not authorized to access the admin area",
          variant: "destructive",
        });
        throw new Error("Unauthorized admin login attempt");
      }
      
      // Special handling for admin account creation on first login
      if (isAdmin && isAdminEmail) {
        // Check if admin exists first
        const { data: existingUser, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.log("User check error (expected for new admin):", userError);
        }
        
        if (!existingUser?.user) {
          // Create admin account if it doesn't exist
          const { error: signUpError } = await supabase.auth.signUp({ 
            email,
            password,
            options: {
              data: {
                full_name: "Zenora Admin",
                is_admin: true
              }
            }
          });
          
          if (signUpError) {
            console.error("Admin signup error:", signUpError);
            throw signUpError;
          }
        }
      }
      
      // Regular sign in
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Login error:", error);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      // Update user metadata if necessary to ensure admin status is set correctly
      if (data.user) {
        const shouldBeAdmin = ADMIN_EMAILS.includes(email);
        const currentUserData = data.user.user_metadata || {};
        
        // If user metadata doesn't have is_admin flag or it doesn't match what it should be
        if (currentUserData.is_admin !== shouldBeAdmin) {
          console.log(`Updating user metadata. Current is_admin: ${currentUserData.is_admin}, Should be: ${shouldBeAdmin}`);
          
          // Update user metadata with correct admin status
          const { error: updateError } = await supabase.auth.updateUser({
            data: { ...currentUserData, is_admin: shouldBeAdmin }
          });
          
          if (updateError) {
            console.error("Error updating user metadata:", updateError);
          } else {
            console.log("User metadata updated successfully with correct admin status");
          }
        }
      }
      
      // Show success message
      toast({
        title: "Login successful",
        description: "You have successfully logged in."
      });
      
      // Explicitly navigate based on user role - this is important
      if (data.user) {
        // Force checking based on email rather than current metadata since we may have just updated it
        const isUserAdmin = ADMIN_EMAILS.includes(data.user.email || '');
        console.log(`User role check - Email: ${data.user.email}, Is admin by email: ${isUserAdmin}`);
        
        if (isUserAdmin) {
          console.log('Admin login successful, navigating to admin dashboard');
          navigate('/admin');
        } else {
          console.log('Regular user login successful, navigating to user dashboard');
          navigate('/dashboard');
        }
      }
      // Auth state change listener will handle additional state updates
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (authChangeInProgress) {
      console.log("Auth change already in progress, aborting sign up");
      return;
    }
    
    try {
      setLoading(true);
      
      // Check if trying to sign up as admin - reject if not through admin login
      if (ADMIN_EMAILS.includes(email)) {
        toast({
          title: "Invalid email",
          description: "This email address is reserved. Please use a different one.",
          variant: "destructive",
        });
        throw new Error("This email address is reserved");
      }
      
      // Step 1: Create the auth user with email_confirmation disabled
      // We'll handle email verification ourselves
      const { error: signUpError, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
            is_admin: false
          },
          emailRedirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (signUpError) {
        console.error("Signup error:", signUpError);
        toast({
          title: "Signup failed",
          description: signUpError.message,
          variant: "destructive",
        });
        throw signUpError;
      }

      // Step 2: After auth user is created, add user to clients table
      if (data.user) {
        try {
          // Create client record with the user's information
          const clientData: InsertTables<'clients'> = {
            id: data.user.id,
            email: email,
            full_name: fullName,
            phone: null,
            address: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          const { error: clientError } = await supabase
            .from('clients')
            .insert([clientData]);

          if (clientError) {
            console.error('Error creating client record:', clientError);
            toast({
              title: "Account created but client profile setup failed",
              description: "Your account was created but there was an issue setting up your profile. Please contact support.",
              variant: "destructive",
            });
          } else {
            console.log('Client record created successfully');
          }
          
          // Step 3: Send a custom verification email using our edge function
          try {
            console.log("Sending custom verification email");
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hmmmztyrqhxjovingweq.supabase.co";
            const verificationResponse = await fetch(
              `${supabaseUrl}/functions/v1/send-verification-email`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  type: "signup",
                  redirectTo: window.location.origin + '/dashboard'
                }),
              }
            );
            
            const verificationResult = await verificationResponse.json();
            
            if (!verificationResponse.ok) {
              console.error("Error sending verification email:", verificationResult);
              // We don't throw here since the account was created successfully
              toast({
                title: "Account created but verification email failed",
                description: "Your account was created but we couldn't send a verification email. Please contact support.",
                variant: "destructive",
              });
            } else {
              console.log("Verification email sent successfully:", verificationResult);
            }
          } catch (verificationError) {
            console.error("Error in verification email process:", verificationError);
          }
        } catch (clientCreationError) {
          console.error('Error in client creation process:', clientCreationError);
        }
      }
      
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account."
      });
      
      // Navigate to login page
      navigate('/login');
    } catch (error: any) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clear any localStorage session flags before actual signout
      localStorage.removeItem('zenora_session_valid');
      
      // Perform the sign out operation
      const { error } = await supabase.auth.signOut({
        scope: 'local' // Ensure we're only signing out locally
      });
      
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
      
      // Force clear auth state on client side regardless of Supabase response
      setAuthChangeInProgress(true);
      
      // Force navigation to home page with replace to prevent back navigation
      navigate('/', { replace: true });
      
      // Show success message after the operation completes
      toast({
        title: "Signed out",
        description: "You've been successfully signed out."
      });
      
      // Force page reload as a last resort if needed
      if (window.location.pathname !== '/') {
        console.log('Forcing page reload to ensure complete signout');
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      }
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out failed",
        description: "There was an error signing out. Please try refreshing the page.",
        variant: "destructive",
      });
      
      // Force reload as a fallback even on error
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } finally {
      setLoading(false);
      setAuthChangeInProgress(false); // Ensure flag is reset
    }
  };

  return {
    loading,
    signIn,
    signUp,
    signOut
  };
};
