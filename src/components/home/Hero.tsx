
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 lg:pb-32 min-h-screen flex items-center">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-zenora-dark dark:to-black z-0"></div>
      <div className="absolute top-24 right-0 w-3/4 h-3/4 bg-zenora-gradient opacity-5 blur-3xl rounded-full z-0"></div>
      <div className="absolute bottom-0 left-0 w-2/3 h-1/3 bg-zenora-light opacity-5 blur-3xl rounded-full z-0"></div>
      
      <div className="zenora-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="flex flex-col animate-slide-in">
            <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6 w-fit">
              <span className="font-medium">Revolutionizing Property Management</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              AI-Powered Property Management Solutions
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl">
              Zenora delivers the cheapest, simplest, and most efficient AI-driven property management solutions, ensuring 24/7 client satisfaction through automation and smart technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/signup">
                <ZenoraButton size="xl" variant="default" className="w-full sm:w-auto group">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </ZenoraButton>
              </Link>
              <Link to="/contact">
                <ZenoraButton size="xl" variant="outline" className="w-full sm:w-auto">
                  Contact Sales
                </ZenoraButton>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-zenora-purple/20 flex items-center justify-center text-xs text-zenora-purple">
                    {i}
                  </div>
                ))}
              </div>
              <p>Join 1,000+ property owners already using Zenora</p>
            </div>
          </div>
          
          <div className="relative lg:h-[600px] animate-scale-in">
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-zenora-purple/20 to-transparent opacity-20"></div>
              
              {/* Dashboard Preview */}
              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-zenora-gradient text-white px-4 py-2 rounded-md">
                    Zenora Dashboard
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Properties", value: "12" },
                    { label: "Occupancy", value: "94%" },
                    { label: "Revenue", value: "$24,500" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm text-zenora-purple/70">{stat.label}</p>
                      <p className="text-xl font-bold text-zenora-purple">{stat.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col gap-4 overflow-auto flex-grow">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4">
                      <div className="bg-zenora-gradient h-10 w-10 rounded-md flex items-center justify-center text-white font-bold">
                        {i}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">Property #{i}</h3>
                        <p className="text-sm text-zenora-purple/70">123 Main St, Unit {i}</p>
                      </div>
                      <div className="bg-green-500/20 text-green-700 px-2 py-1 rounded text-xs">
                        Rented
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 bg-zenora-dark/30 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm font-medium mb-2">AI Recommendation</div>
                  <p className="text-xs text-zenora-purple/70">
                    Based on market analysis, Property #2 can increase rent by 8% upon renewal.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-zenora-dark rounded-lg shadow-lg p-4 rotate-3 animate-pulse-glow">
              <div className="text-sm font-medium mb-1">Rent Analysis</div>
              <div className="text-xs text-muted-foreground">AI-recommended: $1,850/mo</div>
            </div>
            
            <div className="absolute bottom-12 -left-8 bg-white dark:bg-zenora-dark rounded-lg shadow-lg p-4 -rotate-6 animate-pulse-glow">
              <div className="text-sm font-medium mb-1">Maintenance Alert</div>
              <div className="text-xs text-muted-foreground">Issue resolved in 24hrs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
