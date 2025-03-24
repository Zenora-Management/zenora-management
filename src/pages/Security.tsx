
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, Server, AlertTriangle } from "lucide-react";

const Security = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-zenora-gradient">
            Security
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">
              At Zenora Management, security is our top priority. We employ industry-leading practices to protect your data and ensure our platform remains secure.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-white dark:bg-zenora-dark/50 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-zenora-purple/10 rounded-lg mr-4">
                    <Shield className="h-6 w-6 text-zenora-purple" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">Data Protection</h2>
                </div>
                <ul className="mt-4">
                  <li>End-to-end encryption for all sensitive data</li>
                  <li>Secure data storage with regular backups</li>
                  <li>Strict access controls and authentication</li>
                  <li>Compliance with GDPR, CCPA, and other data protection regulations</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-zenora-purple/10 rounded-lg mr-4">
                    <Lock className="h-6 w-6 text-zenora-purple" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">Access Security</h2>
                </div>
                <ul className="mt-4">
                  <li>Multi-factor authentication options</li>
                  <li>Role-based access control</li>
                  <li>Account activity monitoring</li>
                  <li>Secure password policies</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-zenora-purple/10 rounded-lg mr-4">
                    <Server className="h-6 w-6 text-zenora-purple" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">Infrastructure</h2>
                </div>
                <ul className="mt-4">
                  <li>SOC 2 compliant cloud infrastructure</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Continuous monitoring for suspicious activities</li>
                  <li>Redundant systems to ensure reliability</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-zenora-dark/50 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-zenora-purple/10 rounded-lg mr-4">
                    <AlertTriangle className="h-6 w-6 text-zenora-purple" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">Incident Response</h2>
                </div>
                <ul className="mt-4">
                  <li>Dedicated security team available 24/7</li>
                  <li>Comprehensive incident response plan</li>
                  <li>Regular security drills and training</li>
                  <li>Transparent communication about security incidents</li>
                </ul>
              </div>
            </div>
            
            <h2>Security Certifications</h2>
            <p>
              Our platform has been independently validated to meet the highest security standards in the industry:
            </p>
            <ul>
              <li>SOC 2 Type II Certified</li>
              <li>ISO 27001 Certified</li>
              <li>GDPR Compliant</li>
              <li>CCPA Compliant</li>
            </ul>
            
            <h2>Security FAQs</h2>
            
            <h3>How is my data protected?</h3>
            <p>
              All data is encrypted in transit and at rest using industry-standard encryption protocols. We employ multiple layers of security controls to protect against unauthorized access, disclosure, alteration, and destruction of data.
            </p>
            
            <h3>Do you share my data with third parties?</h3>
            <p>
              We only share your data with third parties as described in our Privacy Policy and as necessary to provide our services. We ensure all third-party vendors maintain appropriate security measures.
            </p>
            
            <h3>How can I report a security concern?</h3>
            <p>
              If you discover a potential security issue, please contact our security team immediately at security@zenoramanagement.com. We have a responsible disclosure program and appreciate your help in keeping our platform secure.
            </p>
            
            <div className="bg-zenora-gradient p-1 rounded-xl mt-10">
              <div className="bg-white dark:bg-zenora-dark rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2">Have a Security Question?</h2>
                <p className="text-muted-foreground mb-4">
                  Our dedicated security team is ready to answer any questions about how we protect your data.
                </p>
                <div className="flex items-center space-x-2">
                  <a href="mailto:security@zenoramanagement.com" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zenora-gradient text-white hover:opacity-90 h-10 px-4 py-2">
                    Contact Security Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Security;
