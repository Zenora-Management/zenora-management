
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-zenora-gradient">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using Zenora Management's platform and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
              If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
            
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials and services on Zenora Management's platform for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose;</li>
              <li>Attempt to decompile or reverse engineer any software contained on Zenora Management's platform;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            
            <h2>3. AI-Powered Services</h2>
            <p>
              Zenora Management provides AI-powered property management services. While we strive for accuracy, our AI systems have limitations:
            </p>
            <ul>
              <li>AI-generated recommendations are not substitutes for professional judgment.</li>
              <li>We do not guarantee the accuracy, completeness, or reliability of AI-generated content.</li>
              <li>You are responsible for reviewing AI-generated content before making business decisions.</li>
            </ul>
            
            <h2>4. User Accounts</h2>
            <p>
              When you create an account with us, you guarantee that the information you provide is accurate, complete, and current. 
              Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on our service.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. 
              You agree to accept responsibility for all activities that occur under your account or password.
            </p>
            
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall Zenora Management, its officers, directors, and employees be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Zenora Management's platform, even if Zenora Management or a Zenora Management authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: legal@zenoramanagement.com<br />
              Address: 123 AI Boulevard, Suite 456, San Francisco, CA 94103
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
