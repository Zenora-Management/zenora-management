import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminOverview from "@/components/admin/AdminOverview";
import { ZenoraButton } from "@/components/ui/button-zenora";

const Admin = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="properties" element={<PropertiesManagement />} />
        <Route path="financials" element={<FinancialsManagement />} />
        <Route path="inquiries" element={<InquiriesManagement />} />
        <Route path="reports" element={<ReportsManagement />} />
        <Route path="website" element={<WebsiteManagement />} />
        <Route path="notifications" element={<NotificationsManagement />} />
        <Route path="settings" element={<SettingsManagement />} />
        <Route path="security" element={<SecurityManagement />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

// Placeholder components for each section
const UsersManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">User Management</h2>
    <p className="mb-6 text-muted-foreground">Manage users, roles and permissions.</p>
    <div className="space-y-4">
      {/* User management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const PropertiesManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Property Management</h2>
    <p className="mb-6 text-muted-foreground">Manage all properties in the system.</p>
    <div className="space-y-4">
      {/* Property management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const FinancialsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Financial Management</h2>
    <p className="mb-6 text-muted-foreground">Manage system finances, payments, and subscriptions.</p>
    <div className="space-y-4">
      {/* Financial management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const InquiriesManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Inquiries Management</h2>
    <p className="mb-6 text-muted-foreground">Manage and respond to user inquiries and support requests.</p>
    <div className="space-y-4">
      {/* Inquiries management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const ReportsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Reports</h2>
    <p className="mb-6 text-muted-foreground">Generate and view system-wide reports and analytics.</p>
    <div className="space-y-4">
      {/* Reports management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const WebsiteManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Website Management</h2>
    <p className="mb-6 text-muted-foreground">Manage website content, blog posts, and SEO settings.</p>
    <div className="space-y-4">
      {/* Website management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const NotificationsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Notifications</h2>
    <p className="mb-6 text-muted-foreground">Manage system notifications and announcements.</p>
    <div className="space-y-4">
      {/* Notifications content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const SettingsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">System Settings</h2>
    <p className="mb-6 text-muted-foreground">Configure global system settings and preferences.</p>
    <div className="space-y-4">
      {/* Settings content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const SecurityManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
    <p className="mb-6 text-muted-foreground">Manage system security, access logs, and authentication settings.</p>
    <div className="space-y-4">
      {/* Security content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

export default Admin;
