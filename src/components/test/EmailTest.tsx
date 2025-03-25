
import { useState } from "react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { sendContactEmail } from "@/utils/contact-email";
import { toast } from "@/hooks/use-toast";

const EmailTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [directTestResults, setDirectTestResults] = useState<any>(null);

  // Test the email sending through our utility function
  const testEmailUtility = async () => {
    setIsLoading(true);
    try {
      // Create test data
      const testData = {
        name: "Test User",
        email: "test@example.com",
        subject: "Utility Test",
        message: "This is a test message from the EmailTest component using the utility.",
        isDemoRequest: false
      };
      
      console.log("Starting email utility test with data:", testData);
      
      // Call the utility function
      const result = await sendContactEmail(testData);
      
      console.log("Email utility test result:", result);
      setTestResults(result);
      
      toast({
        title: result.success ? "Test Successful" : "Test Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error in email utility test:", error);
      setTestResults({ success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` });
      
      toast({
        title: "Test Error",
        description: `An error occurred during testing: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Test the email function directly
  const testEmailFunction = async () => {
    setIsLoading(true);
    try {
      // Call the test function
      const functionUrl = "https://hmmmztyrqhxjovingweq.supabase.co/functions/v1/test-email-function";
      
      console.log("Calling test function at:", functionUrl);
      
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      
      console.log("Test function status:", response.status);
      
      // Handle the response
      if (!response.ok) {
        throw new Error(`Test function returned status ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Direct test result:", data);
      setDirectTestResults(data);
      
      toast({
        title: data.success ? "Direct Test Successful" : "Direct Test Failed",
        description: data.message,
        variant: data.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error in direct function test:", error);
      setDirectTestResults({ success: false, error: `${error instanceof Error ? error.message : 'Unknown error'}` });
      
      toast({
        title: "Direct Test Error",
        description: `An error occurred during direct testing: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Email Functionality Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Email Utility</h2>
          <p className="mb-4 text-muted-foreground">
            This test uses the sendContactEmail utility that's used by the contact form.
          </p>
          <ZenoraButton 
            onClick={testEmailUtility}
            disabled={isLoading}
            animation="glow"
          >
            {isLoading ? "Testing..." : "Run Utility Test"}
          </ZenoraButton>
          
          {testResults && (
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
              <h3 className="font-medium mb-2">Test Results:</h3>
              <pre className="text-sm overflow-auto p-2 bg-slate-100 dark:bg-slate-900 rounded">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Email Function Directly</h2>
          <p className="mb-4 text-muted-foreground">
            This test calls the test-email-function endpoint which tests the send-contact-email function.
          </p>
          <ZenoraButton 
            onClick={testEmailFunction}
            disabled={isLoading}
            animation="glow"
          >
            {isLoading ? "Testing..." : "Run Direct Test"}
          </ZenoraButton>
          
          {directTestResults && (
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
              <h3 className="font-medium mb-2">Direct Test Results:</h3>
              <pre className="text-sm overflow-auto p-2 bg-slate-100 dark:bg-slate-900 rounded">
                {JSON.stringify(directTestResults, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Debugging Information</h2>
        <p className="mb-2">
          Check the browser console for detailed logging information.
        </p>
        <p className="text-muted-foreground text-sm">
          All tests log detailed information to help identify any issues with the email functionality.
        </p>
      </div>
    </div>
  );
};

export default EmailTest;
