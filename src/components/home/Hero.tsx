
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 lg:pb-32 min-h-screen flex items-center">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-zenora-dark dark:to-black z-0"></div>
      
      {/* Vector background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Abstract vector shapes */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 L1000,0 L1000,1000 L0,1000 Z" fill="none" />
          <circle cx="500" cy="500" r="300" fill="url(#gradientPurple)" />
          <path d="M0,0 Q500,500 1000,1000" stroke="url(#gradientBlue)" strokeWidth="100" fill="none" />
          <path d="M0,1000 Q500,500 1000,0" stroke="url(#gradientPink)" strokeWidth="100" fill="none" />
          <defs>
            <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9b87f5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6E59A5" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#D3E4FD" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradientPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D946EF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFDEE2" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Animated vectors */}
        <motion.div 
          className="absolute top-0 right-0 w-1/3 h-1/3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#9b87f5" d="M41.2,-69.2C54.8,-63.1,68.2,-54.8,76.5,-42.3C84.8,-29.9,87.9,-13.1,85.9,2.9C83.8,19,76.6,34.4,67.8,49.5C59,64.7,48.5,79.6,34.7,84.2C21,88.9,4.1,83.3,-9.5,75.7C-23.1,68.1,-33.5,58.5,-45.9,49.2C-58.3,40,-72.8,31.2,-77.7,19.1C-82.6,7,-77.9,-8.4,-71.6,-22.1C-65.3,-35.8,-57.4,-47.9,-46.3,-55.2C-35.2,-62.5,-20.9,-65.1,-6.8,-62.9C7.4,-60.7,27.7,-75.3,41.2,-69.2Z" transform="translate(100 100)" />
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-1/2 h-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#D3E4FD" d="M46.5,-78.3C59.2,-71.5,68,-58.2,76.4,-44.3C84.8,-30.4,92.9,-15.2,90.4,-1.5C87.9,12.3,74.9,24.5,65.2,38.8C55.6,53.1,49.3,69.5,38.1,75.6C26.9,81.7,10.8,77.5,-4.2,74.2C-19.2,70.9,-33.2,68.4,-45.4,62C-57.6,55.5,-68.1,45,-73.9,32.1C-79.8,19.2,-81,3.8,-78.1,-10.5C-75.2,-24.7,-68.2,-37.9,-57.7,-46.1C-47.1,-54.3,-33.1,-57.5,-20.4,-63.9C-7.8,-70.3,3.4,-79.8,16.8,-83.8C30.2,-87.8,45.8,-86.3,46.5,-78.3Z" transform="translate(100 100)" />
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute top-1/2 left-1/4 w-1/4 h-1/4"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFDEE2" d="M39.9,-65.7C52.5,-60.5,64.2,-51.7,72.7,-39.9C81.1,-28.2,86.4,-14.1,85.6,-0.5C84.8,13.2,77.9,26.3,69.4,38.1C60.9,49.8,50.7,60,38.7,66.7C26.7,73.4,13.3,76.4,-0.3,76.9C-13.9,77.3,-27.9,75.1,-40.1,68.7C-52.4,62.4,-63,51.9,-70.8,39.3C-78.5,26.6,-83.3,11.8,-83.3,-3C-83.3,-17.9,-78.3,-35.8,-68.4,-49C-58.5,-62.3,-43.8,-71,-29.4,-73.8C-15,-76.7,-0.8,-73.6,12.3,-69.2C25.3,-64.8,50.7,-59,39.9,-65.7Z" transform="translate(100 100)" />
          </svg>
        </motion.div>
      </div>
      
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
              <Link to="/contact">
                <ZenoraButton size="xl" variant="default" className="w-full sm:w-auto group">
                  Feel the Zen!
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </ZenoraButton>
              </Link>
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
                  {[
                    { 
                      id: 1, 
                      name: "Property #1", 
                      address: "1470 Oak Avenue, San Francisco", 
                      status: "Rented", 
                      statusClass: "bg-green-500/20 text-green-700" 
                    },
                    { 
                      id: 2, 
                      name: "Property #2", 
                      address: "835 Maple Street, Suite 2B, Portland", 
                      status: "Vacant", 
                      statusClass: "bg-amber-500/20 text-amber-700" 
                    },
                    { 
                      id: 3, 
                      name: "Property #3", 
                      address: "217 Cedar Lane, New York", 
                      status: "Maintenance", 
                      statusClass: "bg-blue-500/20 text-blue-700" 
                    },
                    { 
                      id: 4, 
                      name: "Property #4", 
                      address: "508 Birch Road, Austin", 
                      status: "Leasing", 
                      statusClass: "bg-purple-500/20 text-purple-700" 
                    },
                    { 
                      id: 5, 
                      name: "Property #5", 
                      address: "1249 Pine Court, Seattle", 
                      status: "Rented", 
                      statusClass: "bg-green-500/20 text-green-700" 
                    }
                  ].map((property) => (
                    <motion.div 
                      key={property.id} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 + (property.id * 0.1), duration: 0.3 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 hover:bg-white/20 transition-all duration-300"
                      whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                    >
                      <div className="bg-zenora-gradient h-10 w-10 rounded-md flex items-center justify-center text-white font-bold">
                        {property.id}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{property.name}</h3>
                        <p className="text-sm text-zenora-purple/70">{property.address}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${property.statusClass}`}>
                        {property.status}
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
                  <div className="text-sm font-medium mb-2">AI Insights</div>
                  <p className="text-xs text-zenora-purple/70">
                    Property #2 has been vacant for 14 days. Consider adjusting listing price by 5% to attract tenants faster.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
