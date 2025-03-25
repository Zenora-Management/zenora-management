import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface UserAuthProps {
  children: React.ReactNode;
}

const UserAuth = ({ children }: UserAuthProps) => {
  const { user, loading, isUserAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zenora-purple"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isUserAdmin()) {
    console.log('Admin user attempting to access user dashboard, redirecting to admin dashboard:', user.email);
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default UserAuth; 