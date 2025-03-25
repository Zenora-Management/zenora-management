
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { useAuth } from "@/contexts/AuthContext";
import { authBypass } from "@/utils/auth-bypass";
import { Users, Building, DollarSign, BarChart, Settings, Mail, Shield, User } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.email === "zenoramgmt@gmail.com" || authBypass.isAdmin();
  
  useEffect(() => {
    // Redirect if not an admin
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Admin Access Only</h1>
        <p className="mb-4">You need administrator privileges to view this page.</p>
        <ZenoraButton as={Link} to="/login">Go to Login</ZenoraButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Administrator Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, Admin!
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <ZenoraButton variant="outline" onClick={() => signOut()}>
                Sign Out
              </ZenoraButton>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Clients</h3>
                <div className="p-2 bg-zenora-purple/10 rounded-full">
                  <Users className="h-5 w-5 text-zenora-purple" />
                </div>
              </div>
              <p className="text-3xl font-bold">42</p>
              <p className="text-sm text-muted-foreground">Total active clients</p>
            </div>
            
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Properties</h3>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">78</p>
              <p className="text-sm text-muted-foreground">Properties under management</p>
            </div>
            
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Revenue</h3>
                <div className="p-2 bg-green-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">$83,950</p>
              <p className="text-sm text-muted-foreground">Monthly revenue</p>
            </div>
            
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Inquiries</h3>
                <div className="p-2 bg-amber-100 rounded-full">
                  <Mail className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">New inquiries this week</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="zenora-card p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Recent Client Activity</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-3">Client</th>
                        <th className="text-left pb-3">Properties</th>
                        <th className="text-left pb-3">Status</th>
                        <th className="text-left pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "John Smith", email: "john@example.com", properties: 2, status: "Active" },
                        { name: "Maria Garcia", email: "maria@example.com", properties: 1, status: "Active" },
                        { name: "Robert Chen", email: "robert@example.com", properties: 3, status: "Active" },
                        { name: "Sarah Johnson", email: "sarah@example.com", properties: 1, status: "Pending" },
                        { name: "David Kim", email: "david@example.com", properties: 2, status: "Active" },
                      ].map((client, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-3">
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-muted-foreground">{client.email}</div>
                          </td>
                          <td className="py-3">{client.properties}</td>
                          <td className="py-3">
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              client.status === "Active" 
                                ? "bg-green-100 text-green-700" 
                                : "bg-amber-100 text-amber-700"
                            }`}>
                              {client.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <ZenoraButton variant="outline" size="sm">
                              View
                            </ZenoraButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="zenora-card p-6">
                <h2 className="text-xl font-bold mb-6">Recent Inquiries</h2>
                
                <div className="space-y-4">
                  {[
                    {
                      name: "Michael Turner",
                      email: "michael@example.com",
                      subject: "Inquiry about Client Plan",
                      date: "2 hours ago",
                      isDemoRequest: false,
                    },
                    {
                      name: "Jennifer Lee",
                      email: "jennifer@example.com",
                      subject: "Request a Demo",
                      date: "5 hours ago",
                      isDemoRequest: true,
                    },
                    {
                      name: "Thomas Wilson",
                      email: "thomas@example.com",
                      subject: "Pricing Information",
                      date: "1 day ago",
                      isDemoRequest: false,
                    },
                  ].map((inquiry, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-medium">{inquiry.name}</h3>
                        <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                        <p className="text-sm">
                          {inquiry.subject}
                          {inquiry.isDemoRequest && (
                            <span className="ml-2 bg-zenora-purple/10 text-zenora-purple px-2 py-0.5 rounded-full text-xs">
                              Demo Request
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{inquiry.date}</p>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <ZenoraButton variant="outline" size="sm">
                          View
                        </ZenoraButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="zenora-card p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
                <div className="h-60 flex items-center justify-center border border-border rounded-lg mb-4">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Monthly overview of properties, occupancy rates, and revenue generation.
                </p>
              </div>
              
              <div className="zenora-card p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <ZenoraButton variant="outline" size="sm" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" /> Manage Users
                  </ZenoraButton>
                  <ZenoraButton variant="outline" size="sm" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" /> System Settings
                  </ZenoraButton>
                  <ZenoraButton variant="outline" size="sm" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" /> Security Settings
                  </ZenoraButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
