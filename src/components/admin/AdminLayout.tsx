
import { ReactNode } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  Mail, 
  Settings, 
  Shield, 
  FileText,
  DollarSign,
  BarChart3,
  Globe,
  Bell,
  LogOut
} from "lucide-react";

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                System administration and management
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <ZenoraButton variant="outline" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </ZenoraButton>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="zenora-card p-4">
                <nav className="space-y-1">
                  <NavLink 
                    to="/admin" 
                    end
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <LayoutDashboard className="mr-3 h-4 w-4" />
                    Dashboard
                  </NavLink>
                  
                  <NavLink 
                    to="/admin/users" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <Users className="mr-3 h-4 w-4" />
                    Users
                  </NavLink>
                  
                  <NavLink 
                    to="/admin/properties" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <Building className="mr-3 h-4 w-4" />
                    Properties
                  </NavLink>
                  
                  <NavLink 
                    to="/admin/financials" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <DollarSign className="mr-3 h-4 w-4" />
                    Financials
                  </NavLink>
                  
                  <NavLink 
                    to="/admin/inquiries" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <Mail className="mr-3 h-4 w-4" />
                    Inquiries
                  </NavLink>
                  
                  <NavLink 
                    to="/admin/reports" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <BarChart3 className="mr-3 h-4 w-4" />
                    Reports
                  </NavLink>
                  
                  <NavLink 
                    to="/admin/website" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <Globe className="mr-3 h-4 w-4" />
                    Website
                  </NavLink>
                  
                  <NavLink 
                    to="/admin/notifications" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <Bell className="mr-3 h-4 w-4" />
                    Notifications
                  </NavLink>
                  
                  <NavLink 
                    to="/admin/settings" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </NavLink>
                  
                  <NavLink 
                    to="/admin/security" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <Shield className="mr-3 h-4 w-4" />
                    Security
                  </NavLink>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-4">
              {children || <Outlet />}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;
