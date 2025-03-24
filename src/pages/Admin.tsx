import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User,
  ChevronDown,
  Bell,
  LayoutDashboard,
  Search,
  Plus,
  AlertTriangle,
  ShieldCheck,
  HelpCircle,
  MessageSquare
} from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { authBypass } from "@/utils/auth-bypass";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isBypassEnabled = authBypass.isEnabled();
      const isAdmin = authBypass.isAdmin();
      
      setIsTestMode(isBypassEnabled);
      
      if (!isBypassEnabled) {
        toast({
          title: "Authentication required",
          description: "Please log in to access the admin portal.",
          variant: "destructive",
        });
        navigate('/login');
      } else if (!isAdmin) {
        toast({
          title: "Access denied",
          description: "You don't have administrative privileges.",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    authBypass.disable();
    navigate("/");
  };

  const recentProperties = [
    {
      id: 1,
      name: "Shoreline Apartments",
      owner: "John Doe",
      date: "2023-11-15",
      status: "active"
    },
    {
      id: 2,
      name: "Urban Heights",
      owner: "Jane Smith",
      date: "2023-11-14",
      status: "pending"
    },
    {
      id: 3,
      name: "Golden Gate Condos",
      owner: "Mike Johnson",
      date: "2023-11-13",
      status: "maintenance"
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joined: "2023-10-05",
      properties: 3
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joined: "2023-10-12",
      properties: 1
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      joined: "2023-11-01",
      properties: 2
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zenora-dark">
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
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg bg-clip-text text-transparent bg-zenora-gradient">
                  Zenora
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Admin Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isTestMode && (
              <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                <AlertTriangle size={12} className="mr-1" />
                Admin Mode
              </div>
            )}
          
            <div className="relative hidden md:block w-64">
              <input
                type="search"
                className="zenora-input h-9 pl-10"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
            </div>
            
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zenora-dark/50 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zenora-dark/50">
                <div className="h-8 w-8 rounded-full bg-zenora-gradient flex items-center justify-center text-white font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="hidden sm:block text-sm font-medium">Admin</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        <aside
          className={`fixed inset-y-0 pt-16 left-0 z-10 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative`}
        >
          <div className="flex flex-col h-full p-4">
            <nav className="space-y-1 mt-6">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === "dashboard"
                    ? "bg-zenora-gradient text-white font-medium"
                    : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </button>
              
              <button
                onClick={() => setActiveTab("properties")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === "properties"
                    ? "bg-zenora-gradient text-white font-medium"
                    : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                }`}
              >
                <Home className="mr-3 h-5 w-5" />
                <span>Properties</span>
              </button>
              
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === "users"
                    ? "bg-zenora-gradient text-white font-medium"
                    : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                <span>Users</span>
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
                <Link to="/admin/settings">
                  <button className="flex items-center w-full px-3 py-2 rounded-md text-sm text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50">
                    <Settings className="mr-3 h-5 w-5" />
                    <span>Settings</span>
                  </button>
                </Link>
                
                <Link to="/help">
                  <button className="flex items-center w-full px-3 py-2 rounded-md text-sm text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50">
                    <HelpCircle className="mr-3 h-5 w-5" />
                    <span>Help & Support</span>
                  </button>
                </Link>

                <Link to="/contact">
                  <button className="flex items-center w-full px-3 py-2 rounded-md text-sm text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50">
                    <MessageSquare className="mr-3 h-5 w-5" />
                    <span>Contact Us</span>
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
                    <ShieldCheck className="h-5 w-5 text-zenora-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Admin Access</p>
                    <p className="text-xs text-muted-foreground">Full system control</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className={`flex-1 p-6 md:p-8 lg:p-10 transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : ""}`}>
          {isTestMode && (
            <div className="mb-6 p-4 border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 rounded-lg">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 mb-2">
                <AlertTriangle size={18} />
                <h2 className="font-semibold">Admin Test Mode Active</h2>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                You're viewing the admin portal in test mode. All data is simulated.
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
        
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <LayoutDashboard className="h-5 w-5 text-zenora-purple" />
                </div>
                <h2 className="text-xl font-semibold">Admin Dashboard</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Users", value: "128", change: "+12%" },
                  { label: "Properties", value: "256", change: "+8%" },
                  { label: "Reports Generated", value: "893", change: "+15%" },
                  { label: "AI Analyses", value: "1,243", change: "+27%" }
                ].map((stat, i) => (
                  <div key={i} className="zenora-card p-6">
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="zenora-card p-6">
                  <h3 className="text-lg font-medium mb-4">Recent Properties</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Property</th>
                          <th className="text-left py-3 px-2">Owner</th>
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProperties.map((property) => (
                          <tr 
                            key={property.id} 
                            className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-zenora-dark/50"
                          >
                            <td className="py-3 px-2 font-medium">{property.name}</td>
                            <td className="py-3 px-2">{property.owner}</td>
                            <td className="py-3 px-2">{new Date(property.date).toLocaleDateString()}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                property.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : property.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}>
                                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <Link to="/admin/properties">
                      <ZenoraButton variant="outline" size="sm">View All Properties</ZenoraButton>
                    </Link>
                  </div>
                </div>
                
                <div className="zenora-card p-6">
                  <h3 className="text-lg font-medium mb-4">Recent Users</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">User</th>
                          <th className="text-left py-3 px-2">Joined</th>
                          <th className="text-left py-3 px-2">Properties</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentUsers.map((user) => (
                          <tr 
                            key={user.id} 
                            className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-zenora-dark/50"
                          >
                            <td className="py-3 px-2">
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </td>
                            <td className="py-3 px-2">{new Date(user.joined).toLocaleDateString()}</td>
                            <td className="py-3 px-2">{user.properties}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <Link to="/admin/users">
                      <ZenoraButton variant="outline" size="sm">View All Users</ZenoraButton>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="zenora-card p-6">
                <h3 className="text-lg font-medium mb-4">System Status</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-4 bg-gray-50 dark:bg-zenora-dark/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">AI Engine</p>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Operational
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-zenora-dark/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">Database</p>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Operational
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Load: 32%
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-zenora-dark/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">API Services</p>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Operational
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Response time: 86ms
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "properties" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zenora-purple/10 rounded-lg">
                    <Home className="h-5 w-5 text-zenora-purple" />
                  </div>
                  <h2 className="text-xl font-semibold">Manage Properties</h2>
                </div>
                
                <ZenoraButton size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Add Property
                </ZenoraButton>
              </div>
              
              <div className="zenora-card p-6">
                <p className="text-muted-foreground text-center py-8">
                  Properties management interface would be displayed here
                </p>
              </div>
            </div>
          )}
          
          {activeTab === "users" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zenora-purple/10 rounded-lg">
                    <Users className="h-5 w-5 text-zenora-purple" />
                  </div>
                  <h2 className="text-xl font-semibold">Manage Users</h2>
                </div>
                
                <ZenoraButton size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Add User
                </ZenoraButton>
              </div>
              
              <div className="zenora-card p-6">
                <p className="text-muted-foreground text-center py-8">
                  User management interface would be displayed here
                </p>
              </div>
            </div>
          )}
          
          {activeTab === "reports" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <FileText className="h-5 w-5 text-zenora-purple" />
                </div>
                <h2 className="text-xl font-semibold">Report Management</h2>
              </div>
              
              <div className="zenora-card p-6">
                <p className="text-muted-foreground text-center py-8">
                  Reports management interface would be displayed here
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;

