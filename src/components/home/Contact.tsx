
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../contact/ContactForm';
import ContactInfo from '../contact/ContactInfo';
import SuccessMessage from '../contact/SuccessMessage';
import PricingCard from '../pricing/PricingCard';
import { pricingPlans } from '@/data/pricing-plans';

interface ContactProps {
  selectedPlan?: string | null;
}

const Contact = ({ selectedPlan }: ContactProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formPlan, setFormPlan] = useState(selectedPlan);

  const handlePlanSelect = (planId: string) => {
    setFormPlan(planId);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
      className="zenora-section bg-white dark:bg-zenora-dark relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-zenora-gradient opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-zenora-light opacity-5 blur-3xl rounded-full"></div>
      
      <div className="zenora-container relative z-10">
        <motion.div 
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-zenora-purple/30 bg-zenora-purple/5 px-3 py-1 text-sm text-zenora-purple backdrop-blur-sm mb-6">
            <span className="font-medium">Get Started</span>
          </div>
          
          <h2 className="zenora-heading bg-clip-text text-transparent bg-zenora-gradient">
            Choose Your Plan & Get In Touch
          </h2>
          
          <p className="zenora-subheading">
            Select the plan that fits your needs and fill out the form below to get started with Zenora's AI-powered property management.
          </p>
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <PricingCard 
                key={plan.id}
                {...plan}
                isSelected={formPlan === plan.id}
                onSelect={handlePlanSelect}
                showContactButton={false}
              />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={fadeIn} className="group">
            <ContactInfo selectedPlan={formPlan} />
          </motion.div>
          
          <motion.div variants={fadeIn} className="group">
            <div className="zenora-card h-full p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6">
                {formPlan ? "Complete Your Reservation" : "Get in Touch"}
              </h3>
              
              {isSubmitted ? (
                <SuccessMessage />
              ) : (
                <ContactForm
                  selectedPlan={formPlan}
                  onSubmitSuccess={() => setIsSubmitted(true)}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
