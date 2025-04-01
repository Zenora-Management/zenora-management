
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ZenoraButton } from '@/components/ui/button-zenora';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="zenora-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include our core features with no hidden fees.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            {/* Plan 1 */}
            <div className="relative bg-white dark:bg-zenora-dark/50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Client Plan</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$1,999</span>
                  <span className="text-muted-foreground">/year</span>
                  <p className="text-sm text-muted-foreground">$166/month billed annually</p>
                </div>
                <p className="text-muted-foreground mb-6">Base plan for single property owners</p>
                <ul className="space-y-3 mb-6">
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
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Regular inspections</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Standard support</span>
                  </li>
                </ul>
                <Link to="/signup?plan=client">
                  <ZenoraButton variant="outline" className="w-full">
                    Get Started
                  </ZenoraButton>
                </Link>
              </div>
            </div>
            
            {/* Plan 2 */}
            <div className="relative bg-white dark:bg-zenora-dark/50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Referral Discount</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$1,499</span>
                  <span className="text-muted-foreground">/year</span>
                  <p className="text-sm text-muted-foreground">$125/month billed annually</p>
                </div>
                <p className="text-muted-foreground mb-6">Special pricing for referred clients</p>
                <ul className="space-y-3 mb-6">
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
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Quarterly performance reviews</span>
                  </li>
                </ul>
                <Link to="/signup?plan=referral">
                  <ZenoraButton variant="outline" className="w-full">
                    Get Started
                  </ZenoraButton>
                </Link>
              </div>
            </div>
            
            {/* Plan 3 - Most Popular */}
            <div className="relative bg-white dark:bg-zenora-dark/50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-zenora-purple">
              <div className="absolute top-0 right-0 bg-zenora-purple text-white py-1 px-4 text-sm font-semibold">
                Most Popular
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">ZenPlatinum</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$1,999</span>
                  <span className="text-muted-foreground">/year</span>
                  <p className="text-sm text-muted-foreground">$166/month billed annually</p>
                </div>
                <p className="text-muted-foreground mb-6">Comprehensive management solution</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>AI powered rent analysis & Zenora Report</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Professional photography</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>End to end document service</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Live rental showings</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Marketing on 5+ platforms</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Sign on property</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Tenant management (24hr)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Tenant application management</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Lockbox on property</span>
                  </li>
                </ul>
                <Link to="/signup?plan=zenplatinum">
                  <ZenoraButton className="w-full">
                    Get Started
                  </ZenoraButton>
                </Link>
              </div>
            </div>
            
            {/* Plan 4 */}
            <div className="relative bg-white dark:bg-zenora-dark/50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Transfer Discount</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$1,499</span>
                  <span className="text-muted-foreground">/year</span>
                  <p className="text-sm text-muted-foreground">$125/month billed annually</p>
                </div>
                <p className="text-muted-foreground mb-6">For clients switching from another company</p>
                <ul className="space-y-3 mb-6">
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
                    <span>Free data migration</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>AI rent analysis (enhanced)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Personalized transition plan</span>
                  </li>
                </ul>
                <Link to="/signup?plan=transfer">
                  <ZenoraButton variant="outline" className="w-full">
                    Get Started
                  </ZenoraButton>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-zenora-gradient text-white rounded-xl p-8 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
            <p className="mb-6">Contact our sales team for enterprise pricing or custom requirements.</p>
            <Link to="/contact">
              <ZenoraButton variant="inverted">
                Contact Sales
              </ZenoraButton>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
