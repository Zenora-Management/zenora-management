
import { motion } from "framer-motion";

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
      className="relative rounded-2xl overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gradient-to-br from-background to-muted/50 border rounded-xl">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-zenora-purple">The Problem</h3>
          <p className="text-muted-foreground">
            Property owners, landlords, and real estate investors often face a disorganized and inefficient process when managing their properties. From tracking rental prices and finding market comps to handling maintenance requests, organizing important documents, and coordinating between tenants and vendors — the process is often scattered across emails, spreadsheets, and paper files. This lack of centralization leads to wasted time, missed opportunities, and costly mistakes.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-zenora-purple">Zenora Management: The Solution</h3>
          <p className="text-muted-foreground">
            Zenora Management provides an all-in-one, AI-powered property management platform that brings everything you need into one place. Our solution automates comparative market analysis (CMA), rental value estimations, and real estate insights — while also offering seamless maintenance coordination, document handling, and centralized property information storage. Whether it's keeping track of lease agreements, managing maintenance requests, or accessing key property data, Zenora helps owners and managers stay organized, reduce hassle, and make smarter, faster decisions.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemSolution;
