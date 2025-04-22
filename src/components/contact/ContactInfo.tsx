
import React from 'react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { ZenoraButton } from '@/components/ui/button-zenora';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ContactInfoProps {
  selectedPlan?: string | null;
}

const ContactInfo = ({ selectedPlan }: ContactInfoProps) => {
  return (
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
          <div className="flex items-start gap-4 hover:translate-x-1 transition-transform">
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
          
          <div className="flex items-start gap-4 hover:translate-x-1 transition-transform">
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
          
          <div className="flex items-start gap-4 hover:translate-x-1 transition-transform">
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
        
        <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm transform transition-transform duration-300 hover:scale-105">
          <h4 className="font-medium mb-2">Schedule a Demo</h4>
          <p className="text-white/80 mb-4">
            See our AI-powered property management platform in action with a personalized demo.
          </p>
          <a href="https://calendly.com/zenoramgmt/30min" target="_blank" rel="noopener noreferrer">
            <ZenoraButton 
              variant="default" 
              size="lg" 
              className="w-full group bg-zenora-gradient hover:opacity-90"
            >
              <Calendar className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" /> Book a Demo
            </ZenoraButton>
          </a>
        </div>
        
        <div className="mt-12">
          <h4 className="font-medium mb-4">Meet Our Team</h4>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-14 w-14 border-2 border-white/50 transition-transform hover:scale-110">
                <AvatarImage src="/lovable-uploads/a0b42a29-69dc-4c13-b322-930e53867888.png" alt="Ansh Parikh" />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <p className="text-sm mt-2 text-white/80">Ansh Parikh</p>
              <a 
                href="https://www.linkedin.com/in/anshparikh01/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-white/70 hover:text-white mt-1"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="h-14 w-14 border-2 border-white/50 transition-transform hover:scale-110">
                <AvatarImage src="https://github.com/anvithv.png" alt="Anvith Vobbilisetty" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <p className="text-sm mt-2 text-white/80">Anvith Vobbilisetty</p>
              <a 
                href="https://www.linkedin.com/in/anvithv/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-white/70 hover:text-white mt-1"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
