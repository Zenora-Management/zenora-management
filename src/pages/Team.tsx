
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeamContent from "@/components/team/TeamContent";
import { motion } from "framer-motion";

const TeamPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.div 
        className="pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TeamContent />
      </motion.div>
      <Footer />
    </div>
  );
};

export default TeamPage;
