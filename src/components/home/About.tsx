import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Globe, Target, Star, Users, ChevronRight } from "lucide-react";
import ProblemSolution from "./ProblemSolution";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section 
      className="zenora-section relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-zenora-light opacity-5 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-zenora-purple opacity-5 blur-3xl rounded-full -z-10"></div>
      
      <div className="zenora-container relative">
        <motion.div 
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
            <span className="font-medium">About Us</span>
          </div>
          
          <h2 className="zenora-heading bg-clip-text text-transparent bg-zenora-gradient">
            Transforming Property Management Through AI
          </h2>
          
          <p className="zenora-subheading">
            Founded by visionaries Ansh Parikh and Anvith Vobbilisetty, Zenora combines cutting-edge technology with property management expertise to revolutionize how properties are managed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <motion.div 
            variants={fadeIn}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">Our Story</h3>
            <p className="text-muted-foreground mb-6">
              Zenora Property Management was founded in 2024 with a mission to make property management simple, affordable, and effective through AI-powered automation. What started as a solution for a few property owners has grown into a comprehensive platform serving property owners across the bay area.
            </p>
          </motion.div>
          
          <ProblemSolution />
        </div>

        <motion.div 
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-4">Why Choose Zenora</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-driven approach delivers tangible benefits that transform the property management experience.
          </p>
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: <Star className="h-8 w-8 text-amber-500" />,
              title: "Excellence",
              description: "We're committed to delivering exceptional service and continuous improvement."
            },
            {
              icon: <Globe className="h-8 w-8 text-blue-500" />,
              title: "Innovation",
              description: "We leverage cutting-edge AI to solve complex property management challenges."
            },
            {
              icon: <Users className="h-8 w-8 text-green-500" />,
              title: "Customer Focus",
              description: "We put our clients first and design solutions around their specific needs."
            },
            {
              icon: <Target className="h-8 w-8 text-red-500" />,
              title: "Integrity",
              description: "We operate with transparency and honesty in all our business practices."
            }
          ].map((value, i) => (
            <motion.div 
              key={i} 
              className="zenora-card p-6 hover:shadow-lg transition-all duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="rounded-full w-14 h-14 bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h4 className="text-xl font-bold mb-2">{value.title}</h4>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="flex flex-col items-center"
        >
          <Link to="/contact">
            <ZenoraButton size="lg" className="group">
              Get Started <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </ZenoraButton>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
