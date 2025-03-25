
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { checkIsAdmin, safeNavigate } from '@/utils/auth-utils';

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
            
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            
            if (event === 'SIGNED_IN') {
              toast({
                title: "Welcome back!",
                description: "You've successfully signed in to your account."
              });
              
              // Only handle navigation if not already on dashboard/admin pages
              if (!location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/admin')) {
                // Redirect to appropriate dashboard based on user role
                if (currentSession?.user && checkIsAdmin(currentSession.user)) {
                  console.log('User is admin, redirecting to admin dashboard');
                  safeNavigate(navigate, '/admin', location.pathname);
                } else {
                  console.log('User is not admin, redirecting to user dashboard');
                  safeNavigate(navigate, '/dashboard', location.pathname);
                }
              }
            } else if (event === 'SIGNED_OUT') {
              toast({
                title: "Signed out",
                description: "You've been successfully signed out."
              });
              safeNavigate(navigate, '/', location.pathname);
            } else if (event === 'USER_UPDATED') {
              toast({
                title: "Account updated",
                description: "Your account information has been updated."
              });
            }
            
            // Clear auth change flag with a slight delay to prevent race conditions
            setTimeout(() => setAuthChangeInProgress(false), 100);
          }
        );

        // THEN check for existing session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error fetching session:", sessionError);
          toast({
            title: "Authentication error",
            description: "There was a problem with your session",
            variant: "destructive",
          });
        }
        
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        // Handle initial session - redirect if needed
        if (initialSession?.user) {
          console.log('Initial session found, user email:', initialSession.user.email);
          // Only redirect if on login page or root
          if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
            const isAdmin = checkIsAdmin(initialSession.user);
            if (isAdmin) {
              console.log('User is admin, redirecting to admin dashboard');
              safeNavigate(navigate, '/admin', location.pathname);
            } else {
              console.log('User is not admin, redirecting to user dashboard');
              safeNavigate(navigate, '/dashboard', location.pathname);
            }
          } else if (location.pathname.startsWith('/admin')) {
            // Extra check for admin routes - redirect non-admins away from admin routes
            const isAdmin = checkIsAdmin(initialSession.user);
            if (!isAdmin) {
              console.log('Non-admin user trying to access admin route, redirecting to dashboard');
              safeNavigate(navigate, '/dashboard', location.pathname);
            }
          }
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error setting up auth:", error);
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
    setAuthChangeInProgress
  };
};
