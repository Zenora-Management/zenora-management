
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";

const Careers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-zenora-gradient">
            Careers at Zenora
          </h1>
          
          <div className="mb-12">
            <p className="text-xl text-muted-foreground max-w-3xl">
              Join our team of innovators who are revolutionizing property management with AI technology. 
              We're always looking for talented individuals who are passionate about creating the future of real estate.
            </p>
          </div>
          
          <div className="bg-white dark:bg-zenora-dark/50 p-8 rounded-xl shadow-md mb-12">
            <h2 className="text-2xl font-bold mb-6">Why Work at Zenora?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-3 text-zenora-purple">Innovative Technology</h3>
                <p className="text-muted-foreground">
                  Work on cutting-edge AI technology that's transforming an entire industry.
                </p>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-3 text-zenora-purple">Growth Opportunities</h3>
                <p className="text-muted-foreground">
                  Join a fast-growing company with abundant opportunities for career advancement.
                </p>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-3 text-zenora-purple">Work-Life Balance</h3>
                <p className="text-muted-foreground">
                  We promote a healthy balance with flexible work arrangements and generous time off.
                </p>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-3 text-zenora-purple">Comprehensive Benefits</h3>
                <p className="text-muted-foreground">
                  Enjoy competitive compensation, health benefits, and retirement plans.
                </p>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-3 text-zenora-purple">Diverse & Inclusive</h3>
                <p className="text-muted-foreground">
                  We're committed to building a diverse team and an inclusive workplace culture.
                </p>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-3 text-zenora-purple">Make an Impact</h3>
                <p className="text-muted-foreground">
                  Your work will directly impact thousands of property owners and millions of tenants.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-white dark:bg-zenora-dark/50 p-6 rounded-xl shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Senior AI Engineer</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-zenora-purple/10 text-zenora-purple">Full-time</span>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-zenora-purple/10 text-zenora-purple">Remote</span>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-zenora-purple/10 text-zenora-purple">Engineering</span>
                  </div>
                  <p className="text-muted-foreground">
                    Lead the development of our AI property management algorithms and work on cutting-edge machine learning solutions.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <ZenoraButton variant="outline">Apply Now</ZenoraButton>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zenora-dark/50 p-6 rounded-xl shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Product Manager</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-zenora-purple/10 text-zenora-purple">Full-time</span>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-zenora-purple/10 text-zenora-purple">San Francisco</span>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-zenora-purple/10 text-zenora-purple">Product</span>
                  </div>
                  <p className="text-muted-foreground">
                    Shape the future of our AI property management platform and drive product innovation.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <ZenoraButton variant="outline">Apply Now</ZenoraButton>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zenora-dark/50 p-6 rounded-xl shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">UX/UI Designer</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-zenora-purple/10 text-zenora-purple">Full-time</span>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-zenora-purple/10 text-zenora-purple">Remote</span>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-zenora-purple/10 text-zenora-purple">Design</span>
                  </div>
                  <p className="text-muted-foreground">
                    Create intuitive and beautiful experiences for property managers and tenants using our platform.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <ZenoraButton variant="outline">Apply Now</ZenoraButton>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zenora-gradient p-1 rounded-xl">
            <div className="bg-white dark:bg-zenora-dark rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Don't see the right position?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                We're always interested in talking with talented individuals who are passionate about 
                revolutionizing property management with AI technology.
              </p>
              <ZenoraButton>
                Send an Open Application
              </ZenoraButton>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
