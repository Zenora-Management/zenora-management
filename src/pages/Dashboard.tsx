
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import AIRentAnalysis from "@/components/dashboard/AIRentAnalysis";
import { useSubscription } from "@/hooks/useSubscription";
import { Building, Settings, Zap, PieChart, User, HelpCircle } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Dashboard = () => {
  const { user } = useAuth();
  const { isSubscriptionActive, hasAccessPermission } = useSubscription();
  const location = useLocation();
  
  // Check if the current path is a premium feature
  const isPremiumPath = [
    '/dashboard/properties',
    '/dashboard/tenants',
    '/dashboard/documents',
    '/dashboard/financials',
    '/dashboard/reports',
    '/dashboard/ai-rent-analysis'
  ].some(path => location.pathname.startsWith(path));
  
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
        <ZenoraButton className="w-full sm:w-auto" href="/upgrade">
          Upgrade Now
        </ZenoraButton>
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
