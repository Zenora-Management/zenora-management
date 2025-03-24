
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Home, 
  LineChart, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User,
  ChevronDown,
  Bell,
  AlertTriangle
} from "lucide-react";
import AIRentAnalysis from "@/components/dashboard/AIRentAnalysis";
import PropertyList from "@/components/dashboard/PropertyList";
import ReportGenerator from "@/components/dashboard/ReportGenerator";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { authBypass } from "@/utils/auth-bypass";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("properties");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, this would check an actual auth token
      // For now, we're allowing access if bypass is enabled
      const isBypassEnabled = authBypass.isEnabled();
      setIsTestMode(isBypassEnabled);
      
      if (!isBypassEnabled) {
        // Redirect to login if not in bypass mode
        // This would normally check for a valid auth token
        toast({
          title: "Authentication required",
          description: "Please log in to access the dashboard.",
          variant: "destructive",
        });
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    // Disable bypass if it was enabled
    authBypass.disable();
    // In a real app, this would handle authentication logout
    navigate("/");
  };

  // Render the appropriate component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "rentAnalysis":
        return <AIRentAnalysis />;
      case "reports":
        return <ReportGenerator />;
      case "properties":
      default:
        return <PropertyList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zenora-dark">
      {/* Header */}
      <header className="bg-white dark:bg-black shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zenora-dark/50 md:hidden"
              aria-label="Toggle sidebar"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-zenora-gradient flex items-center justify-center">
                <span className="font-bold text-white text-sm">Z</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline-block bg-clip-text text-transparent bg-zenora-gradient">
                Zenora
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isTestMode && (
              <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                <AlertTriangle size={12} className="mr-1" />
                Test Mode
              </div>
            )}
            
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zenora-dark/50 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zenora-dark/50">
                <div className="h-8 w-8 rounded-full bg-zenora-gradient flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <span className="hidden sm:block text-sm font-medium">John Doe</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 pt-16 left-0 z-10 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative`}
        >
          <div className="flex flex-col h-full p-4">
            <nav className="space-y-1 mt-6">
              <button
                onClick={() => setActiveTab("properties")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === "properties"
                    ? "bg-zenora-gradient text-white font-medium"
                    : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                }`}
              >
                <Home className="mr-3 h-5 w-5" />
                <span>My Properties</span>
              </button>
              
              <button
                onClick={() => setActiveTab("rentAnalysis")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === "rentAnalysis"
                    ? "bg-zenora-gradient text-white font-medium"
                    : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                }`}
              >
                <LineChart className="mr-3 h-5 w-5" />
                <span>AI Rent Analysis</span>
              </button>
              
              <button
                onClick={() => setActiveTab("reports")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === "reports"
                    ? "bg-zenora-gradient text-white font-medium"
                    : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                }`}
              >
                <FileText className="mr-3 h-5 w-5" />
                <span>Reports</span>
              </button>
            </nav>
            
            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="space-y-1">
                <Link to="/settings">
                  <button className="flex items-center w-full px-3 py-2 rounded-md text-sm text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50">
                    <Settings className="mr-3 h-5 w-5" />
                    <span>Settings</span>
                  </button>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 rounded-md text-sm text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Log Out</span>
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-zenora-dark/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-zenora-purple/10 rounded-lg">
                    <User className="h-5 w-5 text-zenora-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pro Plan</p>
                    <p className="text-xs text-muted-foreground mb-3">5 properties • 3 reports/mo</p>
                    <Link to="/upgrade">
                      <ZenoraButton variant="outline" size="sm" className="w-full">
                        Upgrade
                      </ZenoraButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={`flex-1 p-6 md:p-8 lg:p-10 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : ""}`}>
          {isTestMode && (
            <div className="mb-6 p-4 border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-lg">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 mb-2">
                <AlertTriangle size={18} />
                <h2 className="font-semibold">Test Mode Active</h2>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                You're viewing this dashboard in test mode. All data is simulated.
              </p>
              <div className="mt-2">
                <button 
                  onClick={handleLogout} 
                  className="text-xs text-amber-800 dark:text-amber-300 underline hover:no-underline"
                >
                  Exit Test Mode
                </button>
              </div>
            </div>
          )}
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
