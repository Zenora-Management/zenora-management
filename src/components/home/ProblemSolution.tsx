
import { motion } from "framer-motion";
import { Building, Shield } from "lucide-react";

const ProblemSolution = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      variants={fadeIn}
      className="relative bg-gradient-to-br from-background to-muted/20 rounded-3xl overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        {/* Problem Card */}
        <motion.div 
          className="relative p-8 bg-white/50 dark:bg-zenora-dark/50 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"
          whileHover={{ y: -5 }}
        >
          <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Building className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-red-500">The Problem</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Property owners, landlords, and real estate investors often face a disorganized and inefficient process when managing their properties. From tracking rental prices and finding market comps to handling maintenance requests, organizing important documents, and coordinating between tenants and vendors — the process is often scattered across emails, spreadsheets, and paper files. This lack of centralization leads to wasted time, missed opportunities, and costly mistakes.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Solution Card */}
        <motion.div 
          className="relative p-8 bg-white/50 dark:bg-zenora-dark/50 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"
          whileHover={{ y: -5 }}
        >
          <div className="absolute inset-0 bg-zenora-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-zenora-purple/10 rounded-lg">
                <Shield className="h-6 w-6 text-zenora-purple" />
              </div>
              <h3 className="text-2xl font-bold text-zenora-purple">Zenora Management: The Solution</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Zenora Management provides an all-in-one, AI-powered property management platform that brings everything you need into one place. Our solution automates comparative market analysis (CMA), rental value estimations, and real estate insights — while also offering seamless maintenance coordination, document handling, and centralized property information storage. Whether it's keeping track of lease agreements, managing maintenance requests, or accessing key property data, Zenora helps owners and managers stay organized, reduce hassle, and make smarter, faster decisions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProblemSolution;
