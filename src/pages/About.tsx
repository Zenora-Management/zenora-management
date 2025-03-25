
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Zap, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="zenora-section bg-white dark:bg-zenora-dark relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-zenora-light opacity-5 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-zenora-purple opacity-5 blur-3xl rounded-full"></div>
          
          <div className="zenora-container relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
                <span className="font-medium">About Zenora</span>
              </div>
              
              <h1 className="zenora-heading bg-clip-text text-transparent bg-zenora-gradient mb-6">
                Transforming Property Management with AI
              </h1>
              
              <p className="zenora-subheading mb-8">
                We're on a mission to revolutionize property management by combining human expertise with artificial intelligence, creating seamless experiences for property owners and tenants.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <ZenoraButton size="lg">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </ZenoraButton>
                </Link>
                <Link to="/property-management/details">
                  <ZenoraButton variant="outline" size="lg">
                    Learn About Our Services
                  </ZenoraButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="zenora-section bg-gray-50 dark:bg-zenora-dark/50">
          <div className="zenora-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-slide-in">
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                  Becoming the leading AI-powered property management firm that delivers cost-effective, hassle-free, and intelligent solutions. We aim to transform the traditional property management industry by leveraging cutting-edge technology while maintaining a personal touch.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-zenora-dark p-6 rounded-xl shadow-sm">
                    <div className="text-4xl font-bold text-zenora-purple mb-2">24/7</div>
                    <p className="text-muted-foreground">Client support through AI automation</p>
                  </div>
                  <div className="bg-white dark:bg-zenora-dark p-6 rounded-xl shadow-sm">
                    <div className="text-4xl font-bold text-zenora-purple mb-2">98%</div>
                    <p className="text-muted-foreground">Client satisfaction rate</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark p-8 rounded-xl shadow-md animate-slide-up">
                <h3 className="text-2xl font-bold mb-6">Our Technology</h3>
                <p className="text-muted-foreground mb-8">
                  We leverage advanced AI algorithms to analyze vast amounts of property data, enabling our clients to make smarter decisions and maximize returns.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-zenora-purple/10 rounded-lg text-zenora-purple">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">AI-powered Analysis</p>
                      <p className="text-sm text-muted-foreground">
                        Market-driven rent recommendations backed by data
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-zenora-purple/10 rounded-lg text-zenora-purple">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Smart Tenant Matching</p>
                      <p className="text-sm text-muted-foreground">
                        Finding quality tenants with comprehensive screening
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-zenora-purple/10 rounded-lg text-zenora-purple">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Maintenance Automation</p>
                      <p className="text-sm text-muted-foreground">
                        Proactive maintenance management and vendor coordination
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="zenora-section bg-white dark:bg-zenora-dark">
          <div className="zenora-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
                <span className="font-medium">Our Leadership</span>
              </div>
              
              <h2 className="zenora-heading">Meet Our Team</h2>
              
              <p className="zenora-subheading">
                A dedicated group of professionals with decades of combined experience in property management and technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="zenora-card p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://placehold.co/200x200/9B77D7/FFFFFF?text=CEO" 
                    alt="CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">John Doe</h3>
                <p className="text-zenora-purple mb-3">CEO & Founder</p>
                <p className="text-sm text-muted-foreground">
                  20+ years of experience in property management and real estate investment.
                </p>
              </div>
              
              <div className="zenora-card p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://placehold.co/200x200/9B77D7/FFFFFF?text=CTO" 
                    alt="CTO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Jane Smith</h3>
                <p className="text-zenora-purple mb-3">CTO</p>
                <p className="text-sm text-muted-foreground">
                  Leading our technology division with expertise in AI and machine learning.
                </p>
              </div>
              
              <div className="zenora-card p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://placehold.co/200x200/9B77D7/FFFFFF?text=COO" 
                    alt="COO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Michael Johnson</h3>
                <p className="text-zenora-purple mb-3">COO</p>
                <p className="text-sm text-muted-foreground">
                  Streamlining operations and ensuring excellent service delivery.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/contact">
                <ZenoraButton size="lg">
                  Contact Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </ZenoraButton>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
