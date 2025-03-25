
import { toast } from "@/hooks/use-toast";

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Simple session storage keys for bypass token
const BYPASS_KEY = 'zenora_bypass_auth';
const USER_TYPE_KEY = 'zenora_user_type';

// Type for user roles
type UserType = "regular" | "admin";

/**
 * Enables bypass login functionality for development and testing
 */
export const authBypass = {
  /**
   * Enable the bypass functionality with a specified user type
   * @param userType The type of user to bypass as (regular or admin)
   * @returns {boolean} Whether the bypass was successful
   */
  enable: (userType: UserType = "regular"): boolean => {
    if (!isDevelopment) {
      console.warn('Auth bypass attempted in production environment');
      return false;
    }
    
    sessionStorage.setItem(BYPASS_KEY, 'true');
    sessionStorage.setItem(USER_TYPE_KEY, userType);
    
    toast({
      title: "Testing mode activated",
      description: `Bypass login is enabled (${userType === "admin" ? "Administrator" : "Property Owner"} mode).`,
      variant: "default",
    });
    
    return true;
  },
  
  /**
   * Disable the bypass functionality
   */
  disable: (): void => {
    sessionStorage.removeItem(BYPASS_KEY);
    sessionStorage.removeItem(USER_TYPE_KEY);
    
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
   * Get the current user type for this bypass session
   * @returns {UserType} The user type (defaults to "regular" if not set)
   */
  getUserType: (): UserType => {
    return (sessionStorage.getItem(USER_TYPE_KEY) as UserType) || "regular";
  },
  
  /**
   * Check if bypass is enabled and user is an admin
   * @returns {boolean} Whether bypass is enabled and user is an admin
   */
  isAdmin: (): boolean => {
    return authBypass.isEnabled() && authBypass.getUserType() === "admin";
  },
  
  /**
   * Toggle the bypass functionality
   * @param userType The type of user to bypass as when enabling
   * @returns {boolean} The new state (true = enabled, false = disabled)
   */
  toggle: (userType: UserType = "regular"): boolean => {
    if (authBypass.isEnabled()) {
      authBypass.disable();
      return false;
    } else {
      return authBypass.enable(userType);
    }
  }
};
