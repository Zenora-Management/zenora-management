
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              About Zenora
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Revolutionizing property management with AI-powered solutions that make ownership simpler, more efficient, and more profitable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                Zenora Management's mission is to revolutionize property management by offering the cheapest, simplest, and most efficient AI-driven solutions—ensuring 24/7 client satisfaction through automation and smart technology.
              </p>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                We aim to become the leading AI-powered property management firm that delivers cost-effective, hassle-free, and intelligent solutions, empowering property owners and tenants with seamless, round-the-clock service.
              </p>
            </div>
            <div className="bg-zenora-gradient rounded-xl p-1">
              <div className="bg-white dark:bg-zenora-dark rounded-lg p-6 h-full">
                <h3 className="text-2xl font-bold mb-4">Why Choose Zenora?</h3>
                <ul className="space-y-4">
                  <li>
                    <strong className="text-zenora-purple">AI-Powered Insights:</strong> 
                    <p className="text-muted-foreground">Our proprietary algorithms analyze market data to optimize your rental income and property performance.</p>
                  </li>
                  <li>
                    <strong className="text-zenora-purple">24/7 Management:</strong> 
                    <p className="text-muted-foreground">Never worry about emergency calls or maintenance issues again with our automated response system.</p>
                  </li>
                  <li>
                    <strong className="text-zenora-purple">Cost-Effective Solutions:</strong> 
                    <p className="text-muted-foreground">Save money with our innovative approach to property management, eliminating unnecessary overhead.</p>
                  </li>
                  <li>
                    <strong className="text-zenora-purple">Seamless Experience:</strong> 
                    <p className="text-muted-foreground">Enjoy a hassle-free property management experience with our intuitive platform and dedicated support.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10">Our Journey</h2>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="text-2xl font-bold text-zenora-purple">2018</div>
                  <div className="h-full w-0.5 bg-zenora-purple/20 my-2"></div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Foundation</h3>
                  <p className="text-muted-foreground">
                    Zenora Management was founded with a simple vision: to make property management more efficient through technology. Starting with just three properties, we began developing our proprietary AI algorithms.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="text-2xl font-bold text-zenora-purple">2020</div>
                  <div className="h-full w-0.5 bg-zenora-purple/20 my-2"></div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Technology Breakthrough</h3>
                  <p className="text-muted-foreground">
                    Our development team achieved a major breakthrough with the launch of our first AI-powered rent analysis tool, setting the stage for rapid growth in our managed property portfolio.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="text-2xl font-bold text-zenora-purple">2022</div>
                  <div className="h-full w-0.5 bg-zenora-purple/20 my-2"></div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Expansion</h3>
                  <p className="text-muted-foreground">
                    Zenora expanded operations to 12 major cities, managing over 500 properties. Our AI technology continued to evolve, providing increasingly accurate market insights and automated management solutions.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex flex-col items-center">
                  <div className="text-2xl font-bold text-zenora-purple">Today</div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Industry Leader</h3>
                  <p className="text-muted-foreground">
                    Zenora Management has become an industry leader in AI-powered property management, serving thousands of property owners nationwide with cutting-edge technology and unmatched efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zenora-gradient p-1 rounded-xl mb-20">
            <div className="bg-white dark:bg-zenora-dark rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Join the Property Management Revolution</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Experience the future of property management with Zenora. Our AI-powered platform simplifies every aspect of property ownership, from rent analysis to tenant management.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/signup">
                  <ZenoraButton variant="default" size="lg">
                    Get Started Today
                  </ZenoraButton>
                </Link>
                <Link to="/contact">
                  <ZenoraButton variant="outline" size="lg">
                    Schedule a Demo
                  </ZenoraButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
