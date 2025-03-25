import { ReactNode, useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Home, 
  Building, 
  User, 
  FileText, 
  Settings, 
  HelpCircle, 
  DollarSign,
  PieChart,
  LogOut,
  Zap,
  AlertTriangle
} from "lucide-react";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { signOut, user } = useAuth();
  const [error, setError] = useState<Error | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Log component mounting
    console.log("DashboardLayout mounted, path:", location.pathname);
    console.log("User in DashboardLayout:", user ? { id: user.id, email: user.email } : "No user");

    // Cleanup
    return () => {
      console.log("DashboardLayout unmounted");
    };
  }, [location.pathname, user]);

  // Safe signOut handler with error catching
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Error signing out:", err);
      setError(err instanceof Error ? err : new Error("Failed to sign out"));
    }
  };

  // If there's an error, show error message
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="zenora-container">
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
            <div className="flex gap-4">
              <ZenoraButton onClick={() => window.location.reload()}>
                Reload Page
              </ZenoraButton>
              <ZenoraButton variant="outline" onClick={() => setError(null)}>
                Dismiss Error
              </ZenoraButton>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Add error boundary for the main content
  const renderMainContent = () => {
    try {
      return children || <Outlet />;
    } catch (err) {
      console.error("Error rendering dashboard content:", err);
      return (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Rendering Content</AlertTitle>
          <AlertDescription>
            There was a problem displaying this content. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your properties and accounts
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <ZenoraButton variant="outline" onClick={handleSignOut}>
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
                    to="/dashboard" 
                    end
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <Home className="mr-3 h-4 w-4" />
                    Overview
                  </NavLink>
                  
                  <NavLink 
                    to="/dashboard/properties" 
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
                    to="/dashboard/tenants" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <User className="mr-3 h-4 w-4" />
                    Tenants
                  </NavLink>
                  
                  <NavLink 
                    to="/dashboard/documents" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <FileText className="mr-3 h-4 w-4" />
                    Documents
                  </NavLink>
                  
                  <NavLink 
                    to="/dashboard/financials" 
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
                    to="/dashboard/reports" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <PieChart className="mr-3 h-4 w-4" />
                    Reports
                  </NavLink>
                  
                  <NavLink 
                    to="/dashboard/ai-rent-analysis" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <Zap className="mr-3 h-4 w-4" />
                    AI Rent Analysis
                  </NavLink>
                  
                  <NavLink 
                    to="/dashboard/settings" 
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
                    to="/dashboard/help" 
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? 'bg-zenora-purple text-white font-medium' 
                          : 'hover:bg-zenora-purple/10 text-foreground'
                      }`
                    }
                  >
                    <HelpCircle className="mr-3 h-4 w-4" />
                    Help & Support
                  </NavLink>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-4">
              {renderMainContent()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardLayout;
