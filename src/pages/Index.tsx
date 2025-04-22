import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import About from "@/components/home/About";
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
        
        <section id="about">
          <About />
        </section>
        
        <section id="features">
          <Features />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
