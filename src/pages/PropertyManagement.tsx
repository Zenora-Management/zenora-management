import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ZenoraButton } from '@/components/ui/button-zenora';
import { Check, Sparkles, Star, Zap, Building, Database, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const PropertyManagement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 dark:from-zenora-dark dark:to-black py-20">
          <div className="zenora-container">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
                Property Management Made Simple
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Our AI-powered platform helps you manage your properties efficiently, 
                save time, and maximize returns with intelligent insights.
              </p>
              <ZenoraButton 
                as={Link} 
                to="/signup" 
                size="lg"
              >
                Start Free Trial
              </ZenoraButton>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20">
          <div className="zenora-container">
            <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Manage Your Properties</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Rent Analysis",
                  description: "Get data-driven insights on optimal rental prices for your properties based on market trends and comparable listings.",
                  icon: "📊"
                },
                {
                  title: "Tenant Screening",
                  description: "Automated background checks, credit reports, and rental history verification to find reliable tenants.",
                  icon: "🔍"
                },
                {
                  title: "Maintenance Tracking",
                  description: "Schedule and track maintenance requests, assign contractors, and keep tenants updated on progress.",
                  icon: "🔧"
                },
                {
                  title: "Financial Reporting",
                  description: "Track income, expenses, and generate professional reports for tax purposes with minimal effort.",
                  icon: "💰"
                },
                {
                  title: "Smart Notifications",
                  description: "Get timely alerts for lease renewals, rent collections, and scheduled maintenance tasks.",
                  icon: "🔔"
                },
                {
                  title: "Document Management",
                  description: "Store and manage all property-related documents securely in one centralized location.",
                  icon: "📄"
                }
              ].map((feature, index) => (
                <div key={index} className="zenora-card p-6 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-20 bg-gray-50 dark:bg-zenora-dark/30">
          <div className="zenora-container">
            <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-4">
              Choose the plan that fits your needs. All plans include our core features with no hidden fees.
            </p>
            <p className="text-center font-semibold text-zenora-purple mb-16">Billed annually</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  id: "client",
                  name: "Client Plan",
                  price: "$1,999",
                  pricePerMonth: "$166",
                  description: "Base plan for single property owners",
                  features: [
                    "Full property management",
                    "Tenant screening & placement",
                    "Maintenance coordination",
                    "AI rent analysis (basic)",
                    "Regular inspections",
                    "Standard support"
                  ],
                  button: "Get Started",
                  popular: false,
                  icon: <Building className="h-6 w-6 text-white" />,
                  gradient: "from-purple-500 to-indigo-600"
                },
                {
                  id: "referral",
                  name: "Referral Discount",
                  price: "$1,499",
                  pricePerMonth: "$125",
                  description: "Special pricing for referred clients",
                  features: [
                    "All Client Plan features",
                    "$500 annual savings",
                    "Priority maintenance service",
                    "AI rent analysis (enhanced)",
                    "Priority support",
                    "Quarterly performance reviews"
                  ],
                  button: "Get Started",
                  popular: true,
                  icon: <Sparkles className="h-6 w-6 text-white" />,
                  gradient: "from-amber-400 to-pink-500"
                },
                {
                  id: "transfer",
                  name: "Transfer Discount",
                  price: "$1,499",
                  pricePerMonth: "$125",
                  description: "For clients switching from another company",
                  features: [
                    "All Client Plan features",
                    "$500 annual savings",
                    "Free data migration",
                    "AI rent analysis (enhanced)",
                    "Priority support",
                    "Personalized transition plan"
                  ],
                  button: "Get Started",
                  popular: false,
                  icon: <Zap className="h-6 w-6 text-white" />,
                  gradient: "from-blue-400 to-teal-500"
                },
                {
                  id: "enterprise",
                  name: "Enterprise Plan",
                  price: "Custom",
                  pricePerMonth: "Custom",
                  description: "For portfolio investors with 10+ properties",
                  features: [
                    "All Discount Plan features",
                    "Volume discounting",
                    "Dedicated account manager",
                    "AI rent analysis (premium)",
                    "Custom reporting",
                    "API access"
                  ],
                  button: "Contact Sales",
                  popular: false,
                  icon: <Database className="h-6 w-6 text-white" />,
                  gradient: "from-green-400 to-blue-500"
                }
              ].map((plan) => (
                <div 
                  key={plan.id} 
                  className="h-full rounded-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-zenora-purple text-white py-2 px-4 text-sm font-medium rounded-bl-xl z-10">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="h-full bg-white dark:bg-zenora-dark rounded-xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10 hover:opacity-15 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg flex items-center justify-center bg-gradient-to-br ${plan.gradient} shadow-md`}>
                          {plan.icon}
                        </div>
                        <h3 className="text-lg font-bold">{plan.name}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zenora-purple to-blue-500">{plan.price}</div>
                        <p className="text-sm text-muted-foreground mt-1">Just {plan.pricePerMonth}/mo, billed annually</p>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{plan.description}</p>
                      
                      <ul className="space-y-2 mb-8 flex-grow">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Shield className={`h-4 w-4 text-${plan.gradient.split('-')[1]}-500 flex-shrink-0 mt-0.5`} />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-auto pt-4">
                        <ZenoraButton 
                          className="w-full h-10"
                          variant={plan.popular ? "default" : "outline"}
                          as={Link}
                          to={`/contact?plan=${plan.id}`}
                        >
                          {plan.button}
                        </ZenoraButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20">
          <div className="zenora-container">
            <h2 className="text-3xl font-bold text-center mb-16">What Our Customers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Zenora has completely transformed how I manage my rental properties. The AI rent analysis alone has increased my revenue by 15%.",
                  name: "Sarah J.",
                  role: "Property Owner, 12 units"
                },
                {
                  quote: "The tenant screening feature has saved me from at least two potentially problematic tenants. Worth every penny for the peace of mind.",
                  name: "Michael T.",
                  role: "Landlord, 8 units"
                },
                {
                  quote: "As a property management company, we've tried many solutions, but Zenora offers the best combination of powerful features and ease of use.",
                  name: "Rebecca L.",
                  role: "CEO, Urban Property Management"
                }
              ].map((testimonial, index) => (
                <div key={index} className="zenora-card p-6">
                  <div className="mb-4 text-zenora-purple">
                    {"★".repeat(5)}
                  </div>
                  <p className="mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-zenora-gradient text-white">
          <div className="zenora-container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Streamline Your Property Management?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Join thousands of property owners who are saving time and increasing profits with Zenora's AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <ZenoraButton 
                variant="inverted"
                size="lg"
                as={Link}
                to="/signup"
              >
                Start Your Free Trial
              </ZenoraButton>
              <ZenoraButton 
                variant="outline" 
                size="lg"
                as={Link}
                to="/contact?plan=demo"
                className="border-white text-white hover:bg-white hover:text-zenora-purple"
              >
                Schedule a Demo
              </ZenoraButton>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyManagement;
