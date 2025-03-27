import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUp = location.pathname === "/signup";
  const [loginType, setLoginType] = useState<"regular" | "admin">("regular");
  const [bypassLoading, setBypassLoading] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';

  // Development bypass function
  const handleBypass = async (type: 'user' | 'admin') => {
    if (!isDevelopment) return;
    
    setBypassLoading(true);
    try {
      // Set a bypass session in local storage to simulate login
      localStorage.setItem('zenora_bypass_auth', 'true');
      localStorage.setItem('zenora_bypass_type', type);
      localStorage.setItem('zenora_session_valid', 'true');
      
      toast({
        title: "Development Bypass",
        description: `You've bypassed auth as a ${type}. This works only in development.`,
      });
      
      // Navigate to the appropriate dashboard
      if (type === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Bypass error:", error);
      toast({
        title: "Bypass failed",
        description: "Unable to bypass authentication",
        variant: "destructive",
      });
    } finally {
      setBypassLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 bg-gradient-to-b from-white to-gray-50 dark:from-zenora-dark dark:to-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-zenora-light opacity-5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-zenora-purple opacity-5 blur-3xl rounded-full"></div>
        
        <div className="zenora-container relative z-10">
          <div className="text-center mb-8 animate-slide-in">
            <div className="inline-block">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-zenora-gradient">
                {isSignUp ? "Create Your Account" : "Welcome Back"}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {isSignUp 
                ? "Sign up to access your AI-powered property management dashboard" 
                : "Sign in to access your AI-powered property management dashboard"
              }
            </p>
          </div>
          
          <div className="animate-scale-in">
            {!isSignUp && (
              <Tabs defaultValue="regular" onValueChange={(value) => setLoginType(value as "regular" | "admin")} className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="regular">Property Owner</TabsTrigger>
                  <TabsTrigger value="admin">Administrator</TabsTrigger>
                </TabsList>
                <TabsContent value="regular">
                  <div className="max-w-md mx-auto bg-white dark:bg-zenora-dark-card p-6 rounded-lg shadow-sm">
                    <AuthForm mode="login" userType="regular" />
                  </div>
                </TabsContent>
                <TabsContent value="admin">
                  <div className="max-w-md mx-auto bg-white dark:bg-zenora-dark-card p-6 rounded-lg shadow-sm">
                    <AuthForm mode="login" userType="admin" />
                  </div>
                </TabsContent>
              </Tabs>
            )}
            
            {isSignUp && (
              <div className="max-w-md mx-auto bg-white dark:bg-zenora-dark-card p-6 rounded-lg shadow-sm">
                <AuthForm mode="signup" userType="regular" />
              </div>
            )}
          </div>
          
          <div className="text-center mt-8 text-sm text-muted-foreground">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-zenora-purple hover:underline">
                  Log in
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link to="/signup" className="text-zenora-purple hover:underline">
                  Sign up
                </Link>
              </>
            )}
          </div>
          
          <div className="text-center mt-4 text-sm text-muted-foreground">
            By {isSignUp ? "signing up" : "signing in"}, you agree to our{" "}
            <Link to="/terms" className="text-zenora-purple hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-zenora-purple hover:underline">
              Privacy Policy
            </Link>
          </div>
          
          {/* Development Bypass Section */}
          {isDevelopment && !isSignUp && (
            <div className="max-w-md mx-auto mt-8 p-4 border border-dashed border-amber-500 rounded-lg bg-amber-50 dark:bg-amber-950/20">
              <h3 className="text-center text-amber-700 dark:text-amber-400 font-medium mb-3">Development Mode</h3>
              <div className="text-center text-sm text-amber-600 dark:text-amber-300 mb-4">
                Bypass authentication to quickly access internal pages during development.
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <ZenoraButton
                  variant="outline"
                  className="border-amber-500 text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-950/50"
                  onClick={() => handleBypass('user')}
                  disabled={bypassLoading}
                >
                  Bypass as User
                </ZenoraButton>
                <ZenoraButton
                  variant="outline"
                  className="border-amber-500 text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-950/50"
                  onClick={() => handleBypass('admin')}
                  disabled={bypassLoading}
                >
                  Bypass as Admin
                </ZenoraButton>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
