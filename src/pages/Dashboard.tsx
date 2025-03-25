
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { useAuth } from "@/contexts/AuthContext";
import { authBypass } from "@/utils/auth-bypass";
import { Building, Settings, Zap, PieChart, User, HelpCircle } from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const isLoggedIn = user || authBypass.isEnabled();
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You need to be logged in to view this page.</p>
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
              <h1 className="text-3xl font-bold mb-2">Property Owner Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.email || "Property Owner"}!
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <ZenoraButton variant="outline" onClick={() => signOut()}>
                Sign Out
              </ZenoraButton>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Properties</h3>
                <div className="p-2 bg-zenora-purple/10 rounded-full">
                  <Building className="h-5 w-5 text-zenora-purple" />
                </div>
              </div>
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Total properties under management</p>
            </div>
            
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Occupancy</h3>
                <div className="p-2 bg-green-100 rounded-full">
                  <User className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-muted-foreground">All units are currently occupied</p>
            </div>
            
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Revenue</h3>
                <div className="p-2 bg-blue-100 rounded-full">
                  <PieChart className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">$6,250</p>
              <p className="text-sm text-muted-foreground">Monthly rental income</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="zenora-card p-6 h-full">
                <h2 className="text-xl font-bold mb-6">Your Properties</h2>
                
                <div className="space-y-4">
                  {[
                    {
                      name: "Sunnyvale Apartments",
                      address: "123 Main St, Sunnyvale, CA",
                      units: 1,
                      status: "Occupied",
                    },
                    {
                      name: "Fremont House",
                      address: "456 Oak Ave, Fremont, CA",
                      units: 1,
                      status: "Occupied",
                    },
                    {
                      name: "San Jose Condo",
                      address: "789 Pine Rd, San Jose, CA",
                      units: 1,
                      status: "Occupied",
                    },
                  ].map((property, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-medium">{property.name}</h3>
                        <p className="text-sm text-muted-foreground">{property.address}</p>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <span className="text-sm bg-green-100 text-green-700 py-1 px-3 rounded-full">
                          {property.status}
                        </span>
                        <ZenoraButton variant="outline" size="sm" className="ml-3">
                          View
                        </ZenoraButton>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <ZenoraButton>
                    <Building className="mr-2 h-4 w-4" /> Add Property
                  </ZenoraButton>
                </div>
              </div>
            </div>
            
            <div>
              <div className="zenora-card p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">AI Insights</h2>
                <div className="p-4 border border-zenora-purple/30 bg-zenora-purple/5 rounded-lg">
                  <p className="text-sm mb-2">
                    <strong>Rent Optimization:</strong> Based on current market trends, you could increase rent on your Sunnyvale property by 5% ($125/month) upon renewal.
                  </p>
                  <ZenoraButton variant="outline" size="sm" className="w-full">
                    <Zap className="mr-2 h-4 w-4" /> View Analysis
                  </ZenoraButton>
                </div>
              </div>
              
              <div className="zenora-card p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <ZenoraButton variant="outline" size="sm" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" /> Account Settings
                  </ZenoraButton>
                  <ZenoraButton variant="outline" size="sm" className="w-full justify-start">
                    <HelpCircle className="mr-2 h-4 w-4" /> Get Support
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

export default Dashboard;
