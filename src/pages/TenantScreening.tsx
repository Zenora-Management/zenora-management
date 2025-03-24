
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { CheckCircle, Shield, UserCheck, FileText, Clock } from "lucide-react";

const TenantScreening = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              AI-Powered Tenant Screening
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Make confident leasing decisions with our comprehensive, fast, and fair AI-powered tenant screening service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Find the Perfect Tenants</h2>
              <p className="text-muted-foreground mb-8">
                Our advanced screening technology goes beyond credit scores to help you find reliable, responsible tenants while reducing risk and maintaining compliance with fair housing laws.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Comprehensive Background Checks</h3>
                    <p className="text-muted-foreground">Credit history, criminal background, eviction history, and more</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Income Verification</h3>
                    <p className="text-muted-foreground">Automated income and employment verification</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Rental History Analysis</h3>
                    <p className="text-muted-foreground">Insights into past rental behavior and landlord references</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Fair Housing Compliance</h3>
                    <p className="text-muted-foreground">AI-driven screening that helps eliminate bias</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <ZenoraButton size="lg">Screen a Tenant</ZenoraButton>
                <ZenoraButton size="lg" variant="outline">Learn More</ZenoraButton>
              </div>
            </div>
            
            <div className="order-1 md:order-2 bg-zenora-gradient p-1 rounded-xl">
              <div className="bg-white dark:bg-zenora-dark rounded-lg p-6 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Tenant Screening Dashboard" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md p-8 mb-20">
            <h2 className="text-2xl font-bold text-center mb-10">The Zenora Screening Advantage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Get comprehensive screening reports in minutes, not days. Our AI technology accelerates the process without sacrificing thoroughness.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Highly Secure</h3>
                <p className="text-muted-foreground">
                  Bank-level encryption and strict data protection protocols ensure all applicant information remains secure and confidential.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fair & Compliant</h3>
                <p className="text-muted-foreground">
                  Our AI is designed to help eliminate bias and ensure compliance with fair housing laws while providing accurate assessments.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-zenora-gradient p-1 rounded-xl">
              <div className="bg-white dark:bg-zenora-dark rounded-lg p-6 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=1200" 
                  alt="Tenant Score Report" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Clear, Actionable Reports</h2>
              <p className="text-muted-foreground mb-8">
                Our screening reports provide clear, easy-to-understand insights and recommendations to help you make informed decisions quickly.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <FileText className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Zenora Tenant Score™</h3>
                    <p className="text-muted-foreground">A proprietary scoring system that evaluates overall tenant quality</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileText className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Risk Assessment</h3>
                    <p className="text-muted-foreground">Clear indicators of potential concerns and risk factors</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileText className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Custom Recommendations</h3>
                    <p className="text-muted-foreground">Tailored suggestions based on your specific property criteria</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileText className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Supporting Documentation</h3>
                    <p className="text-muted-foreground">Detailed records to support your decision-making process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Screening Packages</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
              Choose the screening package that best meets your needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Basic</h3>
                  <p className="text-muted-foreground mb-4">Essential verification</p>
                  <div className="text-3xl font-bold mb-6">$29<span className="text-muted-foreground text-base font-normal">/screening</span></div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Credit check</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Eviction history</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Identity verification</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Basic Zenora Score</span>
                    </li>
                  </ul>
                  
                  <ZenoraButton variant="outline" className="w-full">Select Package</ZenoraButton>
                </div>
              </div>
              
              <div className="bg-zenora-gradient p-1 rounded-xl">
                <div className="bg-white dark:bg-zenora-dark rounded-lg h-full p-6">
                  <div className="bg-zenora-purple text-white text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mb-4">Most Popular</div>
                  <h3 className="text-xl font-bold mb-2">Standard</h3>
                  <p className="text-muted-foreground mb-4">Comprehensive verification</p>
                  <div className="text-3xl font-bold mb-6">$49<span className="text-muted-foreground text-base font-normal">/screening</span></div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>All Basic features</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Criminal background check</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Income verification</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Employment verification</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Advanced Zenora Score</span>
                    </li>
                  </ul>
                  
                  <ZenoraButton className="w-full">Select Package</ZenoraButton>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Premium</h3>
                  <p className="text-muted-foreground mb-4">Complete protection</p>
                  <div className="text-3xl font-bold mb-6">$79<span className="text-muted-foreground text-base font-normal">/screening</span></div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>All Standard features</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Rental history verification</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Previous landlord references</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Social media screening</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Premium Zenora Score with AI insights</span>
                    </li>
                  </ul>
                  
                  <ZenoraButton variant="outline" className="w-full">Select Package</ZenoraButton>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zenora-gradient p-1 rounded-xl">
            <div className="bg-white dark:bg-zenora-dark rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to find your ideal tenants?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Start using our AI-powered tenant screening today and make confident leasing decisions.
              </p>
              <ZenoraButton size="lg">
                Start Screening Now
              </ZenoraButton>
              <p className="text-sm text-muted-foreground mt-4">Volume discounts available for property managers.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TenantScreening;
