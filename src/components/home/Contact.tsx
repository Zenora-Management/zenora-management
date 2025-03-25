
import { useState, useEffect } from "react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Mail, Phone, MapPin, Send, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ContactProps {
  selectedPlan?: string | null;
}

const Contact = ({ selectedPlan }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Set the subject based on the selected plan
  useEffect(() => {
    if (selectedPlan) {
      let planName = "";
      switch (selectedPlan) {
        case "client":
          planName = "Client Plan";
          break;
        case "referral":
          planName = "Referral Discount Plan";
          break;
        case "transfer":
          planName = "Transfer Discount Plan";
          break;
        case "enterprise":
          planName = "Enterprise Plan";
          break;
        case "demo":
          planName = "Demo Request";
          break;
        default:
          planName = selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1);
      }
      
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry about ${planName}`
      }));
      
      // Show a toast notification
      toast({
        title: selectedPlan === "demo" ? "Demo Requested" : "Plan Selected",
        description: selectedPlan === "demo" 
          ? "You've requested a demo. Please complete the form to schedule." 
          : `You've selected the ${planName}. Please complete the form to proceed.`,
        variant: "default",
      });
    }
  }, [selectedPlan]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send the form data to Supabase
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      ]);
      
      if (error) throw error;
      
      // Show success message
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after some time
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="zenora-section bg-white dark:bg-zenora-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-zenora-gradient opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-zenora-light opacity-5 blur-3xl rounded-full"></div>
      
      <div className="zenora-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
            <span className="font-medium">Get In Touch</span>
          </div>
          
          <h2 className="zenora-heading bg-clip-text text-transparent bg-zenora-gradient">
            {selectedPlan ? "Complete Your Reservation" : "Contact Our Team"}
          </h2>
          
          <p className="zenora-subheading">
            {selectedPlan 
              ? "We're excited to help you get started with your selected plan. Please fill out the form below to complete your reservation."
              : "Have questions about our services or ready to get started? Our team is here to help you transform your property management experience."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-in">
            <div className="bg-zenora-gradient rounded-2xl p-8 text-white h-full relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-zenora-dark to-zenora-purple mix-blend-overlay opacity-70"></div>
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-white opacity-10 rounded-full"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="mb-8 text-white/80">
                  Fill out the form or contact us directly using the information below.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+15107704237" className="text-white/80 hover:text-white transition-colors">
                        (510) 770-4237
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:zenoramgmt@gmail.com" className="text-white/80 hover:text-white transition-colors">
                        zenoramgmt@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-white/80">
                        1121 Tewa Ct.<br />
                        Fremont, CA 94539
                      </p>
                    </div>
                  </div>
                </div>
                
                {selectedPlan && selectedPlan !== "demo" && (
                  <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
                    <h4 className="font-medium mb-2">Selected Plan Information</h4>
                    <div>
                      {selectedPlan === "client" && (
                        <div>
                          <p className="font-semibold">Client Plan</p>
                          <p className="text-white/80">$1,999/year - Base plan for single property owners</p>
                        </div>
                      )}
                      {selectedPlan === "referral" && (
                        <div>
                          <p className="font-semibold">Referral Discount Plan</p>
                          <p className="text-white/80">$1,499/year - $500 discount for referred clients</p>
                        </div>
                      )}
                      {selectedPlan === "transfer" && (
                        <div>
                          <p className="font-semibold">Transfer Discount Plan</p>
                          <p className="text-white/80">$1,499/year - $500 discount for clients switching from another management company</p>
                        </div>
                      )}
                      {selectedPlan === "enterprise" && (
                        <div>
                          <p className="font-semibold">Enterprise Plan</p>
                          <p className="text-white/80">Custom pricing for portfolio investors with 10+ properties</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
                  <h4 className="font-medium mb-2">Schedule a Demo</h4>
                  <p className="text-white/80 mb-4">
                    See our AI-powered property management platform in action with a personalized demo.
                  </p>
                  <Link to="/contact?subject=demo">
                    <ZenoraButton 
                      variant="glass" 
                      size="lg" 
                      className="w-full"
                    >
                      <Calendar className="mr-2 h-4 w-4" /> Book a Demo
                    </ZenoraButton>
                  </Link>
                </div>
                
                <div className="mt-12">
                  <h4 className="font-medium mb-4">Connect With Us</h4>
                  <div className="flex gap-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" aria-label="Facebook">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" aria-label="Instagram">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" aria-label="Twitter">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.94 5a2 2 0 11-4-.002 2 2 0 014 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="animate-slide-up">
            <div className="zenora-card h-full p-8">
              <h3 className="text-2xl font-bold mb-6">
                {selectedPlan ? "Complete Your Reservation" : "Send Us a Message"}
              </h3>
              
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center py-8">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 text-green-600">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground text-center max-w-md">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="zenora-input"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="zenora-input"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="zenora-input"
                    >
                      <option value="">Select a topic</option>
                      <option value="Pricing Information">Pricing Information</option>
                      <option value="Feature Inquiry">Feature Inquiry</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Request a Demo">Request a Demo</option>
                      <option value="Inquiry about Client Plan">Inquiry about Client Plan</option>
                      <option value="Inquiry about Referral Discount Plan">Inquiry about Referral Discount Plan</option>
                      <option value="Inquiry about Transfer Discount Plan">Inquiry about Transfer Discount Plan</option>
                      <option value="Inquiry about Enterprise Plan">Inquiry about Enterprise Plan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="zenora-input min-h-[120px]"
                      placeholder={selectedPlan ? "Please tell us more about your property management needs..." : "How can we help you?"}
                    ></textarea>
                  </div>
                  
                  <ZenoraButton 
                    type="submit" 
                    size="lg" 
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> {selectedPlan ? "Complete Reservation" : "Send Message"}
                      </>
                    )}
                  </ZenoraButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
