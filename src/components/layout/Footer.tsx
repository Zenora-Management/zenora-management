
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Calendar
} from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-zenora-dark">
      <div className="zenora-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="relative h-10 w-10 rounded-full bg-zenora-gradient flex items-center justify-center shadow-lg">
                <span className="font-bold text-white text-xl">Z</span>
              </div>
              <div className="font-bold text-xl bg-clip-text text-transparent bg-zenora-gradient">
                Zenora
              </div>
            </Link>
            <p className="text-muted-foreground mb-6">
              AI-powered property management solutions that simplify and optimize your real estate investments.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-zenora-purple transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-zenora-purple transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-zenora-purple transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-zenora-purple transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-zenora-purple hover:underline transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-zenora-purple hover:underline transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/features" 
                  className="text-muted-foreground hover:text-zenora-purple hover:underline transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-zenora-purple hover:underline transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-muted-foreground hover:text-zenora-purple hover:underline transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/property-management/details" 
                  className="text-muted-foreground hover:text-zenora-purple hover:underline transition-colors"
                >
                  Property Management
                </Link>
              </li>
              <li>
                <Link 
                  to="/ai-rent-analysis/details" 
                  className="text-muted-foreground hover:text-zenora-purple hover:underline transition-colors"
                >
                  AI Rent Analysis
                </Link>
              </li>
              <li>
                <Link 
                  to="/tenant-screening/details" 
                  className="text-muted-foreground hover:text-zenora-purple hover:underline transition-colors"
                >
                  Tenant Screening
                </Link>
              </li>
              <li>
                <Link 
                  to="/maintenance/details" 
                  className="text-muted-foreground hover:text-zenora-purple hover:underline transition-colors"
                >
                  Maintenance Coordination
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-zenora-purple shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  1121 Tewa Ct.<br />
                  Fremont, CA 94539
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-zenora-purple shrink-0" />
                <a 
                  href="tel:+15107704237" 
                  className="text-muted-foreground hover:text-zenora-purple transition-colors"
                >
                  (510) 770-4237
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-zenora-purple shrink-0" />
                <a 
                  href="mailto:zenoramgmt@gmail.com" 
                  className="text-muted-foreground hover:text-zenora-purple transition-colors"
                >
                  zenoramgmt@gmail.com
                </a>
              </li>
              <li>
                <a href="https://calendly.com/zenoramgmt/30min" target="_blank" rel="noopener noreferrer">
                  <ZenoraButton variant="outline" size="sm" className="mt-2 w-full sm:w-auto">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book a Demo
                  </ZenoraButton>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Zenora Property Management. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link 
              to="/terms" 
              className="text-muted-foreground hover:text-zenora-purple transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="text-muted-foreground hover:text-zenora-purple transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/cookies" 
              className="text-muted-foreground hover:text-zenora-purple transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
