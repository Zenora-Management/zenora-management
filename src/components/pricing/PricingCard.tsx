
import React from 'react';
import { Check } from 'lucide-react';
import { ZenoraButton } from "@/components/ui/button-zenora";
import { motion } from "framer-motion";

interface PricingCardProps {
  id?: string;
  planId?: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  gradient: string;
  emoji: string;
  isPopular?: boolean;
  isSelected?: boolean;
  onSelect?: (planId: string) => void;
  showContactButton?: boolean;
}

const PricingCard = ({
  id,
  planId,
  name,
  price,
  description,
  features,
  gradient,
  emoji,
  isPopular,
  isSelected,
  onSelect,
  showContactButton = true
}: PricingCardProps) => {
  // Use id if planId is not provided
  const actualPlanId = planId || id || "";
  
  const handleClick = () => {
    if (onSelect) {
      onSelect(actualPlanId);
    }
  };

  return (
    <motion.div 
      className="relative h-full rounded-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      whileHover={{ scale: 1.01 }}
      onClick={handleClick}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 z-10 px-4 py-1.5 bg-white text-zenora-purple text-sm font-semibold rounded-bl-lg shadow-md">
          Most Popular
        </div>
      )}

      <div className={`absolute inset-0 ${gradient} opacity-10 hover:opacity-15 transition-opacity duration-300`} />
      
      <div className="h-full bg-white dark:bg-zenora-dark rounded-xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg flex items-center justify-center ${gradient} shadow-md`}>
              <span className="text-white text-xl">{emoji}</span>
            </div>
            <h3 className="text-lg font-bold">{name}</h3>
          </div>
          
          {isSelected && (
            <div className="text-zenora-purple">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zenora-purple to-blue-500">
            {price}
          </div>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
        
        <div className="flex-grow">
          <ul className="space-y-2 mb-6">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-zenora-purple flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {showContactButton && (
          <div className="mt-auto pt-4">
            <ZenoraButton 
              variant={isSelected ? "default" : "outline"} 
              className="w-full"
              onClick={handleClick}
            >
              {isSelected ? 'Selected' : actualPlanId === 'enterprise' ? 'Contact Sales' : 'Get Started'}
            </ZenoraButton>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PricingCard;
