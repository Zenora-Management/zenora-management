
import React, { useState } from 'react';
import { ZenoraButton } from '@/components/ui/button-zenora';
import { Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { sendContactEmail } from '@/utils/contact-email';

interface ContactFormProps {
  selectedPlan?: string | null;
  onSubmitSuccess: () => void;
}

const ContactForm = ({ selectedPlan, onSubmitSuccess }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: selectedPlan ? `Inquiry about ${selectedPlan}` : "",
    message: "",
    plan: selectedPlan || ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await sendContactEmail({
        ...formData,
        isDemoRequest: formData.subject.toLowerCase().includes('demo')
      });
      
      if (!response.success) {
        throw new Error(response.message);
      }
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      onSubmitSuccess();
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        plan: ""
      });
    } catch (error) {
      console.error("Error sending message:", error);
      
      let errorMessage = "There was a problem sending your message. ";
      if (error.message.includes("database")) {
        errorMessage += "We couldn't save your message. ";
      } else if (error.message.includes("Gmail") || error.message.includes("email")) {
        errorMessage += "We couldn't send the email notification. ";
      }
      errorMessage += "Please try again or contact us directly at zenoramgmt@gmail.com";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="group">
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
            className="zenora-input w-full transition-all border-gray-300 focus:border-zenora-purple focus:ring focus:ring-zenora-purple/20 group-hover:border-zenora-purple/50"
            placeholder="John Doe"
          />
        </div>
        <div className="group">
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
            className="zenora-input w-full transition-all border-gray-300 focus:border-zenora-purple focus:ring focus:ring-zenora-purple/20 group-hover:border-zenora-purple/50"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="group">
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          className="zenora-input w-full transition-all border-gray-300 focus:border-zenora-purple focus:ring focus:ring-zenora-purple/20 group-hover:border-zenora-purple/50"
          placeholder="(123) 456-7890"
        />
      </div>
      
      <div className="group">
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="zenora-input w-full transition-all border-gray-300 focus:border-zenora-purple focus:ring focus:ring-zenora-purple/20 group-hover:border-zenora-purple/50"
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
      
      <div className="group">
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
          className="zenora-input min-h-[120px] transition-all border-gray-300 focus:border-zenora-purple focus:ring focus:ring-zenora-purple/20 group-hover:border-zenora-purple/50"
          placeholder={formData.plan ? "Please tell us more about your property management needs..." : "How can we help you?"}
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
            <Send className="mr-2 h-4 w-4" /> 
            {formData.plan ? "Complete Reservation" : "Send Message"}
          </>
        )}
      </ZenoraButton>
    </form>
  );
};

export default ContactForm;
