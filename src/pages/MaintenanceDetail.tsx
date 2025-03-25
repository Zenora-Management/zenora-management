
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Check, Calendar, ChevronRight, Wrench, AlertTriangle, Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const MaintenanceDetail = () => {
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
                  <span className="font-medium">Property Care</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Maintenance Coordination
                </h1>
                <p className="text-lg mb-8 text-white/80">
                  We handle all aspects of property maintenance so you don't have to. From routine upkeep to emergency repairs, our AI-powered system ensures your property stays in excellent condition.
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
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800&h=500" 
                    alt="Maintenance Services" 
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
                <span className="font-medium">Comprehensive Solutions</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Complete Maintenance Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide end-to-end maintenance solutions to keep your properties in excellent condition.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Routine Maintenance</h3>
                <p className="text-muted-foreground mb-4">
                  Scheduled preventative maintenance to keep your property in top condition and prevent costly repairs.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Seasonal inspections</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>HVAC system maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Preventative upkeep</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Emergency Repairs</h3>
                <p className="text-muted-foreground mb-4">
                  24/7 emergency response for urgent issues that require immediate attention.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>24/7 emergency hotline</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Rapid response team</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Water, electrical, HVAC emergencies</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Tenant Requests</h3>
                <p className="text-muted-foreground mb-4">
                  Streamlined system for handling tenant maintenance requests quickly and efficiently.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Online request portal</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Request tracking system</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Communication updates</span>
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
                How Our Maintenance Coordination Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process ensures quick resolution of maintenance issues.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Request</h3>
                <p className="text-muted-foreground">
                  Maintenance requests are submitted through our online portal or by phone for urgent matters.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Assessment</h3>
                <p className="text-muted-foreground">
                  Our team assesses the request, prioritizes based on urgency, and assigns the appropriate technician.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Resolution</h3>
                <p className="text-muted-foreground">
                  Our qualified technicians promptly address and resolve the maintenance issue.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Follow-up</h3>
                <p className="text-muted-foreground">
                  We follow up to ensure satisfaction and document all work completed for your records.
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
                Benefits of Our Maintenance Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our maintenance coordination services save you time, money, and stress.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <Clock className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Time Savings</h3>
                  <p className="text-muted-foreground">
                    We handle all aspects of maintenance coordination, saving you countless hours of vendor management and issue resolution.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <Wrench className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Qualified Professionals</h3>
                  <p className="text-muted-foreground">
                    Access to our network of vetted, licensed contractors and technicians who provide high-quality work.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Preventative Maintenance</h3>
                  <p className="text-muted-foreground">
                    Regular inspections and maintenance prevent small issues from becoming costly problems, extending the life of your property.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-zenora-purple/10 rounded-lg">
                  <Phone className="h-6 w-6 text-zenora-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">
                    Around-the-clock emergency support ensures issues are addressed promptly, minimizing damage and tenant dissatisfaction.
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
                Ready for Hassle-Free Property Maintenance?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Let us handle the maintenance so you can focus on what matters. Schedule a consultation today to learn more about our services.
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

export default MaintenanceDetail;
