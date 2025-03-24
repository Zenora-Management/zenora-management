
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Bell, CreditCard, Lock, Moon, Sun, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "billing" | "appearance">("profile");
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user prefers dark mode
    return document.documentElement.classList.contains('dark');
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
      variant: "default",
    });
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Security settings updated",
      description: "Your security settings have been saved successfully.",
      variant: "default",
    });
  };

  const toggleDarkMode = () => {
    // Toggle dark mode class on html element
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
    
    toast({
      title: darkMode ? "Light mode activated" : "Dark mode activated",
      description: "Your display preference has been saved.",
      variant: "default",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "security":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
            
            <div className="zenora-card p-6">
              <form onSubmit={handleSaveSecurity} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium mb-1">Current Password</label>
                      <input id="current-password" type="password" className="zenora-input" placeholder="••••••••" />
                    </div>
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium mb-1">New Password</label>
                      <input id="new-password" type="password" className="zenora-input" placeholder="••••••••" />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input id="confirm-password" type="password" className="zenora-input" placeholder="••••••••" />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Login Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    These are the devices that are currently logged in to your account.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Current Session (Chrome on Windows)</p>
                        <p className="text-xs text-muted-foreground">Active now</p>
                      </div>
                      <span className="text-xs text-green-600 font-medium py-1 px-2 rounded-full bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                        Current
                      </span>
                    </div>
                    
                    <div className="flex justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Safari on iPhone</p>
                        <p className="text-xs text-muted-foreground">Last active 2 hours ago</p>
                      </div>
                      <button className="text-xs text-red-600 font-medium py-1 px-2 rounded-full bg-red-100 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <ZenoraButton type="submit">Save Security Settings</ZenoraButton>
                </div>
              </form>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
            
            <div className="zenora-card p-6">
              <form className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">Email Notifications</h3>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Property Updates</p>
                      <p className="text-sm text-muted-foreground">Receive emails about changes to your properties</p>
                    </div>
                    <Switch id="property-emails" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Rent Analysis Reports</p>
                      <p className="text-sm text-muted-foreground">Get notified when a new rent analysis is available</p>
                    </div>
                    <Switch id="report-emails" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Account Security</p>
                      <p className="text-sm text-muted-foreground">Important alerts about your account</p>
                    </div>
                    <Switch id="security-emails" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Marketing & Promotions</p>
                      <p className="text-sm text-muted-foreground">Special offers and new features</p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-semibold mb-2">In-App Notifications</h3>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Dashboard Alerts</p>
                      <p className="text-sm text-muted-foreground">Important alerts in your dashboard</p>
                    </div>
                    <Switch id="dashboard-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Property Reminders</p>
                      <p className="text-sm text-muted-foreground">Reminders about important property dates</p>
                    </div>
                    <Switch id="property-reminders" defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <ZenoraButton type="submit">Save Notification Settings</ZenoraButton>
                </div>
              </form>
            </div>
          </div>
        );
      case "billing":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Billing & Subscription</h2>
            
            <div className="zenora-card p-6">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
                
                <div className="border rounded-md p-6 bg-zenora-purple/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xl font-bold mb-1">Pro Plan</p>
                      <p className="text-muted-foreground mb-4">$39.99 per month, billed monthly</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="inline-block w-5 h-5 rounded-full bg-zenora-purple text-white flex items-center justify-center text-xs mr-2">✓</span>
                          Up to 5 properties
                        </li>
                        <li className="flex items-center">
                          <span className="inline-block w-5 h-5 rounded-full bg-zenora-purple text-white flex items-center justify-center text-xs mr-2">✓</span>
                          3 AI rent analyses per month
                        </li>
                        <li className="flex items-center">
                          <span className="inline-block w-5 h-5 rounded-full bg-zenora-purple text-white flex items-center justify-center text-xs mr-2">✓</span>
                          Priority customer support
                        </li>
                      </ul>
                    </div>
                    <Link to="/upgrade">
                      <ZenoraButton variant="outline" size="sm">
                        Upgrade Plan
                      </ZenoraButton>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                
                <div className="border rounded-md p-4 mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-16 bg-gray-200 dark:bg-gray-800 rounded mr-4 flex items-center justify-center text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-sm text-zenora-purple hover:underline">Edit</button>
                    <button className="text-sm text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
                
                <button className="text-sm text-zenora-purple hover:underline flex items-center">
                  <CreditCard className="h-4 w-4 mr-1" /> Add new payment method
                </button>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-2 text-left">Date</th>
                        <th className="py-2 px-2 text-left">Amount</th>
                        <th className="py-2 px-2 text-left">Status</th>
                        <th className="py-2 px-2 text-right">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-2">Jun 1, 2023</td>
                        <td className="py-3 px-2">$39.99</td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Paid
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button className="text-zenora-purple hover:underline">Download</button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2">May 1, 2023</td>
                        <td className="py-3 px-2">$39.99</td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Paid
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button className="text-zenora-purple hover:underline">Download</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case "appearance":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Appearance Settings</h2>
            
            <div className="zenora-card p-6">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Theme Preferences</h3>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    {darkMode ? (
                      <Moon className="h-5 w-5 mr-2 text-zenora-purple" />
                    ) : (
                      <Sun className="h-5 w-5 mr-2 text-zenora-purple" />
                    )}
                    <div>
                      <p className="font-medium">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
                      <p className="text-sm text-muted-foreground">
                        {darkMode ? 'Easier on the eyes at night' : 'Classic, clean interface'}
                      </p>
                    </div>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode} 
                    onCheckedChange={toggleDarkMode} 
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Dashboard Layout</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 hover:border-zenora-purple cursor-pointer">
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded mb-2 flex items-center justify-center">
                      <div className="text-xs text-muted-foreground">Grid Layout Preview</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border-2 border-zenora-purple bg-zenora-purple mr-2"></div>
                      <p className="font-medium">Grid Layout</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 hover:border-zenora-purple cursor-pointer">
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded mb-2 flex items-center justify-center">
                      <div className="text-xs text-muted-foreground">List Layout Preview</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600 mr-2"></div>
                      <p className="font-medium">List Layout</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-4">Accent Color</h3>
                
                <div className="grid grid-cols-5 gap-4">
                  {['#6D28D9', '#2563EB', '#059669', '#DC2626', '#D97706'].map((color, index) => (
                    <div 
                      key={index}
                      className={`h-12 rounded-md cursor-pointer ${index === 0 ? 'ring-2 ring-offset-2 ring-offset-background ring-zenora-purple' : ''}`}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <ZenoraButton>Save Appearance Settings</ZenoraButton>
              </div>
            </div>
          </div>
        );
      case "profile":
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
            
            <div className="zenora-card p-6">
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="h-24 w-24 rounded-full bg-zenora-gradient flex items-center justify-center text-white text-2xl font-bold">
                      JD
                    </div>
                    <button className="mt-2 text-sm text-zenora-purple hover:underline">
                      Change Photo
                    </button>
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium mb-1">First Name</label>
                        <input id="first-name" type="text" className="zenora-input" defaultValue="John" />
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium mb-1">Last Name</label>
                        <input id="last-name" type="text" className="zenora-input" defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                      <input id="email" type="email" className="zenora-input" defaultValue="john@example.com" />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                      <input id="phone" type="tel" className="zenora-input" defaultValue="(555) 123-4567" />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-1">Company Name</label>
                      <input id="company" type="text" className="zenora-input" defaultValue="Acme Properties" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Job Title</label>
                        <input id="title" type="text" className="zenora-input" defaultValue="Property Manager" />
                      </div>
                      <div>
                        <label htmlFor="company-website" className="block text-sm font-medium mb-1">Company Website</label>
                        <input id="company-website" type="url" className="zenora-input" defaultValue="https://example.com" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">Street Address</label>
                      <input id="address" type="text" className="zenora-input" defaultValue="123 Main St" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                        <input id="city" type="text" className="zenora-input" defaultValue="San Francisco" />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                        <input id="state" type="text" className="zenora-input" defaultValue="CA" />
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium mb-1">Zip Code</label>
                        <input id="zip" type="text" className="zenora-input" defaultValue="94105" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <ZenoraButton type="submit">Save Profile</ZenoraButton>
                </div>
              </form>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gradient-to-b from-white to-gray-50 dark:from-zenora-dark dark:to-black">
        <div className="zenora-container">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-zenora-gradient">
              Account Settings
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Manage your profile, security settings, and billing preferences.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <aside className="md:w-64 flex-shrink-0">
              <div className="zenora-card p-4 mb-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-zenora-gradient flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">Property Owner</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                      activeTab === "profile"
                        ? "bg-zenora-gradient text-white font-medium"
                        : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                    }`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span>Profile</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                      activeTab === "security"
                        ? "bg-zenora-gradient text-white font-medium"
                        : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                    }`}
                  >
                    <Lock className="mr-3 h-5 w-5" />
                    <span>Security</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                      activeTab === "notifications"
                        ? "bg-zenora-gradient text-white font-medium"
                        : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                    }`}
                  >
                    <Bell className="mr-3 h-5 w-5" />
                    <span>Notifications</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("billing")}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                      activeTab === "billing"
                        ? "bg-zenora-gradient text-white font-medium"
                        : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                    }`}
                  >
                    <CreditCard className="mr-3 h-5 w-5" />
                    <span>Billing</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab("appearance")}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                      activeTab === "appearance"
                        ? "bg-zenora-gradient text-white font-medium"
                        : "text-foreground hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
                    }`}
                  >
                    {darkMode ? (
                      <Moon className="mr-3 h-5 w-5" />
                    ) : (
                      <Sun className="mr-3 h-5 w-5" />
                    )}
                    <span>Appearance</span>
                  </button>
                </nav>
              </div>
              
              <div className="hidden md:block zenora-card p-4">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're having trouble with your account settings, our support team is here to help.
                </p>
                <Link to="/help">
                  <ZenoraButton variant="outline" size="sm" className="w-full">
                    Contact Support
                  </ZenoraButton>
                </Link>
              </div>
            </aside>
            
            <div className="flex-grow">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
