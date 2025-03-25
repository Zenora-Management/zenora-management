import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import AIRentAnalysis from "@/components/dashboard/AIRentAnalysis";
import { useSubscription } from "@/hooks/useSubscription";
import { Building, Settings, Zap, PieChart, User, HelpCircle, AlertTriangle } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const { isSubscriptionActive, hasAccessPermission } = useSubscription();
  const location = useLocation();
  const [error, setError] = useState<Error | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    // Debug logging - capture component render and state info
    console.log("Dashboard component rendered with:", { 
      user: user ? { id: user.id, email: user.email } : null,
      loading,
      path: location.pathname,
      hasAccessPermission
    });

    // Catch any errors during component mounting
    try {
      // Any component initialization that might throw errors
      if (!user && !loading) {
        throw new Error("No user found but loading is complete");
      }
    } catch (err) {
      console.error("Error in Dashboard component:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }

    // Gather debugging info
    const info = [
      `Path: ${location.pathname}`,
      `User: ${user ? user.email : 'none'}`,
      `Loading: ${loading}`,
      `Has Permission: ${hasAccessPermission}`
    ].join('\n');
    setDebugInfo(info);
  }, [user, loading, location.pathname, hasAccessPermission]);
  
  // Check if the current path is a premium feature
  const isPremiumPath = [
    '/dashboard/properties',
    '/dashboard/tenants',
    '/dashboard/documents',
    '/dashboard/financials',
    '/dashboard/reports',
    '/dashboard/ai-rent-analysis'
  ].some(path => location.pathname.startsWith(path));
  
  // Show error state if anything went wrong
  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen">
        <Alert variant="destructive" className="mb-6 max-w-lg">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading Dashboard</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
        <div className="mb-6">
          <ZenoraButton onClick={() => window.location.reload()}>
            Reload Page
          </ZenoraButton>
        </div>
        <details className="text-sm text-gray-500 border p-2 rounded max-w-lg">
          <summary>Debug Information</summary>
          <pre className="whitespace-pre-wrap mt-2">{debugInfo}</pre>
        </details>
      </div>
    );
  }
  
  // Show a loading indicator while we fetch user data
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zenora-purple mb-4"></div>
        <p className="text-zenora-purple">Loading your dashboard...</p>
      </div>
    );
  }
  
  // Ensure user data is available
  if (!user) {
    console.log("No user found, redirecting to login");
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Alert className="mb-6 max-w-lg">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You need to be logged in to access this page. Redirecting to login...
          </AlertDescription>
        </Alert>
        <Link to="/login" className="mt-4">
          <ZenoraButton>Go to Login</ZenoraButton>
        </Link>
        <Navigate to="/login" replace />
      </div>
    );
  }
  
  // The actual dashboard content
  try {
    return (
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          
          {/* Premium routes */}
          <Route path="properties" element={
            hasAccessPermission ? <PropertyManagement /> : <PremiumFeaturePaywall feature="Property Management" />
          } />
          <Route path="tenants" element={
            hasAccessPermission ? <TenantManagement /> : <PremiumFeaturePaywall feature="Tenant Management" />
          } />
          <Route path="documents" element={
            hasAccessPermission ? <DocumentManagement /> : <PremiumFeaturePaywall feature="Document Management" />
          } />
          <Route path="financials" element={
            hasAccessPermission ? <FinancialManagement /> : <PremiumFeaturePaywall feature="Financial Management" />
          } />
          <Route path="reports" element={
            hasAccessPermission ? <ReportManagement /> : <PremiumFeaturePaywall feature="Reports" />
          } />
          <Route path="ai-rent-analysis" element={
            hasAccessPermission ? <AIRentAnalysis /> : <PremiumFeaturePaywall feature="AI Rent Analysis" />
          } />
          
          {/* Free routes */}
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpSupportPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    );
  } catch (err) {
    console.error("Error rendering Dashboard routes:", err);
    setError(err instanceof Error ? err : new Error(String(err)));
    
    // Fallback UI in case of errors in the Routes component
    return (
      <div className="p-6">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading Dashboard</AlertTitle>
          <AlertDescription>
            There was a problem loading your dashboard. Please try refreshing the page.
          </AlertDescription>
        </Alert>
        <ZenoraButton onClick={() => window.location.reload()}>
          Reload Dashboard
        </ZenoraButton>
      </div>
    );
  }
};

// Paywall component that shows when a user tries to access premium features
const PremiumFeaturePaywall = ({ feature }: { feature: string }) => {
  return (
    <div className="zenora-card p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-2">{feature}</h2>
      
      <Alert className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
        <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-300">Premium Feature</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400">
          This feature is only available to premium members. Upgrade your account to access {feature}.
        </AlertDescription>
      </Alert>
      
      <div className="p-6 rounded-lg bg-gradient-to-r from-zenora-purple/10 to-transparent border border-zenora-purple/30">
        <h3 className="text-xl font-semibold mb-3">Unlock Premium Features</h3>
        <p className="mb-4 text-muted-foreground">
          Get access to {feature} and all other premium features by upgrading to a paid plan.
        </p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-center">
            <Zap className="h-4 w-4 text-zenora-purple mr-2" />
            <span>Property Management</span>
          </li>
          <li className="flex items-center">
            <Zap className="h-4 w-4 text-zenora-purple mr-2" />
            <span>Tenant Screening</span>
          </li>
          <li className="flex items-center">
            <Zap className="h-4 w-4 text-zenora-purple mr-2" />
            <span>AI Rent Analysis</span>
          </li>
          <li className="flex items-center">
            <Zap className="h-4 w-4 text-zenora-purple mr-2" />
            <span>Financial Reporting</span>
          </li>
        </ul>
        <Link to="/upgrade">
          <ZenoraButton className="w-full sm:w-auto">
            Upgrade Now
          </ZenoraButton>
        </Link>
      </div>
    </div>
  );
};

// Placeholder components for each section
const PropertyManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Property Management</h2>
    <p className="mb-6 text-muted-foreground">Manage your properties, units, and maintenance requests.</p>
    <div className="space-y-4">
      {/* Property content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const TenantManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Tenant Management</h2>
    <p className="mb-6 text-muted-foreground">Manage your tenants, applications, and communications.</p>
    <div className="space-y-4">
      {/* Tenant content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const DocumentManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Document Management</h2>
    <p className="mb-6 text-muted-foreground">Store and manage leases, contracts, and other important documents.</p>
    <div className="space-y-4">
      {/* Document content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const FinancialManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Financial Management</h2>
    <p className="mb-6 text-muted-foreground">Track rent payments, expenses, and generate financial reports.</p>
    <div className="space-y-4">
      {/* Financials content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const ReportManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Reports</h2>
    <p className="mb-6 text-muted-foreground">Generate and view reports on your properties and financials.</p>
    <div className="space-y-4">
      {/* Reports content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
    <p className="mb-6 text-muted-foreground">Manage your account preferences and notification settings.</p>
    <div className="space-y-4">
      {/* Settings content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const HelpSupportPage = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
    <p className="mb-6 text-muted-foreground">Get help with using the Zenora platform.</p>
    <div className="space-y-4">
      {/* Help content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

export default Dashboard;
