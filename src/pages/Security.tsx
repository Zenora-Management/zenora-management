
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, UserCheck, Server, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";

const Security = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="zenora-section bg-white dark:bg-zenora-dark relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-zenora-light opacity-5 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-zenora-purple opacity-5 blur-3xl rounded-full"></div>
          
          <div className="zenora-container relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
                <span className="font-medium">Security</span>
              </div>
              
              <h1 className="zenora-heading bg-clip-text text-transparent bg-zenora-gradient mb-6">
                Your Data Security is Our Priority
              </h1>
              
              <p className="zenora-subheading mb-8">
                We implement industry-leading security measures to ensure your property data and personal information remain protected at all times.
              </p>
            </div>
          </div>
        </section>

        {/* Security Measures */}
        <section className="zenora-section bg-gray-50 dark:bg-zenora-dark/50">
          <div className="zenora-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-8">How We Protect Your Data</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 p-3 bg-zenora-purple/10 text-zenora-purple rounded-lg h-fit">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
                      <p className="text-muted-foreground">
                        All data transmitted between your devices and our servers is encrypted using industry-standard encryption protocols.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 p-3 bg-zenora-purple/10 text-zenora-purple rounded-lg h-fit">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
                      <p className="text-muted-foreground">
                        Multi-factor authentication and secure login processes protect your account from unauthorized access.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 p-3 bg-zenora-purple/10 text-zenora-purple rounded-lg h-fit">
                      <Server className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Secure Cloud Infrastructure</h3>
                      <p className="text-muted-foreground">
                        Your data is stored on secure cloud servers with regular security audits and monitoring.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 p-3 bg-zenora-purple/10 text-zenora-purple rounded-lg h-fit">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Regular Compliance Audits</h3>
                      <p className="text-muted-foreground">
                        We regularly audit our systems and processes to ensure compliance with data protection regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="p-8 rounded-2xl bg-white dark:bg-zenora-dark shadow-xl max-w-md animate-pulse-glow">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-zenora-purple/10 rounded-full">
                      <Shield className="w-16 h-16 text-zenora-purple" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-center mb-4">Enterprise-Grade Security</h3>
                  <p className="text-center text-muted-foreground mb-6">
                    We employ the same level of security measures used by enterprise organizations to protect sensitive financial and personal data.
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1 rounded-full mr-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">Regular security patches and updates</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1 rounded-full mr-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">Continuous vulnerability testing</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1 rounded-full mr-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">Data access controls and logging</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1 rounded-full mr-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">Secure backup and recovery systems</span>
                    </li>
                  </ul>
                  
                  <Link to="/privacy">
                    <ZenoraButton variant="outline" className="w-full">
                      View Our Privacy Policy
                    </ZenoraButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Security;
