
import { toast } from "@/hooks/use-toast";

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Simple session storage key for bypass token
const BYPASS_KEY = 'zenora_bypass_auth';

/**
 * Enables bypass login functionality for development and testing
 */
export const authBypass = {
  /**
   * Enable the bypass functionality
   * @returns {boolean} Whether the bypass was successful
   */
  enable: (): boolean => {
    if (!isDevelopment) {
      console.warn('Auth bypass attempted in production environment');
      return false;
    }
    
    sessionStorage.setItem(BYPASS_KEY, 'true');
    toast({
      title: "Testing mode activated",
      description: "Bypass login is now enabled for testing purposes.",
      variant: "default",
    });
    
    return true;
  },
  
  /**
   * Disable the bypass functionality
   */
  disable: (): void => {
    sessionStorage.removeItem(BYPASS_KEY);
    
    if (isDevelopment) {
      toast({
        title: "Testing mode deactivated",
        description: "Bypass login has been disabled.",
        variant: "default",
      });
    }
  },
  
  /**
   * Check if bypass is currently enabled
   * @returns {boolean} Whether bypass is enabled
   */
  isEnabled: (): boolean => {
    return isDevelopment && sessionStorage.getItem(BYPASS_KEY) === 'true';
  },
  
  /**
   * Toggle the bypass functionality
   * @returns {boolean} The new state (true = enabled, false = disabled)
   */
  toggle: (): boolean => {
    if (authBypass.isEnabled()) {
      authBypass.disable();
      return false;
    } else {
      return authBypass.enable();
    }
  }
};
