
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Check, Calendar, ChevronRight, Building, Shield, BarChart4, Users } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyManagementDetail = () => {
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
                  <span className="font-medium">Our Core Service</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Comprehensive Property Management
                </h1>
                <p className="text-lg mb-8 text-white/80">
                  We handle all aspects of property management so you can focus on what matters most. From tenant screening to maintenance coordination, we've got you covered with our AI-enhanced approach.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact?subject=demo">
                    <ZenoraButton variant="inverted" size="lg">
                      Request a Demo
                    </ZenoraButton>
                  </Link>
                  <Link to="/contact">
                    <ZenoraButton variant="outline" className="text-white border-white">
                      Talk to an Expert
                    </ZenoraButton>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=500" 
                    alt="Property Management" 
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
                <span className="font-medium">Comprehensive Solutions</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Full-Service Property Management
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide end-to-end property management services enhanced by cutting-edge AI technology for optimal results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Property Marketing</h3>
                <p className="text-muted-foreground mb-4">
                  Professional marketing of your property to attract quality tenants quickly and minimize vacancy periods.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Professional photography</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Multi-platform listings</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Virtual tours</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Tenant Management</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive tenant management from screening to move-out, ensuring a positive experience for everyone.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Thorough tenant screening</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Online rent collection</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Tenant communication portal</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Maintenance & Repairs</h3>
                <p className="text-muted-foreground mb-4">
                  Proactive maintenance and rapid response to repair requests to protect your investment.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>24/7 emergency service</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Vendor management</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Scheduled inspections</span>
                  </li>
                </ul>
              </div>
              
              <div className="zenora-card p-6">
                <div className="h-12 w-12 bg-zenora-purple/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart4 className="h-6 w-6 text-zenora-purple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Financial Management</h3>
                <p className="text-muted-foreground mb-4">
                  Transparent financial reporting and management to keep you informed and maximize returns.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Detailed financial reports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Owner profit distributions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Tax preparation assistance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Plans */}
        <section className="py-16 bg-gray-50 dark:bg-zenora-dark/70">
          <div className="zenora-container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
                <span className="font-medium">Investment Plans</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Choose the Right Plan for Your Property
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer flexible pricing options to meet the needs of different property owners.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Standard Plan */}
              <div className="bg-white dark:bg-zenora-dark rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                <div className="p-1 bg-gradient-to-r from-purple-500 to-blue-500">
                  <div className="bg-white dark:bg-zenora-dark p-6">
                    <h3 className="text-xl font-bold mb-2">Client Plan</h3>
                    <div className="mt-4 mb-6">
                      <div className="text-4xl font-bold">$1,999</div>
                      <div className="text-sm text-muted-foreground">per year</div>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Perfect for single property owners looking for comprehensive management.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Full property management</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Tenant screening & placement</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Maintenance coordination</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>AI rent analysis (basic)</span>
                      </li>
                    </ul>
                    <Link to="/contact?plan=client">
                      <ZenoraButton className="w-full" size="lg">
                        Get Started
                      </ZenoraButton>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Discount Plans */}
              <div className="bg-white dark:bg-zenora-dark rounded-xl shadow-xl overflow-hidden transform md:scale-105 relative">
                <div className="absolute top-0 right-0 bg-zenora-purple text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Most Popular
                </div>
                <div className="p-1 bg-zenora-gradient">
                  <div className="bg-white dark:bg-zenora-dark p-6">
                    <h3 className="text-xl font-bold mb-2">Discount Plans</h3>
                    <div className="mt-4 mb-6">
                      <div className="text-4xl font-bold">$1,499</div>
                      <div className="text-sm text-muted-foreground">per year</div>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Special pricing for referred clients or those switching from another company.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>All Client Plan features</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>$500 annual savings</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Priority maintenance service</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>AI rent analysis (enhanced)</span>
                      </li>
                    </ul>
                    <div className="space-y-3">
                      <Link to="/contact?plan=referral">
                        <ZenoraButton className="w-full" variant="outline">
                          Referral Discount
                        </ZenoraButton>
                      </Link>
                      <Link to="/contact?plan=transfer">
                        <ZenoraButton className="w-full">
                          Transfer Discount
                        </ZenoraButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enterprise Plan */}
              <div className="bg-white dark:bg-zenora-dark rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                <div className="p-1 bg-gradient-to-r from-blue-500 to-teal-500">
                  <div className="bg-white dark:bg-zenora-dark p-6">
                    <h3 className="text-xl font-bold mb-2">Enterprise Plan</h3>
                    <div className="mt-4 mb-6">
                      <div className="text-4xl font-bold">Custom</div>
                      <div className="text-sm text-muted-foreground">pricing</div>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Tailored solutions for portfolio investors with 10+ properties.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>All Discount Plan features</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Volume discounting</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Dedicated account manager</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>AI rent analysis (premium)</span>
                      </li>
                    </ul>
                    <Link to="/contact?plan=enterprise">
                      <ZenoraButton className="w-full" size="lg">
                        Contact Us
                      </ZenoraButton>
                    </Link>
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
                Ready to Simplify Your Property Management?
              </h2>
              <p className="text-lg mb-8 text-white/80">
                Join property owners who trust Zenora Management to handle their investments with care and precision. Schedule a consultation today.
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

export default PropertyManagementDetail;
