
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-zenora-gradient">
            Cookie Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to the owners of the site.
            </p>
            
            <h2>2. How We Use Cookies</h2>
            <p>
              Zenora Management uses cookies for a variety of purposes, including:
            </p>
            <ul>
              <li><strong>Essential cookies:</strong> These cookies are necessary for the website to function properly and cannot be switched off in our systems.</li>
              <li><strong>Performance cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
              <li><strong>Functional cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
              <li><strong>Targeting cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests.</li>
            </ul>
            
            <h2>3. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on.
            </p>
            
            <h2>4. Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
            </p>
            
            <h2>5. Cookie List</h2>
            <p>
              Below is a detailed list of the cookies we use on our website:
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-zenora-dark/10">
                  <th className="p-2 text-left">Cookie Name</th>
                  <th className="p-2 text-left">Purpose</th>
                  <th className="p-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">_zenora_session</td>
                  <td className="p-2">Used to maintain your session</td>
                  <td className="p-2">Session</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">_zenora_preferences</td>
                  <td className="p-2">Stores your preferences</td>
                  <td className="p-2">1 year</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">_zenora_analytics</td>
                  <td className="p-2">Analytics tracking</td>
                  <td className="p-2">2 years</td>
                </tr>
              </tbody>
            </table>
            
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <p>
              Email: privacy@zenoramanagement.com<br />
              Address: 123 AI Boulevard, Suite 456, San Francisco, CA 94103
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookies;
