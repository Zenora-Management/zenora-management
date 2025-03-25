
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 lg:pb-32 min-h-screen flex items-center">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-zenora-dark dark:to-black z-0"></div>
      
      {/* Animated background shapes */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-24 right-0 w-3/4 h-3/4 bg-zenora-gradient opacity-5 blur-3xl rounded-full z-0"
      ></motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatType: "reverse",
          delay: 1 
        }}
        className="absolute bottom-0 left-0 w-2/3 h-1/3 bg-zenora-light opacity-5 blur-3xl rounded-full z-0"
      ></motion.div>
      
      <div className="zenora-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6 w-fit"
            >
              <span className="font-medium">Revolutionizing Property Management</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient"
            >
              AI-Powered Property Management Solutions
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl"
            >
              Zenora delivers the cheapest, simplest, and most efficient AI-driven property management solutions, ensuring 24/7 client satisfaction through automation and smart technology.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link to="/signup">
                <ZenoraButton size="xl" variant="default" className="w-full sm:w-auto group" animation="glow">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </ZenoraButton>
              </Link>
              <Link to="/contact">
                <ZenoraButton size="xl" variant="outline" className="w-full sm:w-auto group">
                  Contact Sales
                  <motion.span 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.3 }}
                    className="ml-2"
                  >→</motion.span>
                </ZenoraButton>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex items-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + (i * 0.1), duration: 0.3 }}
                    className="h-8 w-8 rounded-full border-2 border-white bg-zenora-purple/20 flex items-center justify-center text-xs text-zenora-purple"
                    whileHover={{ scale: 1.1 }}
                  >
                    {i}
                  </motion.div>
                ))}
              </div>
              <p>Join 1,000+ property owners already using Zenora</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-[600px]"
          >
            <motion.div 
              className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zenora-purple/20 to-transparent opacity-20"></div>
              
              {/* Dashboard Preview */}
              <div className="absolute inset-0 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    className="bg-zenora-gradient text-white px-4 py-2 rounded-md font-medium"
                  >
                    Zenora Dashboard
                  </motion.div>
                  <div className="flex gap-2">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
                      className="w-3 h-3 rounded-full bg-red-500"
                    ></motion.div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.5, delay: 0.1 }}
                      className="w-3 h-3 rounded-full bg-yellow-500"
                    ></motion.div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, repeatDelay: 5, duration: 0.5, delay: 0.2 }}
                      className="w-3 h-3 rounded-full bg-green-500"
                    ></motion.div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Properties", value: "12" },
                    { label: "Occupancy", value: "94%" },
                    { label: "Revenue", value: "$24,500" },
                  ].map((stat, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + (i * 0.1), duration: 0.3 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <p className="text-sm text-zenora-purple/70">{stat.label}</p>
                      <p className="text-xl font-bold text-zenora-purple">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col gap-4 overflow-auto flex-grow">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 + (i * 0.1), duration: 0.3 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 hover:bg-white/20 transition-all duration-300"
                      whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                    >
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
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                  className="mt-4 bg-zenora-dark/30 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="text-sm font-medium mb-2">AI Recommendation</div>
                  <p className="text-xs text-zenora-purple/70">
                    Based on market analysis, Property #2 can increase rent by 8% upon renewal.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Floating elements */}
            <motion.div 
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 2.4, duration: 0.5 }}
              className="absolute -top-4 -right-4 bg-white dark:bg-zenora-dark rounded-lg shadow-lg p-4 rotate-3"
              whileHover={{ scale: 1.05, rotate: 5 }}
              animate={{ 
                y: [0, -10, 0],
                boxShadow: [
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatDelay: 2,
                duration: 4 
              }}
            >
              <div className="text-sm font-medium mb-1">Rent Analysis</div>
              <div className="text-xs text-muted-foreground">AI-recommended: $1,850/mo</div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 2.6, duration: 0.5 }}
              className="absolute bottom-12 -left-8 bg-white dark:bg-zenora-dark rounded-lg shadow-lg p-4 -rotate-6"
              whileHover={{ scale: 1.05, rotate: -8 }}
              animate={{ 
                y: [0, 10, 0],
                boxShadow: [
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatDelay: 3,
                duration: 4,
                delay: 1
              }}
            >
              <div className="text-sm font-medium mb-1">Maintenance Alert</div>
              <div className="text-xs text-muted-foreground">Issue resolved in 24hrs</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
