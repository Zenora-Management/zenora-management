
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 bg-gradient-to-b from-white to-gray-50 dark:from-zenora-dark dark:to-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-zenora-light opacity-5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-zenora-purple opacity-5 blur-3xl rounded-full"></div>
        
        <div className="zenora-container relative z-10">
          <div className="text-center mb-8 animate-slide-in">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-zenora-gradient">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your AI-powered property management dashboard
            </p>
          </div>
          
          <div className="animate-scale-in">
            <AuthForm mode="login" />
          </div>
          
          <div className="text-center mt-8 text-sm text-muted-foreground">
            By signing in, you agree to our{" "}
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
