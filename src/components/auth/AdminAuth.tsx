
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const { user, loading, checkIsAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!checkIsAdmin(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminAuth;
