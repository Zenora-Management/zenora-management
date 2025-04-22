
import React from 'react';
import { motion } from 'framer-motion';

const SuccessMessage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-8">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 text-green-600"
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      <motion.h4 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold mb-2"
      >
        Message Sent!
      </motion.h4>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground text-center max-w-md"
      >
        Thank you for reaching out. Our team will get back to you within 24 hours.
      </motion.p>
    </div>
  );
};

export default SuccessMessage;
