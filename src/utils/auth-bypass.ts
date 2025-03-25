
import { toast } from "@/hooks/use-toast";

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Simple session storage keys for bypass token
const BYPASS_KEY = 'zenora_bypass_auth';
const USER_TYPE_KEY = 'zenora_user_type';

// Type for user roles
type UserType = "regular" | "admin";

// Subscriber system
type Subscriber = (isEnabled: boolean) => void;
const subscribers: Set<Subscriber> = new Set();

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
    sessionStorage.setItem(BYPASS_KEY, 'true');
    sessionStorage.setItem(USER_TYPE_KEY, userType);
    
    toast({
      title: "Testing mode activated",
      description: `Bypass login is enabled (${userType === "admin" ? "Administrator" : "Property Owner"} mode).`,
      variant: "default",
    });
    
    // Notify subscribers
    subscribers.forEach(subscriber => subscriber(true));
    
    return true;
  },
  
  /**
   * Disable the bypass functionality
   */
  disable: (): void => {
    sessionStorage.removeItem(BYPASS_KEY);
    sessionStorage.removeItem(USER_TYPE_KEY);
    
    toast({
      title: "Testing mode deactivated",
      description: "Bypass login has been disabled.",
      variant: "default",
    });
    
    // Notify subscribers
    subscribers.forEach(subscriber => subscriber(false));
  },
  
  /**
   * Check if bypass is currently enabled
   * @returns {boolean} Whether bypass is enabled
   */
  isEnabled: (): boolean => {
    return sessionStorage.getItem(BYPASS_KEY) === 'true';
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
  },
  
  /**
   * Subscribe to changes in bypass state
   * @param callback Function to call when bypass state changes
   * @returns {Function} Unsubscribe function
   */
  subscribe: (callback: Subscriber): (() => void) => {
    subscribers.add(callback);
    return () => {
      subscribers.delete(callback);
    };
  }
};
