import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Check, Calendar, ChevronRight, LineChart, BarChart3, PieChart } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const AIRentAnalysisDetail = () => {
  const demoSectionRef = useRef<HTMLDivElement>(null);
  
  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-zenora-dark to-zenora-purple py-16 text-white">
          <div className="absolute inset-0 bg-grid-white/[0.03]" />
          <div className="zenora-container relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="inline-flex items-center rounded-full border border-zenora-light/30 bg-zenora-light/5 px-3 py-1 text-sm backdrop-blur-sm mb-6">
                  <span className="font-medium">AI-Powered Solutions</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  AI Rent Analysis
                </h1>
                <p className="text-lg mb-8 text-white/80">
                  Harness the power of artificial intelligence to analyze rental markets, optimize pricing, and maximize your property's earning potential. Our AI-powered rent analysis tool helps you stay competitive with real-time market insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact?subject=demo">
                    <ZenoraButton variant="inverted" size="lg">
                      Request a Demo
                    </ZenoraButton>
                  </Link>
                  <ZenoraButton variant="outline" className="text-white border-white" onClick={scrollToDemo}>
                    Preview
                  </ZenoraButton>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="/lovable-uploads/6ec1603f-741d-4f1d-bb10-163401d7a684.png" 
                    alt="AI Rent Analysis Dashboard" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="py-16 bg-white dark:bg-zenora-dark">
          <div className="zenora-container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
                <span className="font-medium">Key Features</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Advanced AI Features for Rental Analysis
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered tools analyze vast amounts of market data to provide you with actionable insights for optimal rental pricing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Market Trend Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Track rental market trends over time with advanced AI algorithms that analyze historical data and predict future movements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Historical trend visualization</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Seasonal adjustment factors</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Predictive trend forecasting</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Competitive Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Compare your property's pricing with similar properties in your area to ensure you're positioned optimally in the market.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Neighborhood comparison</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Amenity-adjusted valuations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Price position recommendations</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Revenue Optimization</h3>
                <p className="text-muted-foreground mb-4">
                  Identify the optimal price point to maximize your rental income while minimizing vacancy periods.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Vacancy cost analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Tenant turnover projections</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Income maximization strategies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-gray-50 dark:bg-zenora-dark/70">
          <div className="zenora-container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
                <span className="font-medium">Process</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                How Our AI Rent Analysis Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our sophisticated AI algorithms process multiple data sources to deliver accurate rental market insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Data Collection</h3>
                <p className="text-muted-foreground">
                  Our AI gathers data from multiple sources, including public records, rental listings, and market transactions to create a comprehensive dataset.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Analysis & Processing</h3>
                <p className="text-muted-foreground">
                  Advanced machine learning algorithms analyze the data, identifying patterns, trends, and factors that influence rental rates in your specific market.
                </p>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl p-8 shadow-sm relative">
                <div className="absolute -top-5 -left-5 h-10 w-10 bg-zenora-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 mt-2">Actionable Insights</h3>
                <p className="text-muted-foreground">
                  Receive clear, actionable recommendations about optimal pricing, potential rental increases, and market positioning for your property.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Preview Section */}
        <section ref={demoSectionRef} className="py-16 bg-white dark:bg-zenora-dark">
          <div className="zenora-container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
                <span className="font-medium">Preview</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Experience AI Rent Analysis in Action
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how our AI-powered tool analyzes rental data to provide you with actionable insights.
              </p>
            </div>
            
            <div className="zenora-card p-8">
              <div className="bg-zenora-purple/5 p-8 rounded-xl mb-8">
                <h3 className="text-xl font-bold mb-4">Property Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Property Type</label>
                    <select className="zenora-input w-full">
                      <option>Apartment</option>
                      <option>House</option>
                      <option>Condo</option>
                      <option>Townhouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bedrooms</label>
                    <select className="zenora-input w-full">
                      <option>Studio</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bathrooms</label>
                    <select className="zenora-input w-full">
                      <option>1</option>
                      <option>1.5</option>
                      <option>2</option>
                      <option>2.5</option>
                      <option>3+</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <ZenoraButton>Analyze Property</ZenoraButton>
                </div>
              </div>
              
              <div className="border border-zenora-purple/20 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Market Analysis Results</h3>
                  <span className="text-sm text-muted-foreground">Demo data</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4">Recommended Rent Range</h4>
                    <div className="bg-zenora-purple/5 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Minimum</span>
                        <span className="font-bold">$1,850</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Optimal</span>
                        <span className="font-bold text-zenora-purple">$2,100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maximum</span>
                        <span className="font-bold">$2,350</span>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold mt-6 mb-4">Market Comparison</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Your Area Average</span>
                        <span className="font-bold">$2,050</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Similar Properties</span>
                        <span className="font-bold">$2,150</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Market Trend</span>
                        <span className="text-green-500 font-bold">+3.5% (Last 6 months)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Rental Demand</h4>
                    <div className="h-64 bg-zenora-purple/10 rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Demand chart visualization</span>
                    </div>
                    
                    <h4 className="font-semibold mt-6 mb-4">Factors Affecting Price</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Location</span>
                        <span className="font-medium text-green-500">+$150</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Property Size</span>
                        <span className="font-medium text-green-500">+$75</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Amenities</span>
                        <span className="font-medium text-green-500">+$100</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Market Competition</span>
                        <span className="font-medium text-red-500">-$50</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-zenora-gradient text-white">
          <div className="zenora-container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Optimize Your Rental Income?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Join property owners who are maximizing their returns with our AI-powered rent analysis tools. Schedule a demo today to see how we can help you make data-driven decisions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact?subject=demo">
                  <ZenoraButton variant="inverted" size="lg">
                    <Calendar className="mr-2 h-4 w-4" /> Schedule a Demo
                  </ZenoraButton>
                </Link>
                <Link to="/contact">
                  <ZenoraButton variant="glass" size="lg">
                    Contact Us <ChevronRight className="ml-2 h-4 w-4" />
                  </ZenoraButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIRentAnalysisDetail;
