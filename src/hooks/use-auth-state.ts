import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { checkIsAdmin, safeNavigate, ADMIN_EMAILS } from '@/utils/auth-utils';

// Create a session validation key in localStorage to track session state
const SESSION_VALIDATION_KEY = 'zenora_session_valid';

/**
 * Hook to manage auth state and handle auth state changes
 */
export const useAuthState = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChangeInProgress, setAuthChangeInProgress] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle signout cleanly
  const clearAuthState = () => {
    setSession(null);
    setUser(null);
    // Clear session validation flag
    localStorage.removeItem(SESSION_VALIDATION_KEY);
    console.log('Auth state cleared');
  };

  useEffect(() => {
    async function setupAuth() {
      try {
        setLoading(true);
        
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            console.log('Auth state changed:', event);
            
            // Set auth change flag to prevent duplicate navigation
            setAuthChangeInProgress(true);
            
            if (event === 'SIGNED_IN') {
              // Only update state and navigate if session exists
              if (currentSession) {
                setSession(currentSession);
                setUser(currentSession.user);
                // Set session validation flag
                localStorage.setItem(SESSION_VALIDATION_KEY, 'true');
                
                toast({
                  title: "Welcome back!",
                  description: "You've successfully signed in to your account."
                });
                
                // Skip navigation on sign-in since this is handled in the signIn function
                console.log('SIGNED_IN event detected. Navigation will be handled by signIn function');
              }
              
            } else if (event === 'SIGNED_OUT') {
              // Clear all auth state
              clearAuthState();
              
              toast({
                title: "Signed out",
                description: "You've been successfully signed out."
              });
              
              // Force navigation to home
              if (location.pathname !== '/') {
                console.log('Forcing navigation to home after signout');
                navigate('/', { replace: true });
              }
              
            } else if (event === 'USER_UPDATED') {
              if (currentSession) {
                setSession(currentSession);
                setUser(currentSession.user);
                
                toast({
                  title: "Account updated",
                  description: "Your account information has been updated."
                });
              }
            } else if (event === 'TOKEN_REFRESHED') {
              if (currentSession) {
                setSession(currentSession);
                setUser(currentSession.user);
                console.log('Session token refreshed');
              }
            }
            
            // Clear auth change flag with a slight delay to prevent race conditions
            setTimeout(() => setAuthChangeInProgress(false), 300);
          }
        );

        // Check for existing session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error fetching session:", sessionError);
          clearAuthState();
          toast({
            title: "Authentication error",
            description: "There was a problem with your session",
            variant: "destructive",
          });
          return;
        }

        // Validate session - if no validation flag exists but we have a session, something might be wrong
        const sessionValidationFlag = localStorage.getItem(SESSION_VALIDATION_KEY);
        if (!sessionValidationFlag && initialSession) {
          console.warn('Session exists but validation flag is missing - possible stale session');
          
          // Verify the session is valid by attempting to refresh the session
          try {
            const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError || !refreshedSession) {
              console.error("Session refresh failed, forcing signout:", refreshError);
              await supabase.auth.signOut();
              clearAuthState();
              return;
            }
            
            // Session is valid, set the validation flag
            localStorage.setItem(SESSION_VALIDATION_KEY, 'true');
            console.log('Session validated and flag set');
          } catch (refreshErr) {
            console.error("Error refreshing session:", refreshErr);
            clearAuthState();
            return;
          }
        }
        
        // Process valid session
        if (initialSession?.user) {
          setSession(initialSession);
          setUser(initialSession.user);
          console.log('Initial session found, user email:', initialSession.user.email);
          
          // Email-based admin check is the most reliable
          const isAdminByEmail = ADMIN_EMAILS.includes(initialSession.user.email || '');
          console.log(`Initial session admin check: ${isAdminByEmail} (by email)`);
          
          // Only redirect if on login page or signup page
          // NOTE: Removed '/' from this condition to allow navigation to home page
          if (location.pathname === '/login' || location.pathname === '/signup') {
            if (isAdminByEmail) {
              console.log('User is admin, redirecting to admin dashboard');
              safeNavigate(navigate, '/admin', location.pathname);
            } else {
              console.log('User is not admin, redirecting to user dashboard');
              safeNavigate(navigate, '/dashboard', location.pathname);
            }
          } else if (location.pathname.startsWith('/admin')) {
            // Extra check for admin routes - redirect non-admins away from admin routes
            if (!isAdminByEmail) {
              console.log('Non-admin user trying to access admin route, redirecting to dashboard');
              safeNavigate(navigate, '/dashboard', location.pathname);
            }
          } else if (location.pathname.startsWith('/dashboard')) {
            // Extra check for user routes - redirect admins away from user routes
            if (isAdminByEmail) {
              console.log('Admin user trying to access user dashboard, redirecting to admin dashboard');
              safeNavigate(navigate, '/admin', location.pathname);
            }
          }
        } else {
          // No session found, clear auth state
          clearAuthState();
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error setting up auth:", error);
        clearAuthState();
        toast({
          title: "Authentication setup failed",
          description: "There was a problem setting up authentication",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    setupAuth();
  }, [navigate, location.pathname]);

  return {
    session,
    user,
    loading,
    authChangeInProgress,
    setAuthChangeInProgress,
    clearAuthState
  };
};
