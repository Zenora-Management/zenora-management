
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Link } from "react-router-dom";
import { Check, Settings, Clock, LineChart, Shield, Users } from "lucide-react";

const PropertyManagement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              Property Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience effortless property management with our AI-powered platform designed to maximize your rental income and minimize your workload.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Comprehensive Management Solutions</h2>
              <p className="text-muted-foreground mb-6">
                Zenora Management combines cutting-edge AI technology with industry expertise to deliver a complete property management experience that maximizes your rental income while minimizing your workload.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Tenant Screening & Selection</h3>
                    <p className="text-muted-foreground">AI-powered screening process to find reliable, high-quality tenants.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Rent Collection & Financial Management</h3>
                    <p className="text-muted-foreground">Automated rent collection and comprehensive financial reporting.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Property Maintenance</h3>
                    <p className="text-muted-foreground">Proactive maintenance management to protect your investment.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Legal Compliance</h3>
                    <p className="text-muted-foreground">Stay compliant with all local, state, and federal housing regulations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 bg-zenora-gradient p-1 rounded-xl">
              <div className="bg-white dark:bg-zenora-dark h-full rounded-lg p-6">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80" 
                  alt="Property management" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Why Property Owners Choose Zenora</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>30% increase in rental income on average</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>75% reduction in property management workload</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>90% fewer tenant complaints and issues</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>24/7 property monitoring and support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10">Our Management Process</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden p-6 text-center">
                <div className="w-16 h-16 bg-zenora-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Setup & Onboarding</h3>
                <p className="text-muted-foreground">
                  We conduct a thorough property assessment, establish your management goals, and create a customized plan tailored to your property's unique needs.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden p-6 text-center">
                <div className="w-16 h-16 bg-zenora-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Active Management</h3>
                <p className="text-muted-foreground">
                  Our AI-powered system actively manages your property, handling tenant relations, maintenance, rent collection, and day-to-day operations.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden p-6 text-center">
                <div className="w-16 h-16 bg-zenora-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LineChart className="h-8 w-8 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Optimization & Growth</h3>
                <p className="text-muted-foreground">
                  We continuously analyze performance data to optimize your property's profitability and implement strategies to increase your rental income.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-zenora-gradient p-1 rounded-xl">
              <div className="bg-white dark:bg-zenora-dark h-full rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Property Owner Benefits</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-zenora-purple/10 rounded-lg">
                      <Shield className="h-5 w-5 text-zenora-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Protection & Security</h4>
                      <p className="text-muted-foreground">Comprehensive protection for your property investment with regular inspections and maintenance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-zenora-purple/10 rounded-lg">
                      <LineChart className="h-5 w-5 text-zenora-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Maximized ROI</h4>
                      <p className="text-muted-foreground">Our AI-driven pricing strategies ensure you're always getting optimal rental income from your property.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-zenora-purple/10 rounded-lg">
                      <Clock className="h-5 w-5 text-zenora-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Time Freedom</h4>
                      <p className="text-muted-foreground">Reclaim your time while we handle all aspects of property management with precision and care.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Pricing Plans</h2>
              <p className="text-muted-foreground mb-6">
                Zenora offers transparent, flexible pricing plans designed to meet the needs of all property owners, from single-unit landlords to large portfolio investors.
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-1">Essential Plan</h3>
                  <p className="text-muted-foreground mb-2">Perfect for single property owners</p>
                  <p className="font-semibold text-zenora-purple mb-3">8% of monthly rent</p>
                  <Link to="/contact">
                    <ZenoraButton variant="outline" size="sm" className="w-full">
                      Get Started
                    </ZenoraButton>
                  </Link>
                </div>
                
                <div className="border-2 border-zenora-purple rounded-lg p-4 relative">
                  <div className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-zenora-purple">
                    Most Popular
                  </div>
                  <h3 className="text-lg font-bold mb-1">Professional Plan</h3>
                  <p className="text-muted-foreground mb-2">Ideal for 2-10 properties</p>
                  <p className="font-semibold text-zenora-purple mb-3">7% of monthly rent</p>
                  <Link to="/contact">
                    <ZenoraButton variant="default" size="sm" className="w-full">
                      Get Started
                    </ZenoraButton>
                  </Link>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-1">Enterprise Plan</h3>
                  <p className="text-muted-foreground mb-2">For portfolio investors (10+ properties)</p>
                  <p className="font-semibold text-zenora-purple mb-3">Custom Pricing</p>
                  <Link to="/contact">
                    <ZenoraButton variant="outline" size="sm" className="w-full">
                      Contact Us
                    </ZenoraButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zenora-gradient p-1 rounded-xl">
            <div className="bg-white dark:bg-zenora-dark rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to transform your property management experience?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join thousands of property owners who have switched to Zenora's AI-powered management platform and discovered a better way to manage their investments.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/signup">
                  <ZenoraButton variant="default" size="lg">
                    Start Free Trial
                  </ZenoraButton>
                </Link>
                <Link to="/contact">
                  <ZenoraButton variant="outline" size="lg">
                    Book a Consultation
                  </ZenoraButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyManagement;
