
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminAuthProps {
  children: ReactNode;
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const { user, loading } = useAuth();
  const isAdmin = user?.email === "zenoramgmt@gmail.com";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zenora-purple"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminAuth;
