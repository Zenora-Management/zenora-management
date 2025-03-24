
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import { Link } from "react-router-dom";

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
          <div className="text-center py-4">
            <Link to="/features" className="text-zenora-purple hover:underline">
              View all features →
            </Link>
          </div>
        </section>
        
        <section id="about">
          <About />
          <div className="text-center py-4">
            <Link to="/about" className="text-zenora-purple hover:underline">
              Learn more about us →
            </Link>
          </div>
        </section>
        
        <section id="contact">
          <Contact />
          <div className="text-center py-4">
            <Link to="/contact" className="text-zenora-purple hover:underline">
              Contact us →
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
