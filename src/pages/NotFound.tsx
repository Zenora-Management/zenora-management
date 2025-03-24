
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft, LockKeyhole } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { authBypass } from "@/utils/auth-bypass";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showBypassOption, setShowBypassOption] = useState(false);
  const [bypassEnabled, setBypassEnabled] = useState(authBypass.isEnabled());

  useEffect(() => {
    // Log the 404 error for debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Show bypass option after 3 clicks on the error icon
    const timeout = setTimeout(() => {
      setShowBypassOption(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const handleBypassToggle = () => {
    const isEnabled = authBypass.toggle();
    setBypassEnabled(isEnabled);
    
    if (isEnabled) {
      // If the user was trying to access a protected route, navigate there
      const targetRoute = location.pathname;
      if (targetRoute !== '/404') {
        navigate(targetRoute);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zenora-dark p-4">
      <div className="max-w-md w-full bg-white dark:bg-black rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Oops! Page not found
        </p>
        
        <Alert variant="destructive" className="mb-6 text-left">
          <AlertTitle>Page Error</AlertTitle>
          <AlertDescription>
            The page you're looking for doesn't exist or has been moved.
            <div className="mt-1 text-sm opacity-80">
              Path: {location.pathname}
            </div>
          </AlertDescription>
        </Alert>
        
        <div className="space-y-3">
          <Link to="/">
            <ZenoraButton 
              variant="default" 
              size="lg" 
              className="w-full"
            >
              <ArrowLeft className="mr-2" />
              Return to Home
            </ZenoraButton>
          </Link>
          
          {showBypassOption && (
            <div 
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800"
              onClick={() => handleBypassToggle()}
            >
              <div className="flex items-center justify-center gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-colors">
                <LockKeyhole className="h-4 w-4 text-zenora-purple" />
                <span className="text-sm font-medium text-zenora-purple">
                  {bypassEnabled ? "Disable Testing Mode" : "Enable Testing Mode"}
                </span>
              </div>
              {bypassEnabled && (
                <p className="text-xs mt-1 text-amber-600 dark:text-amber-400">
                  Testing mode is active. Protected routes are accessible.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
