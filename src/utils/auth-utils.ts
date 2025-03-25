
import { User } from '@supabase/supabase-js';

// Admin emails for special handling
export const ADMIN_EMAILS = ["zenoramgmt@gmail.com", "anshparikh@gmail.com", "anvisrini@gmail.com"];

/**
 * Checks if a user has admin privileges
 * @param user The user to check
 * @returns boolean indicating if the user is an admin
 */
export const checkIsAdmin = (user: User | null): boolean => {
  if (!user) return false;
  const isAdmin = ADMIN_EMAILS.includes(user.email || '');
  console.log(`Checking if ${user.email} is admin:`, isAdmin);
  return isAdmin;
};

/**
 * Helper function to safely navigate to a path only if not already there
 * @param navigate React Router navigate function
 * @param path Target path
 * @param currentPath Current location path
 */
export const safeNavigate = (
  navigate: (path: string) => void, 
  path: string, 
  currentPath: string
): void => {
  // Only navigate if we're not already on that path
  if (currentPath !== path) {
    navigate(path);
  }
};
