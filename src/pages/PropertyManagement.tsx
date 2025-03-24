
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Link } from "react-router-dom";
import { Check, Settings, Clock, LineChart, Shield, Users, Star, Gift, ArrowRight, RefreshCw } from "lucide-react";
import { useState } from "react";

const PropertyManagement = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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
          
          {/* Our Approach Section - Replacing "Our Vision" section */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Our Approach</h2>
              <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                Leveraging technology and expertise to deliver exceptional property management experiences
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zenora-dark/50 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 text-center">
                <div className="w-20 h-20 bg-zenora-gradient rounded-full flex items-center justify-center mx-auto mb-5">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Trust & Transparency</h3>
                <p className="text-muted-foreground">
                  We build lasting relationships through complete transparency in all our operations and communications.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 text-center">
                <div className="w-20 h-20 bg-zenora-gradient rounded-full flex items-center justify-center mx-auto mb-5">
                  <LineChart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Data-Driven Decisions</h3>
                <p className="text-muted-foreground">
                  We harness AI and market analytics to make informed decisions that maximize your property's performance.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 text-center">
                <div className="w-20 h-20 bg-zenora-gradient rounded-full flex items-center justify-center mx-auto mb-5">
                  <Clock className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Proactive Management</h3>
                <p className="text-muted-foreground">
                  We anticipate issues before they arise, ensuring smooth operations and minimizing unexpected costs.
                </p>
              </div>
            </div>
          </div>
          
          {/* Pricing section with updated centering */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10">Pricing Plans</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
              Choose the perfect plan for your property management needs with transparent, all-inclusive pricing.
            </p>
            
            <div className="flex flex-col items-center gap-8 max-w-md mx-auto">
              <div className="relative group w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white dark:bg-zenora-dark rounded-xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Client Plan</h3>
                      <p className="text-muted-foreground">For single property owners</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full">
                      <Star className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-extrabold">$1,999</span>
                    <span className="text-muted-foreground">/year</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>All Zenora management features included</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>AI rent analysis included</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tenant screening included</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Maintenance coordination</span>
                    </li>
                  </ul>
                  
                  <Link to={`/contact?plan=client`}>
                    <ZenoraButton
                      variant="default"
                      size="lg"
                      className="w-full group-hover:shadow-lg transition-all duration-300"
                    >
                      Choose <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </ZenoraButton>
                  </Link>
                </div>
              </div>
              
              <div className="relative group w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white dark:bg-zenora-dark rounded-xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-500 to-pink-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                    SAVE $500
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <div>
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-500">Referral Discount</h3>
                      <p className="text-muted-foreground">For referred clients</p>
                    </div>
                    <div className="bg-gradient-to-r from-amber-500 to-pink-500 text-white p-2 rounded-full">
                      <Gift className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="mb-4 flex items-end">
                    <span className="text-3xl font-extrabold">$1,499</span>
                    <span className="text-muted-foreground">/year</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">$1,999</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>$500 off yearly base price</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>All Client Plan features included</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Must be referred by existing client</span>
                    </li>
                  </ul>
                  
                  <Link to={`/contact?plan=referral`}>
                    <ZenoraButton
                      variant="default"
                      size="lg"
                      className="w-full group-hover:shadow-lg transition-all duration-300"
                    >
                      Choose <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </ZenoraButton>
                  </Link>
                </div>
              </div>
              
              <div className="relative group w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white dark:bg-zenora-dark rounded-xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="absolute -top-3 left-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                    SAVE $500
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <div>
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">Transfer Discount</h3>
                      <p className="text-muted-foreground">For clients switching to Zenora</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-2 rounded-full">
                      <RefreshCw className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="mb-4 flex items-end">
                    <span className="text-3xl font-extrabold">$1,499</span>
                    <span className="text-muted-foreground">/year</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">$1,999</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>$500 off yearly for transfers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>All Client Plan features included</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Free property transition assistance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Coming from another management company</span>
                    </li>
                  </ul>
                  
                  <Link to={`/contact?plan=transfer`}>
                    <ZenoraButton
                      variant="default"
                      size="lg"
                      className="w-full group-hover:shadow-lg transition-all duration-300"
                    >
                      Choose <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </ZenoraButton>
                  </Link>
                </div>
              </div>
              
              <div className="relative group w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-600 to-gray-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white dark:bg-zenora-dark rounded-xl p-6 shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Enterprise Plan</h3>
                      <p className="text-muted-foreground">For portfolio investors (10+ properties)</p>
                    </div>
                    <div className="bg-gradient-to-r from-slate-600 to-gray-600 text-white p-2 rounded-full">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-xl font-semibold">Custom Pricing</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Unlimited properties</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Advanced portfolio analytics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Custom reporting and API access</span>
                    </li>
                  </ul>
                  
                  <Link to={`/contact?plan=enterprise`}>
                    <ZenoraButton
                      variant="default"
                      size="lg"
                      className="w-full group-hover:shadow-lg transition-all duration-300"
                    >
                      Choose <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
