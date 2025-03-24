
import { Link } from "react-router-dom";
import { 
  Home, 
  LineChart, 
  FileText, 
  Bell, 
  CheckCircle, 
  Users, 
  Calendar, 
  Settings,
  ChevronRight
} from "lucide-react";
import { ZenoraButton } from "@/components/ui/button-zenora";

const Features = () => {
  const features = [
    {
      icon: <LineChart className="h-6 w-6 text-zenora-purple" />,
      title: "AI Rent Analysis",
      description: "Our AI algorithm analyzes market data to recommend the optimal rent price for your properties, maximizing your income without sacrificing occupancy."
    },
    {
      icon: <Home className="h-6 w-6 text-zenora-purple" />,
      title: "Property Management",
      description: "Effortlessly manage all your properties in one place with our intuitive dashboard, complete with occupancy tracking and financial reports."
    },
    {
      icon: <FileText className="h-6 w-6 text-zenora-purple" />,
      title: "Zenora Report",
      description: "Generate comprehensive property reports with detailed rent estimates, comparable properties, and market insights at the click of a button."
    },
    {
      icon: <Bell className="h-6 w-6 text-zenora-purple" />,
      title: "Smart Notifications",
      description: "Receive timely alerts about maintenance requests, lease renewals, payment confirmations, and other important events."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-zenora-purple" />,
      title: "Tenant Screening",
      description: "AI-powered screening process that evaluates potential tenants based on credit scores, rental history, and other relevant factors."
    },
    {
      icon: <Users className="h-6 w-6 text-zenora-purple" />,
      title: "Owner Portal",
      description: "Access your property information, financial statements, and maintenance records anytime, anywhere through our secure owner portal."
    },
    {
      icon: <Calendar className="h-6 w-6 text-zenora-purple" />,
      title: "Scheduling",
      description: "Automated scheduling for property showings, maintenance visits, and inspections, synced with your calendar."
    },
    {
      icon: <Settings className="h-6 w-6 text-zenora-purple" />,
      title: "Customizable Dashboards",
      description: "Tailor your dashboard to display the metrics and information that matter most to you and your property portfolio."
    }
  ];

  return (
    <section className="zenora-section bg-gradient-to-b from-white to-gray-50 dark:from-zenora-dark dark:to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-zenora-light opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-zenora-purple opacity-5 blur-3xl rounded-full"></div>
      
      <div className="zenora-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
            <span className="font-medium">Powerful Features</span>
          </div>
          
          <h2 className="zenora-heading bg-clip-text text-transparent bg-zenora-gradient">
            Transforming Property Management With AI
          </h2>
          
          <p className="zenora-subheading">
            Our platform combines cutting-edge AI technology with user-friendly interfaces to deliver a seamless property management experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="zenora-card p-6 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
            >
              <div className="p-3 bg-zenora-purple/10 rounded-lg w-fit mb-4 group-hover:bg-zenora-purple/20 transition-colors">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-zenora-purple transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-4">
                {feature.description}
              </p>
              
              <Link to={`/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-zenora-purple font-medium inline-flex items-center text-sm hover:underline">
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/features">
            <ZenoraButton size="lg" variant="outline">
              Explore All Features
            </ZenoraButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
