
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AlertTriangle, Check, Crown, Database, FileText, ShieldCheck, Zap } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              Features
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover how Zenora Management's AI-powered platform transforms property management with innovative features designed for efficiency and simplicity.
            </p>
          </div>
          
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Rent Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Get accurate rental estimates for your properties using our advanced AI technology that analyzes market trends and comparable properties.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Real-time market comparisons</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Detailed property insights</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Downloadable reports</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Property Management</h3>
                <p className="text-muted-foreground mb-4">
                  Manage all your properties in one place with our comprehensive dashboard that provides easy access to critical information.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Centralized property dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Financial tracking & reporting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Maintenance request handling</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Administration</h3>
                <p className="text-muted-foreground mb-4">
                  Robust admin controls ensure your property data is secure while providing powerful management tools.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Role-based access control</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Audit logs & activity tracking</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Data encryption & protection</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Feature Card 4 */}
            <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Crown className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Reports</h3>
                <p className="text-muted-foreground mb-4">
                  Access detailed property analysis and performance reports to make data-driven decisions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Comprehensive market analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>ROI & performance metrics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Investment opportunity insights</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Feature Card 5 */}
            <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Document Understanding and Storage</h3>
                <p className="text-muted-foreground mb-4">
                  Effortlessly handle, organize, and access all your property documents in one secure, centralized location.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Document upload and management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Centralized property information storage</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Secure file access and retrieval</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Feature Card 6 */}
            <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Alerts</h3>
                <p className="text-muted-foreground mb-4">
                  Stay informed with automated notifications about important property events and market changes.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Maintenance reminders</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Lease expiration alerts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Market change notifications</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Feature Card 7 */}
            <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="w-12 h-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Seamless Integration</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with other tools and services seamlessly for a complete property management ecosystem.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Accounting software integration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Payment processing</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Document management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to transform your property management?</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup">
                <ZenoraButton variant="default" size="lg">
                  Get Started
                </ZenoraButton>
              </Link>
              <Link to="/contact">
                <ZenoraButton variant="outline" size="lg">
                  Contact Sales
                </ZenoraButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Features;
