
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { FileText, CloudUpload, BookText } from "lucide-react";
import { Link } from "react-router-dom";

const DocumentManagement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="zenora-container">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-zenora-purple/10 rounded-full flex items-center justify-center shadow-sm">
                <BookText className="h-12 w-12 text-zenora-purple" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-zenora-gradient">
              Document Understanding &amp; Storage
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Effortlessly handle, organize, and access all your property documents in one secure, centralized location.
              Powered by Zenora Management's <strong>AI Comprehensive Reader</strong>, our system not only stores your documents
              but also understands and extracts key insights, helping you stay organized and informed.
            </p>
          </div>

          {/* Key Features Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start">
                  <CloudUpload className="h-7 w-7 text-zenora-purple mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Document Upload and Management</h3>
                    <p className="text-muted-foreground">
                      Upload leases, agreements, financial reports, and more directly into your Zenora dashboard.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FileText className="h-7 w-7 text-zenora-purple mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Centralized Property Information Storage</h3>
                    <p className="text-muted-foreground">
                      Keep all important property-related documents securely in one place for easy access and organization.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <BookText className="h-7 w-7 text-zenora-purple mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">AI Comprehensive Reader</h3>
                    <p className="text-muted-foreground">
                      Automatically read and analyze your documents to provide summaries, key highlights, and relevant insights &mdash; saving time and reducing manual work.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CloudUpload className="h-7 w-7 text-zenora-purple mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Secure File Access and Retrieval</h3>
                    <p className="text-muted-foreground">
                      Retrieve your documents anytime with secure access, ensuring peace of mind and compliance.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <ZenoraButton size="lg">Contact Us</ZenoraButton>
                </Link>
                <Link to="/features">
                  <ZenoraButton size="lg" variant="outline">Learn More</ZenoraButton>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center items-center">
              {/* Optional: Use a Lucide icon or illustration */}
              <div className="bg-zenora-gradient p-1 rounded-xl">
                <div className="bg-white dark:bg-zenora-dark rounded-lg p-6 h-full flex items-center justify-center shadow-lg">
                  <FileText className="h-28 w-28 text-zenora-purple" />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-white dark:bg-zenora-dark/50 rounded-xl shadow-md p-8 mb-20">
            <div className="max-w-2xl mx-auto text-center">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="quote-left"
                className="w-8 h-8 mx-auto mb-3 text-zenora-purple/60"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M464 32H336c-26.5 0-48 21.5-48 48v112c0 26.5 21.5 48 48 48h40.7c-7.6 72-71.2 128-144.7 128-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24 132.6 0 240-107.4 240-240V80c0-26.5-21.5-48-48-48zm-352 0C85.5 32 64 53.5 64 80v112c0 26.5 21.5 48 48 48h40.7C145.1 304 81.5 360 8 360c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24 132.6 0 240-107.4 240-240V80c0-26.5-21.5-48-48-48z"/>
              </svg>
              <blockquote className="italic text-lg text-zenora-purple mb-2">
                "Zenora's document management has streamlined how I handle my rental paperwork — no more lost files or missed details."
              </blockquote>
              <div className="text-muted-foreground text-sm">— Satisfied Zenora Client</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DocumentManagement;
