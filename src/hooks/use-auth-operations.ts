
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { InsertTables } from '@/types/supabase';
import { ADMIN_EMAILS } from '@/utils/auth-utils';

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
      
      // Special handling for admin account creation on first login
      if (isAdmin && ADMIN_EMAILS.includes(email)) {
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
      
      // Navigation is handled in the auth state change listener
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
      
      // Step 1: Create the auth user
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
      
      // Then perform the sign out operation
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
      
      // Force navigation to home page regardless of auth state listener
      navigate('/');
      
      // Show success message after the operation completes
      toast({
        title: "Signed out",
        description: "You've been successfully signed out."
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out failed",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
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
