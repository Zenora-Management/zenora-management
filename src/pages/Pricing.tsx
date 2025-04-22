
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BadgeDollarSign, Check } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
            {/* ZenPlatinum Plan */}
            <motion.div 
              variants={fadeIn}
              className="relative p-6 rounded-xl border bg-card shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm rounded-full">
                Most Popular
              </div>
              <h3 className="flex items-center text-xl font-bold mb-2">
                <span className="mr-2">💎</span> ZenPlatinum
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$1,999</span>
                <span className="text-muted-foreground">/year</span>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  "Property Listing",
                  "Access to Owner Dashboard",
                  "AI-Powered Rent Analysis & Zenora CMA Report",
                  "Professional Photography",
                  "End-to-End Document Service",
                  "Live Rental Showings",
                  "Marketing on 5+ Major Platforms",
                  "For-Rent Sign on Property",
                  "24/7 Tenant Management & Support",
                  "Tenant Application Management",
                  "Lockbox on Property"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full">
                <ZenoraButton className="w-full" size="lg">
                  Get Started
                </ZenoraButton>
              </Link>
            </motion.div>

            {/* Referral & Transfer Plan */}
            <motion.div 
              variants={fadeIn}
              className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-lg transition-shadow"
            >
              <h3 className="flex items-center text-xl font-bold mb-2">
                <span className="mr-2">🔄</span> Referral & Transfer
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$1,499</span>
                <span className="text-muted-foreground">/year</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Same Services as ZenPlatinum</p>
              <ul className="space-y-3 mb-6">
                {[
                  "Property Listing",
                  "AI-Powered Rent Analysis & Zenora CMA Report",
                  "Professional Photography",
                  "End-to-End Document Service",
                  "Live Rental Showings",
                  "Marketing on 5+ Major Platforms",
                  "For-Rent Sign on Property",
                  "24/7 Tenant Management & Support",
                  "Tenant Application Management",
                  "Lockbox on Property"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full">
                <ZenoraButton variant="outline" className="w-full" size="lg">
                  Contact Sales
                </ZenoraButton>
              </Link>
            </motion.div>

            {/* ZenGold Plan */}
            <motion.div 
              variants={fadeIn}
              className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-lg transition-shadow"
            >
              <h3 className="flex items-center text-xl font-bold mb-2">
                <span className="mr-2">🥇</span> ZenGold
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$1,499</span>
                <span className="text-muted-foreground">/year</span>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  "Property Listing",
                  "AI-Powered Rent Analysis & Zenora CMA Report",
                  "Professional Photography",
                  "End-to-End Document Service",
                  "Marketing on 5+ Major Platforms",
                  "Tenant Management (Response within 72 hours)",
                  "Tenant Application Management",
                  "Lockbox on Property (Self-Guided Showings)"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full">
                <ZenoraButton variant="outline" className="w-full" size="lg">
                  Get Started
                </ZenoraButton>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div 
              variants={fadeIn}
              className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-lg transition-shadow"
            >
              <h3 className="flex items-center text-xl font-bold mb-2">
                <span className="mr-2">🏢</span> Enterprise
              </h3>
              <div className="mb-4">
                <span className="text-xl font-medium">Custom Pricing</span>
                <p className="text-sm text-muted-foreground">For Realtors & Brokerages</p>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  "Bulk Listing Discounts",
                  "Access to Zenora Tools & Dashboard",
                  "AI-Powered CMA & Rent Reports",
                  "Client Management Tools",
                  "Document Handling & Secure Storage"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full">
                <ZenoraButton variant="outline" className="w-full" size="lg">
                  Contact Sales
                </ZenoraButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
