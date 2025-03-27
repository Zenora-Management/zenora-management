import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthProps {
  children: ReactNode;
}

const Auth = ({ children }: AuthProps) => {
  const { user, loading } = useAuth();
  const bypassAuth = localStorage.getItem('zenora_bypass_auth') === 'true';
  const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zenora-purple"></div>
      </div>
    );
  }

  // Allow bypass in development mode
  if (!user && !(isDevelopment && bypassAuth)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default Auth;
