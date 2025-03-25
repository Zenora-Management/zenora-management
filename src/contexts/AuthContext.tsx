
import { createContext, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useAuthState } from '@/hooks/use-auth-state';
import { useAuthOperations } from '@/hooks/use-auth-operations';
import { checkIsAdmin } from '@/utils/auth-utils';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkIsAdmin: (user: User) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Use our custom hooks to handle auth state and operations
  const { 
    session, 
    user, 
    loading: stateLoading, 
    authChangeInProgress, 
    setAuthChangeInProgress 
  } = useAuthState();
  
  const { 
    loading: operationsLoading, 
    signIn, 
    signUp, 
    signOut 
  } = useAuthOperations({ 
    authChangeInProgress, 
    setAuthChangeInProgress 
  });

  // Combine loading states
  const loading = stateLoading || operationsLoading;

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      checkIsAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
