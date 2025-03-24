
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-zenora-dark/80 backdrop-blur-lg shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="zenora-container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2"
          aria-label="Zenora Management Home"
        >
          <div className="relative h-10 w-10 rounded-full bg-zenora-gradient flex items-center justify-center shadow-lg animate-pulse-glow">
            <span className="font-bold text-white text-xl">Z</span>
          </div>
          <div className="font-bold text-xl bg-clip-text text-transparent bg-zenora-gradient">
            Zenora
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-zenora-purple transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-foreground hover:text-zenora-purple transition-colors">
            Features
          </Link>
          <Link to="/about" className="text-foreground hover:text-zenora-purple transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-foreground hover:text-zenora-purple transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <ZenoraButton variant="outline" size="default">
              Log In
            </ZenoraButton>
          </Link>
          <Link to="/signup">
            <ZenoraButton variant="default" size="default">
              Sign Up
            </ZenoraButton>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-zenora-dark shadow-lg py-4 animate-fade-in">
          <div className="zenora-container flex flex-col gap-4">
            <Link 
              to="/"
              className="text-foreground hover:text-zenora-purple py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features"
              className="text-foreground hover:text-zenora-purple py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/about"
              className="text-foreground hover:text-zenora-purple py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact"
              className="text-foreground hover:text-zenora-purple py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <ZenoraButton variant="outline" size="default" className="w-full">
                  Log In
                </ZenoraButton>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <ZenoraButton variant="default" size="default" className="w-full">
                  Sign Up
                </ZenoraButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
