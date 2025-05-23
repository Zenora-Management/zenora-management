import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const goToHome = (e) => {
    e.preventDefault();
    navigate('/', { replace: true });
  };

  const goToDashboard = () => {
    window.location.href = 'https://zenoralogin.com';
  };

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
          onClick={goToHome}
        >
          <div className="relative h-10 w-10 rounded-full bg-zenora-gradient flex items-center justify-center shadow-lg animate-pulse-glow">
            <span className="font-bold text-white text-xl">Z</span>
          </div>
          <div className="font-bold text-xl bg-clip-text text-transparent bg-zenora-gradient">
            Zenora
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="/" 
            className={`text-foreground hover:text-zenora-purple transition-colors ${location.pathname === '/' ? 'text-zenora-purple font-medium' : ''}`}
            onClick={goToHome}
          >
            Home
          </a>
          <Link to="/pricing" className={`text-foreground hover:text-zenora-purple transition-colors ${location.pathname === '/pricing' ? 'text-zenora-purple font-medium' : ''}`}>
            Pricing
          </Link>
          <Link to="/features" className={`text-foreground hover:text-zenora-purple transition-colors ${location.pathname === '/features' ? 'text-zenora-purple font-medium' : ''}`}>
            Features
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`text-foreground hover:text-zenora-purple transition-colors bg-transparent ${
                  ['/property-management', '/property-management/details', '/ai-rent-analysis', '/ai-rent-analysis/details', '/document-management', '/document-management/details', '/maintenance', '/maintenance/details'].includes(location.pathname) 
                    ? 'text-zenora-purple font-medium' 
                    : ''
                }`}>
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/property-management/details"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Property Management
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Comprehensive property management solutions for landlords and property owners
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/ai-rent-analysis/details"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            location.pathname === '/ai-rent-analysis' || location.pathname === '/ai-rent-analysis/details' ? "bg-accent" : ""
                          )}
                        >
                          <div className="text-sm font-medium leading-none">AI Rent Analysis</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Optimize rental pricing with AI-powered market analysis
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/document-management/details"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            location.pathname === '/document-management' || location.pathname === '/document-management/details' ? "bg-accent" : ""
                          )}
                        >
                          <div className="text-sm font-medium leading-none">Document Management</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Effortlessly handle, organize, and access documents with AI-powered insight
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/maintenance/details"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            location.pathname === '/maintenance' || location.pathname === '/maintenance/details' ? "bg-accent" : ""
                          )}
                        >
                          <div className="text-sm font-medium leading-none">Maintenance Coordination</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Streamline property maintenance with our AI-powered system
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link to="/about" className={`text-foreground hover:text-zenora-purple transition-colors ${location.pathname === '/about' ? 'text-zenora-purple font-medium' : ''}`}>
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ZenoraButton 
            variant="outline" 
            size="default" 
            onClick={goToDashboard}
            className="flex items-center gap-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </ZenoraButton>
          <Link to="/contact">
            <ZenoraButton variant="default" size="default">
              Get Started
            </ZenoraButton>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-zenora-dark shadow-lg py-4 animate-fade-in">
          <div className="zenora-container flex flex-col gap-4">
            <a 
              href="/" 
              className={`text-foreground hover:text-zenora-purple py-2 transition-colors ${location.pathname === '/' ? 'text-zenora-purple font-medium' : ''}`}
              onClick={goToHome}
            >
              Home
            </a>
            <Link 
              to="/pricing"
              className={`text-foreground hover:text-zenora-purple py-2 transition-colors ${location.pathname === '/pricing' ? 'text-zenora-purple font-medium' : ''}`}
            >
              Pricing
            </Link>
            <Link 
              to="/features"
              className={`text-foreground hover:text-zenora-purple py-2 transition-colors ${location.pathname === '/features' ? 'text-zenora-purple font-medium' : ''}`}
            >
              Features
            </Link>
            
            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-2 my-1">
              <div className="font-medium py-1 text-foreground">Services</div>
              <div className="pl-4 flex flex-col gap-2">
                <Link 
                  to="/property-management/details"
                  className={`text-foreground hover:text-zenora-purple py-1 transition-colors ${location.pathname === '/property-management' || location.pathname === '/property-management/details' ? 'text-zenora-purple font-medium' : ''}`}
                >
                  Property Management
                </Link>
                <Link 
                  to="/ai-rent-analysis/details"
                  className={`text-foreground hover:text-zenora-purple py-1 transition-colors ${location.pathname === '/ai-rent-analysis' || location.pathname === '/ai-rent-analysis/details' ? 'text-zenora-purple font-medium' : ''}`}
                >
                  AI Rent Analysis
                </Link>
                <Link 
                  to="/document-management/details"
                  className={`text-foreground hover:text-zenora-purple py-1 transition-colors ${location.pathname === '/document-management' || location.pathname === '/document-management/details' ? 'text-zenora-purple font-medium' : ''}`}
                >
                  Document Management
                </Link>
                <Link 
                  to="/maintenance/details"
                  className={`text-foreground hover:text-zenora-purple py-1 transition-colors ${location.pathname === '/maintenance' || location.pathname === '/maintenance/details' ? 'text-zenora-purple font-medium' : ''}`}
                >
                  Maintenance Coordination
                </Link>
              </div>
            </div>
            
            <Link 
              to="/about"
              className={`text-foreground hover:text-zenora-purple py-2 transition-colors ${location.pathname === '/about' ? 'text-zenora-purple font-medium' : ''}`}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <ZenoraButton 
                variant="outline" 
                size="default" 
                onClick={goToDashboard}
                className="flex items-center justify-center gap-2 w-full"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </ZenoraButton>
              <Link to="/contact">
                <ZenoraButton variant="default" size="default" className="w-full">
                  Get Started
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
