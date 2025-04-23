
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Check, Calendar, ChevronRight, FileText, Upload, Database, Lock } from "lucide-react";
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
                  <span className="font-medium">Smart Document Solution</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Document Understanding & Storage
                </h1>
                <p className="text-lg mb-8 text-white/80">
                  Effortlessly handle, organize, and access all your property documents in one secure, centralized location. Powered by Zenora Management's AI Comprehensive Reader, our system not only stores your documents but also understands and extracts key insights.
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
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=500" 
                    alt="Document Management" 
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
                <span className="font-medium">Smart Document Solutions</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Key Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our document management system helps you stay organized, compliant, and efficient.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Document Upload and Management</h3>
                <p className="text-muted-foreground mb-4">
                  Easily upload and manage all your property-related documents from one intuitive dashboard.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Upload leases and agreements</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Store financial reports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Manage property documentation</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Centralized Information Storage</h3>
                <p className="text-muted-foreground mb-4">
                  Keep all important property-related documents securely in one place for easy access.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Organized file structure</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Property-based categorization</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Smart tagging and labeling</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Comprehensive Reader</h3>
                <p className="text-muted-foreground mb-4">
                  Let our AI analyze your documents to provide insights and save you time.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Automatic document analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Key information extraction</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Important date reminders</span>
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
                How Our Document Management Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process makes document management effortless and insightful.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Upload</h3>
                <p className="text-muted-foreground">
                  Easily upload your documents through our secure, intuitive interface from any device.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI reads and analyzes your documents, extracting key information and insights automatically.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Organization</h3>
                <p className="text-muted-foreground">
                  Documents are automatically categorized, tagged, and stored in our secure cloud system.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Access</h3>
                <p className="text-muted-foreground">
                  Easily retrieve, share, and review your documents from anywhere, anytime through our secure platform.
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
                Benefits of Our Document Management
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our advanced system helps reduce paperwork and provides valuable insights for property management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <Lock className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Enhanced Security</h3>
                  <p className="text-muted-foreground">
                    Keep your sensitive property documents secure with enterprise-grade encryption and controlled access permissions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <FileText className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Smart Insights</h3>
                  <p className="text-muted-foreground">
                    Our AI doesn't just store your documents—it reads them, providing summaries, extracting key dates, and flagging important items.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <Database className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Centralized Repository</h3>
                  <p className="text-muted-foreground">
                    Eliminate file searching across multiple locations with our centralized storage that's accessible from anywhere.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <Upload className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Easy Integration</h3>
                  <p className="text-muted-foreground">
                    Seamlessly connects with your existing property management workflows and other Zenora Management services.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="mt-12 bg-gray-50 dark:bg-zenora-dark/30 rounded-xl p-8">
              <blockquote className="text-lg italic text-center">
                "Zenora's document management has streamlined how I handle my rental paperwork — no more lost files or missed details. The AI insights have saved me hours of reading through lengthy contracts."
              </blockquote>
              <div className="mt-4 text-center">
                <p className="font-medium">— Sarah Johnson, Property Owner</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-zenora-gradient text-white">
          <div className="zenora-container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Streamline Your Document Management?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Our document management system helps you organize, access, and gain insights from all your property documentation. Schedule a consultation today to learn more.
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
