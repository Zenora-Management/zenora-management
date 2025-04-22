
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const TeamContent = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="zenora-section relative overflow-hidden">
      <div className="zenora-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 
            variants={fadeIn} 
            className="text-4xl font-bold mb-6"
          >
            Our Team
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-lg text-muted-foreground"
          >
            Meet the dedicated professionals behind Zenora's success
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
        >
          <motion.div 
            variants={fadeIn}
            className="flex flex-col items-center"
          >
            <img 
              src="/lovable-uploads/a0b42a29-69dc-4c13-b322-930e53867888.png" 
              alt="Ansh Parikh" 
              className="w-40 h-40 rounded-full object-cover border-2 border-zenora-purple/50 shadow-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Ansh Parikh</h3>
            <p className="text-muted-foreground mb-4">Chief Executive Officer</p>
            <a 
              href="https://www.linkedin.com/in/anshparikh01/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-full border border-zenora-purple/50 text-zenora-purple hover:bg-zenora-purple hover:text-white transition-colors duration-300"
              aria-label="Ansh Parikh LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="flex flex-col items-center"
          >
            <img 
              src="https://github.com/anvithv.png" 
              alt="Anvith Vobbilisetty" 
              className="w-40 h-40 rounded-full object-cover border-2 border-zenora-purple/50 shadow-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Anvith Vobbilisetty</h3>
            <p className="text-muted-foreground mb-4">Chief Technology Officer</p>
            <a 
              href="https://www.linkedin.com/in/anvithv/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-full border border-zenora-purple/50 text-zenora-purple hover:bg-zenora-purple hover:text-white transition-colors duration-300"
              aria-label="Anvith Vobbilisetty LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamContent;
