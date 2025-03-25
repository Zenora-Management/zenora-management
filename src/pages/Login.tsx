
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";
  const [loginType, setLoginType] = useState<"regular" | "admin">("regular");

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
                  <AuthForm mode="login" userType="regular" />
                </TabsContent>
                <TabsContent value="admin">
                  <AuthForm mode="login" userType="admin" />
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
