
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="zenora-hero pt-24 pb-16 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-zenora-light opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-zenora-purple opacity-5 blur-3xl rounded-full"></div>
      
      <div className="zenora-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
              <span className="font-medium">AI-Powered Property Management</span>
            </div>
            
            <h1 className="zenora-heading mb-6">
              Transform Your <span className="bg-clip-text text-transparent bg-zenora-gradient">Property Management</span> with AI
            </h1>
            
            <p className="zenora-subheading mb-8">
              Zenora combines artificial intelligence with exceptional service to revolutionize 
              how properties are managed, providing unparalleled insights and efficiency.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <ZenoraButton 
                size="lg"
                as={Link}
                to="/contact"
                className="group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ZenoraButton>
              
              <ZenoraButton 
                variant="outline" 
                size="lg"
                as={Link}
                to="/ai-rent-analysis"
              >
                Explore AI Features
              </ZenoraButton>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="/lovable-uploads/0e1e0eca-4203-41fe-94a5-a5a40d426dcc.png" 
              alt="Zenora Dashboard Preview" 
              className="rounded-xl shadow-2xl w-full max-w-xl mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
