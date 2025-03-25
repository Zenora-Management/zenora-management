
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';

interface MembershipAuthProps {
  children: React.ReactNode;
}

const MembershipAuth = ({ children }: MembershipAuthProps) => {
  const { user, loading } = useAuth();
  const { hasAccessPermission, isLoading: subscriptionLoading } = useSubscription();
  const location = useLocation();

  if (loading || subscriptionLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAccessPermission) {
    return <Navigate to="/upgrade" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default MembershipAuth;
