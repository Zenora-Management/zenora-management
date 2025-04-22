
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BadgeDollarSign } from "lucide-react";
import { motion } from "framer-motion";
import PricingCard from "@/components/pricing/PricingCard";
import { pricingPlans } from "@/data/pricing-plans";

const Pricing = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
              <BadgeDollarSign className="mr-2 h-4 w-4" />
              <span className="font-medium">Pricing Plans</span>
            </div>
            <h1 className="zenora-heading bg-clip-text text-transparent bg-zenora-gradient mb-4">
              Choose Your Perfect Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options designed to meet your property management needs
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan) => (
              <motion.div 
                key={plan.id}
                variants={fadeIn}
              >
                <PricingCard {...plan} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
