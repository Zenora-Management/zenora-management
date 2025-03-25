
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Check, Calendar, ChevronRight, Shield, Search, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const TenantScreeningDetail = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-zenora-dark to-zenora-purple py-16 text-white">
          <div className="absolute inset-0 bg-grid-white/[0.03]" />
          <div className="zenora-container relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="inline-flex items-center rounded-full border border-zenora-light/30 bg-zenora-light/5 px-3 py-1 text-sm backdrop-blur-sm mb-6">
                  <span className="font-medium">Reliable Screening</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Comprehensive Tenant Screening
                </h1>
                <p className="text-lg mb-8 text-white/80">
                  Our advanced tenant screening service helps you find reliable, responsible tenants while minimizing risk. We use AI-enhanced background checks to ensure thorough vetting.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact?subject=demo">
                    <ZenoraButton variant="inverted" size="lg">
                      Request a Demo
                    </ZenoraButton>
                  </Link>
                  <Link to="/contact">
                    <ZenoraButton variant="outline" className="text-white border-white">
                      Talk to an Expert
                    </ZenoraButton>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&q=80&w=800&h=500" 
                    alt="Tenant Screening" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="py-16 bg-white dark:bg-zenora-dark">
          <div className="zenora-container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
                <span className="font-medium">Comprehensive Screening</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Our Tenant Screening Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our thorough screening process helps you find reliable tenants while complying with fair housing laws.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Background Checks</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive background checks to verify tenant history and identify potential risks.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Criminal history check</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Eviction history search</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Sex offender registry check</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Credit Verification</h3>
                <p className="text-muted-foreground mb-4">
                  Detailed credit reports to assess financial responsibility and payment history.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Credit score analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Payment history review</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Debt-to-income assessment</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Rental History</h3>
                <p className="text-muted-foreground mb-4">
                  Verification of previous rental experiences to ensure reliability and responsibility.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Previous landlord verification</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>On-time payment history</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Property care assessment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Process */}
        <section className="py-16 bg-gray-50 dark:bg-zenora-dark/70">
          <div className="zenora-container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
                <span className="font-medium">Our Process</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                How Our Tenant Screening Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process delivers thorough screenings with quick turnaround times.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Application</h3>
                <p className="text-muted-foreground">
                  Prospective tenants complete our comprehensive online application, providing necessary information for screening.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Verification</h3>
                <p className="text-muted-foreground">
                  Our team verifies employment, income, and contacts previous landlords to confirm rental history.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Background Check</h3>
                <p className="text-muted-foreground">
                  We conduct comprehensive background and credit checks using our advanced screening tools.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Recommendation</h3>
                <p className="text-muted-foreground">
                  You receive a detailed report with our recommendation, helping you make an informed decision.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-white dark:bg-zenora-dark">
          <div className="zenora-container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
                <span className="font-medium">Why Choose Us</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Benefits of Our Tenant Screening Service
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our advanced screening helps reduce risk and find reliable tenants for your properties.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <Shield className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Reduced Risk</h3>
                  <p className="text-muted-foreground">
                    Minimize the risk of problematic tenants with thorough background checks that identify potential red flags before signing a lease.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <Clock className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Time Savings</h3>
                  <p className="text-muted-foreground">
                    Save hours of manual verification work with our streamlined screening process that delivers results within 24-48 hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <FileText className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Legal Compliance</h3>
                  <p className="text-muted-foreground">
                    Our screening process complies with all fair housing laws and regulations, helping you avoid potential legal issues.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <Search className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Thorough Verification</h3>
                  <p className="text-muted-foreground">
                    Get comprehensive insights into prospective tenants with our multi-layered verification process that goes beyond basic checks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-zenora-gradient text-white">
          <div className="zenora-container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Find Better Tenants?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Our tenant screening service helps you find reliable, responsible tenants while reducing risk. Schedule a consultation today to learn more.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact?subject=demo">
                  <ZenoraButton variant="inverted" size="lg">
                    <Calendar className="mr-2 h-4 w-4" /> Schedule a Demo
                  </ZenoraButton>
                </Link>
                <Link to="/contact">
                  <ZenoraButton variant="glass" size="lg">
                    Contact Us <ChevronRight className="ml-2 h-4 w-4" />
                  </ZenoraButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TenantScreeningDetail;
