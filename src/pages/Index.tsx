
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import { Link } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  // Smooth scroll to section when clicking on navigation links
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const section = document.querySelector(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Handle initial load with hash
    if (window.location.hash) {
      handleHashChange();
    }

    // Add event listener
    window.addEventListener("hashchange", handleHashChange);

    // Clean up
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Add support for the auth bypass feature
  useEffect(() => {
    // Listen for the keyboard shortcut Ctrl+Shift+B to activate bypass
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Shift+B
      if (e.ctrlKey && e.shiftKey && e.key === 'B') {
        // Import dynamically to avoid unnecessary loading
        import('@/utils/auth-bypass').then(module => {
          module.authBypass.toggle();
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <section id="features">
          <Features />
          <motion.div 
            className="text-center py-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/features">
              <ZenoraButton variant="outline" size="lg" className="group">
                Explore All Features
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </ZenoraButton>
            </Link>
          </motion.div>
        </section>
        
        <section id="about">
          <About />
          <motion.div 
            className="text-center py-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/about">
              <ZenoraButton variant="outline" size="lg" className="group">
                Learn More About Us
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </ZenoraButton>
            </Link>
          </motion.div>
        </section>
        
        <section id="contact">
          <Contact />
          <motion.div 
            className="text-center py-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/contact">
              <ZenoraButton variant="outline" size="lg" className="group">
                Get In Touch
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </ZenoraButton>
            </Link>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
