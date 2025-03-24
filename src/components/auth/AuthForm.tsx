
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  mode: AuthMode;
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setLoading(false);
      
      // Show success toast
      toast({
        title: mode === "login" ? "Welcome back!" : "Account created!",
        description: mode === "login" 
          ? "You've successfully signed in." 
          : "Your account has been created successfully.",
        variant: "default",
      });
      
      // Redirect to dashboard on successful auth
      navigate("/dashboard");
    }, 1500);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="zenora-card p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 rounded-full bg-zenora-gradient flex items-center justify-center shadow-lg mb-4">
            <span className="font-bold text-white text-xl">Z</span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </h1>
          
          <p className="text-muted-foreground">
            {mode === "login" 
              ? "Sign in to access your dashboard" 
              : "Join Zenora to start managing your properties"
            }
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="zenora-input pl-10"
                  placeholder="John Doe"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <User className="h-5 w-5" />
                </div>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="zenora-input pl-10"
                placeholder="john@example.com"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Mail className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="zenora-input pl-10"
                placeholder="••••••••"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Lock className="h-5 w-5" />
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {mode === "login" && (
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-zenora-purple hover:underline">
                Forgot password?
              </Link>
            </div>
          )}
          
          <ZenoraButton 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {mode === "login" ? "Signing in..." : "Creating account..."}
              </>
            ) : (
              mode === "login" ? "Sign In" : "Create Account"
            )}
          </ZenoraButton>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-zenora-dark text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            {["Google", "Apple", "Microsoft"].map((provider) => (
              <button
                key={provider}
                type="button"
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-foreground bg-white dark:bg-zenora-dark hover:bg-gray-50 dark:hover:bg-black/20"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link 
              to={mode === "login" ? "/signup" : "/login"} 
              className="font-semibold text-zenora-purple hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
