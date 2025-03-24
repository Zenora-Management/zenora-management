
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Wrench, MessageSquare, CalendarClock, CheckCircle, Smartphone, Bot } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              Maintenance Coordination
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Streamline property maintenance with our AI-powered coordination system that automates requests, scheduling, and follow-ups.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Effortless Maintenance Management</h2>
              <p className="text-muted-foreground mb-8">
                Our maintenance coordination platform simplifies the entire process from request submission to resolution tracking, saving you time and reducing headaches.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">24/7 Request Submission</h3>
                    <p className="text-muted-foreground">Tenants can submit maintenance requests anytime via app or web portal</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">AI Priority Assessment</h3>
                    <p className="text-muted-foreground">Smart algorithms automatically prioritize requests based on urgency and impact</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Vendor Management</h3>
                    <p className="text-muted-foreground">Easily manage your preferred vendors and track their performance</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Automated Communication</h3>
                    <p className="text-muted-foreground">Keep everyone informed with automated status updates and notifications</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <ZenoraButton size="lg">Schedule Demo</ZenoraButton>
                <ZenoraButton size="lg" variant="outline">Learn More</ZenoraButton>
              </div>
            </div>
            
            <div className="bg-zenora-gradient p-1 rounded-xl">
              <div className="bg-white dark:bg-zenora-dark rounded-lg p-6 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200" 
                  alt="Maintenance Dashboard" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md p-8 mb-20">
            <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="relative mb-8">
                  <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-zenora-purple" />
                  </div>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-zenora-purple text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Request Submission</h3>
                <p className="text-muted-foreground">
                  Tenants submit maintenance requests through the mobile app or web portal, including description and photos of the issue.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="relative mb-8">
                  <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center">
                    <Bot className="h-8 w-8 text-zenora-purple" />
                  </div>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-zenora-purple text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold mb-3">AI Processing</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes the request, categorizes it, assesses priority, and suggests the appropriate vendor for the job.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="relative mb-8">
                  <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center">
                    <CalendarClock className="h-8 w-8 text-zenora-purple" />
                  </div>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-zenora-purple text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Scheduling</h3>
                <p className="text-muted-foreground">
                  The system coordinates with vendors and tenants to find the optimal time for repairs, sending automatic confirmations.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="w-16 h-px bg-gray-300 dark:bg-gray-700"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="relative mb-8">
                  <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center">
                    <Wrench className="h-8 w-8 text-zenora-purple" />
                  </div>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-zenora-purple text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Work Execution</h3>
                <p className="text-muted-foreground">
                  Vendors complete the maintenance task, logging details and uploading before/after photos through our vendor portal.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="relative mb-8">
                  <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-zenora-purple" />
                  </div>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-zenora-purple text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Tenant Feedback</h3>
                <p className="text-muted-foreground">
                  Tenants rate their satisfaction with the repair, providing valuable feedback on vendor performance.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="relative mb-8">
                  <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-zenora-purple" />
                  </div>
                  <div className="absolute top-0 right-0 w-6 h-6 bg-zenora-purple text-white rounded-full flex items-center justify-center text-xs font-bold">6</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Record Keeping</h3>
                <p className="text-muted-foreground">
                  All maintenance history is securely stored and accessible for future reference, reporting, and analysis.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-zenora-gradient p-1 rounded-xl order-2 md:order-1">
              <div className="bg-white dark:bg-zenora-dark rounded-lg p-6 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?auto=format&fit=crop&q=80&w=1200" 
                  alt="Mobile Maintenance App" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Mobile-First Experience</h2>
              <p className="text-muted-foreground mb-8">
                Our user-friendly mobile app makes it easy for property owners, tenants, and vendors to stay connected and informed throughout the maintenance process.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">For Tenants</h3>
                    <p className="text-muted-foreground">Submit requests with photos, track progress, and communicate with vendors</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">For Property Owners</h3>
                    <p className="text-muted-foreground">Oversee all maintenance activities, approve work orders, and monitor costs</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">For Vendors</h3>
                    <p className="text-muted-foreground">Receive job details, update work status, and submit invoices electronically</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Maintenance Coordination Pricing</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
              Choose the plan that fits your property portfolio
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Essential</h3>
                  <p className="text-muted-foreground mb-4">For small portfolios</p>
                  <div className="text-3xl font-bold mb-6">$19<span className="text-muted-foreground text-base font-normal">/month</span></div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Up to 5 properties</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Basic maintenance tracking</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Tenant request portal</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Email notifications</span>
                    </li>
                  </ul>
                  
                  <ZenoraButton variant="outline" className="w-full">Select Plan</ZenoraButton>
                </div>
              </div>
              
              <div className="bg-zenora-gradient p-1 rounded-xl">
                <div className="bg-white dark:bg-zenora-dark rounded-lg h-full p-6">
                  <div className="bg-zenora-purple text-white text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mb-4">Most Popular</div>
                  <h3 className="text-xl font-bold mb-2">Professional</h3>
                  <p className="text-muted-foreground mb-4">For growing portfolios</p>
                  <div className="text-3xl font-bold mb-6">$49<span className="text-muted-foreground text-base font-normal">/month</span></div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Up to 20 properties</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>AI priority assessment</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Vendor management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Cost tracking & reporting</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Mobile app access</span>
                    </li>
                  </ul>
                  
                  <ZenoraButton className="w-full">Select Plan</ZenoraButton>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <p className="text-muted-foreground mb-4">For large portfolios</p>
                  <div className="text-3xl font-bold mb-6">$149<span className="text-muted-foreground text-base font-normal">/month</span></div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Unlimited properties</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>All Professional features</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Preventive maintenance planning</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Advanced analytics & insights</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>API access for integration</span>
                    </li>
                  </ul>
                  
                  <ZenoraButton variant="outline" className="w-full">Contact Sales</ZenoraButton>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zenora-gradient p-1 rounded-xl">
            <div className="bg-white dark:bg-zenora-dark rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to streamline your maintenance process?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Start using our AI-powered maintenance coordination system today and reduce your management workload.
              </p>
              <ZenoraButton size="lg">
                Get Started Today
              </ZenoraButton>
              <p className="text-sm text-muted-foreground mt-4">14-day free trial available on all plans.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Maintenance;
