
import { Link } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";

const About = () => {
  return (
    <section className="zenora-section bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-zenora-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-zenora-light opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-zenora-purple opacity-5 blur-3xl rounded-full"></div>
      
      <div className="zenora-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-slide-in">
            <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
              <span className="font-medium">Our Mission</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              Simplifying Property Management Through Innovation
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              At Zenora Management, we're revolutionizing property management by offering the cheapest, simplest, and most efficient AI-driven solutions—ensuring 24/7 client satisfaction through automation and smart technology.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Cost-effective property management solutions",
                "24/7 automated support and monitoring",
                "AI-powered rent analysis and market insights",
                "Seamless user experience for property owners"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-zenora-purple/20 flex items-center justify-center mt-0.5">
                    <svg className="h-3.5 w-3.5 text-zenora-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-foreground">{item}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about">
                <ZenoraButton size="lg" variant="default">
                  Learn More About Us
                </ZenoraButton>
              </Link>
              <Link to="/contact">
                <ZenoraButton size="lg" variant="outline">
                  Contact Our Team
                </ZenoraButton>
              </Link>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden h-[500px] shadow-2xl border border-white/10">
              <div className="absolute inset-0 bg-zenora-gradient opacity-10"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                  <p className="text-muted-foreground">
                    Becoming the leading AI-powered property management firm that delivers cost-effective, hassle-free, and intelligent solutions.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/5">
                    <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-zenora-gradient">24/7</div>
                    <p className="text-sm text-muted-foreground">Client support through AI automation</p>
                  </div>
                  <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/5">
                    <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-zenora-gradient">98%</div>
                    <p className="text-sm text-muted-foreground">Client satisfaction rate</p>
                  </div>
                </div>
                
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/5 mb-6">
                  <h4 className="font-semibold mb-2">Our Technology</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    We leverage advanced AI algorithms to analyze vast amounts of property data, enabling our clients to make smarter decisions and maximize returns.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["AI", "Machine Learning", "Data Analytics"].map((tech, i) => (
                      <div key={i} className="px-2 py-1 bg-zenora-purple/20 rounded-full text-xs text-zenora-purple">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                
                <blockquote className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/5 flex-grow">
                  <p className="text-sm italic text-muted-foreground mb-4">
                    "Zenora Management has completely transformed how I manage my rental properties. The AI rent analysis has helped me price my units optimally, increasing my revenue by 15%."
                  </p>
                  <footer className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zenora-gradient flex items-center justify-center text-white font-bold text-xs">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-medium">Jane Doe</p>
                      <p className="text-xs text-muted-foreground">Property Owner, 12 Units</p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
