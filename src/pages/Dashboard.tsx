
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { Building, Settings, Zap, PieChart, User, HelpCircle } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="properties" element={<PropertyManagement />} />
        <Route path="tenants" element={<TenantManagement />} />
        <Route path="documents" element={<DocumentManagement />} />
        <Route path="financials" element={<FinancialManagement />} />
        <Route path="reports" element={<ReportManagement />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpSupportPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
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
