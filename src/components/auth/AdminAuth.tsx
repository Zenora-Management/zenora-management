import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const { user, loading, isUserAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isUserAdmin()) {
    console.log('User is not an admin, redirecting to user dashboard:', user.email);
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminAuth;
