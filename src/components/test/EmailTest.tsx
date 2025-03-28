
import React, { useState } from 'react';
import { ZenoraButton } from '@/components/ui/button-zenora';
import { sendContactEmail } from '@/utils/contact-email';
import { toast } from '@/hooks/use-toast';

const EmailTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSendTestEmail = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await sendContactEmail({
        name: "John Doe (Test)",
        email: "test@example.com",
        phone: "555-123-4567", // Added phone property
        subject: "Test Email",
        message: "This is a test email from the test environment.",
        isDemoRequest: true
      });
      
      setResult(response);
      
      if (response.success) {
        toast({
          title: "Email Sent",
          description: "Test email was sent successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to send test email",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Test email error:", error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error"
      });
      
      toast({
        title: "Error",
        description: `Failed to send test email: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-zenora-dark rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Email Testing Tool</h2>
      
      <div className="mb-6">
        <ZenoraButton 
          onClick={handleSendTestEmail}
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? "Sending..." : "Send Test Email"}
        </ZenoraButton>
      </div>
      
      {result && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Response:</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-8 border-t pt-4">
        <h3 className="font-semibold mb-2">Email Test Instructions:</h3>
        <p className="text-muted-foreground mb-4">
          This will send a test email to check if the email service is working properly.
          The test email will be sent to <code>test@example.com</code> but will not be delivered
          to a real inbox.
        </p>
        <p className="text-sm text-muted-foreground">
          For real email delivery testing, update the email address in the code.
        </p>
      </div>
    </div>
  );
};

export default EmailTest;
