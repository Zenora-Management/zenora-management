import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const { user, loading, isUserAdmin } = useAuth();
  const location = useLocation();
  
  // Development bypass handling
  const bypassAuth = localStorage.getItem('zenora_bypass_auth') === 'true';
  const bypassType = localStorage.getItem('zenora_bypass_type');
  const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zenora-purple"></div>
      </div>
    );
  }

  // Check regular authentication first
  if (!user && !(isDevelopment && bypassAuth)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Handle admin checking with bypass support
  const isAdmin = user ? isUserAdmin() : (isDevelopment && bypassType === 'admin');
  
  // If not admin, redirect to user dashboard
  if (!isAdmin) {
    console.log('Non-admin user attempting to access admin dashboard, redirecting to user dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminAuth;
