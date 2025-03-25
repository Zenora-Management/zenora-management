
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="zenora-section bg-white dark:bg-zenora-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-zenora-light opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-zenora-purple opacity-5 blur-3xl rounded-full"></div>
      
      <div className="zenora-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
            <span className="font-medium">Our Story</span>
          </div>
          
          <h2 className="zenora-heading bg-clip-text text-transparent bg-zenora-gradient">
            About Zenora Property Management
          </h2>
          
          <p className="zenora-subheading">
            We're revolutionizing property management with AI-powered solutions that make managing properties simpler, more efficient, and more profitable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-slide-in">
            <div className="zenora-card p-6 lg:p-8">
              <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  At Zenora, we envision a future where property management is streamlined, transparent, and accessible to all. We believe that by leveraging the power of artificial intelligence and automation, we can transform the traditional property management model into something more efficient, cost-effective, and responsive to the needs of both property owners and tenants.
                </p>
                <p>
                  Our mission is to empower property owners with innovative tools and services that simplify the management process, maximize rental income, and provide peace of mind. We're committed to delivering exceptional value through our comprehensive suite of AI-driven solutions, backed by our team's expertise and dedication to customer service.
                </p>
                <p>
                  We're not just another property management company. We're pioneering a new approach that combines cutting-edge technology with human insight to create a better experience for everyone involved in the rental ecosystem.
                </p>
              </div>
              
              <div className="mt-8">
                <Link to="/contact">
                  <ZenoraButton variant="default">
                    Contact Us
                  </ZenoraButton>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-up">
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm p-6 lg:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-zenora-purple/20 to-transparent opacity-20"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Our Founders</h3>
                
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 rounded-full bg-zenora-gradient flex items-center justify-center text-white text-2xl font-bold">
                      AP
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">Ansh Parikh</h4>
                      <p className="text-zenora-purple mb-3">CEO & Founder</p>
                      <p className="text-muted-foreground">
                        Ansh brings extensive experience in real estate and property management, with a vision to transform the industry through innovative technology solutions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 rounded-full bg-zenora-gradient flex items-center justify-center text-white text-2xl font-bold">
                      AV
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">Anvith Vobbilisetty</h4>
                      <p className="text-zenora-purple mb-3">CTO & Founder</p>
                      <p className="text-muted-foreground">
                        Anvith leads our technical innovation, bringing expertise in AI and software development to create cutting-edge solutions for property management challenges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: "5+", label: "Years Experience" },
            { number: "1,000+", label: "Happy Clients" },
            { number: "3,500+", label: "Properties Managed" },
            { number: "99%", label: "Client Satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="zenora-card p-6 text-center animate-scale-in">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-zenora-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
