
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { BarChart, Calendar, CheckCircle, TrendingUp } from "lucide-react";

const AIRentAnalysis = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              AI-Powered Rent Analysis
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Optimize your rental pricing strategy with our advanced AI algorithms that analyze market trends, property features, and competitive data.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Make Data-Driven Pricing Decisions</h2>
              <p className="text-muted-foreground mb-8">
                Our AI rent analysis tool processes vast amounts of market data to provide you with accurate rent estimates and optimize your revenue potential. Stop guessing what your property is worth and start knowing.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Real-Time Market Data</h3>
                    <p className="text-muted-foreground">Access up-to-date rental data from your specific market area</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Competitive Analysis</h3>
                    <p className="text-muted-foreground">Benchmark your property against similar rentals in the area</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Seasonal Adjustments</h3>
                    <p className="text-muted-foreground">Understand how seasonal trends impact rental values</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-zenora-purple mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Property-Specific Valuation</h3>
                    <p className="text-muted-foreground">Receive tailored pricing based on your property's unique features</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <ZenoraButton size="lg">Start Your Analysis</ZenoraButton>
                <ZenoraButton size="lg" variant="outline">Watch Demo</ZenoraButton>
              </div>
            </div>
            
            <div className="bg-zenora-gradient p-1 rounded-xl">
              <div className="bg-white dark:bg-zenora-dark rounded-lg p-6 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
                  alt="AI Rent Analysis Dashboard" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md p-8 mb-20">
            <h2 className="text-2xl font-bold text-center mb-10">How Our AI Rent Analysis Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-zenora-purple" />
                </div>
                <h3 className="font-bold mb-2">Data Collection</h3>
                <p className="text-muted-foreground">We gather comprehensive market data from multiple sources</p>
              </div>
              
              <div className="text-center">
                <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-zenora-purple" />
                </div>
                <h3 className="font-bold mb-2">Pattern Analysis</h3>
                <p className="text-muted-foreground">Our AI analyzes patterns and trends specific to your market</p>
              </div>
              
              <div className="text-center">
                <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart className="h-8 w-8 text-zenora-purple" />
                </div>
                <h3 className="font-bold mb-2">Price Modeling</h3>
                <p className="text-muted-foreground">Advanced algorithms create optimal pricing models</p>
              </div>
              
              <div className="text-center">
                <div className="bg-zenora-purple/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-zenora-purple" />
                </div>
                <h3 className="font-bold mb-2">Recommendations</h3>
                <p className="text-muted-foreground">You receive clear pricing recommendations and insights</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">AI Rent Analysis Pricing</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
              Choose the plan that's right for your portfolio size and analysis needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Basic</h3>
                  <p className="text-muted-foreground mb-4">For individual property owners</p>
                  <div className="text-3xl font-bold mb-6">$29<span className="text-muted-foreground text-base font-normal">/month</span></div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Up to 5 properties</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Monthly analysis updates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Basic market reports</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  
                  <ZenoraButton variant="outline" className="w-full">Select Plan</ZenoraButton>
                </div>
              </div>
              
              <div className="bg-zenora-gradient p-1 rounded-xl">
                <div className="bg-white dark:bg-zenora-dark rounded-lg h-full p-6">
                  <div className="bg-zenora-purple text-white text-xs font-bold uppercase py-1 px-3 rounded-full inline-block mb-4">Most Popular</div>
                  <h3 className="text-xl font-bold mb-2">Professional</h3>
                  <p className="text-muted-foreground mb-4">For small to medium portfolios</p>
                  <div className="text-3xl font-bold mb-6">$79<span className="text-muted-foreground text-base font-normal">/month</span></div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Up to 25 properties</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Weekly analysis updates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Advanced market reports</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Priority email & phone support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Seasonal trend analysis</span>
                    </li>
                  </ul>
                  
                  <ZenoraButton className="w-full">Select Plan</ZenoraButton>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <p className="text-muted-foreground mb-4">For large portfolios</p>
                  <div className="text-3xl font-bold mb-6">$199<span className="text-muted-foreground text-base font-normal">/month</span></div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Unlimited properties</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Real-time analysis updates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Premium market reports</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-zenora-purple mr-2" />
                      <span>Custom API integration</span>
                    </li>
                  </ul>
                  
                  <ZenoraButton variant="outline" className="w-full">Contact Sales</ZenoraButton>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zenora-gradient p-1 rounded-xl">
            <div className="bg-white dark:bg-zenora-dark rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to optimize your rental pricing?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Start using our AI-powered rent analysis tool today and make data-driven decisions that maximize your rental income.
              </p>
              <ZenoraButton size="lg">
                Get Started Free
              </ZenoraButton>
              <p className="text-sm text-muted-foreground mt-4">No credit card required. 14-day free trial.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIRentAnalysis;
