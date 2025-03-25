
import * as z from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Eye, EyeOff, Phone, MapPin, User, Mail, Lock, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface AuthFormProps {
  mode: "login" | "signup";
  userType?: "regular" | "admin";
}

// Admin credentials
const ADMIN_EMAIL = "zenoramgmt@gmail.com";
const ADMIN_PASSWORD = "Zenora101!";

// Define the login schema with only email, password and optional companyCode
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  companyCode: z.string().optional(),
});

// Define the signup schema with all fields including fullName, phone, and property address
const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  propertyAddress: z.string().min(5, { message: "Please enter a valid property address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Define the verification schema for the second step
const verificationSchema = z.object({
  verificationCode: z.string().length(6, { message: "Verification code must be 6 digits" }),
});

// Define types based on the schemas
type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type VerificationFormValues = z.infer<typeof verificationSchema>;

const AuthForm = ({ mode, userType }: AuthFormProps) => {
  const { signIn, signUp, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [autoFilledAdmin, setAutoFilledAdmin] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [tempUserData, setTempUserData] = useState<SignupFormValues | null>(null);
  const [expectedCode, setExpectedCode] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Use the appropriate schema and initial values based on the mode
  const isSignup = mode === "signup";
  
  // Define login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: userType === "admin" ? ADMIN_EMAIL : "",
      password: userType === "admin" ? ADMIN_PASSWORD : "",
      companyCode: "",
    }
  });

  // Define signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      propertyAddress: "",
      password: "",
      confirmPassword: "",
    }
  });
  
  // Define verification form - separately to avoid type conflicts
  const verificationForm = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: "",
    }
  });
  
  // Reset form submission state when mode changes
  useEffect(() => {
    setFormSubmitting(false);
    setVerificationStep(false);
    setVerificationSent(false);
  }, [mode, userType]);
  
  // Auto-fill admin credentials if userType is admin
  useEffect(() => {
    if (userType === "admin" && !autoFilledAdmin && !isSignup) {
      loginForm.setValue("email", ADMIN_EMAIL);
      loginForm.setValue("password", ADMIN_PASSWORD);
      setAutoFilledAdmin(true);
    }
  }, [userType, loginForm, autoFilledAdmin, isSignup]);
  
  // Derived loading state to prevent multiple submissions
  const isSubmitting = formSubmitting || authLoading;

  // Function to handle sending verification code
  const handleSendVerificationCode = async (phoneNumber: string) => {
    try {
      setFormSubmitting(true);
      
      console.log("Sending verification code to:", phoneNumber);
      
      // Call our Supabase edge function to send the verification code
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://hmmmztyrqhxjovingweq.supabase.co";
      const response = await fetch(
        `${supabaseUrl}/functions/v1/send-verification-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber,
            type: "phone_verification"
          }),
        }
      );
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error("Error sending verification code:", result);
        throw new Error(result.error || "Failed to send verification code");
      }
      
      console.log("Verification code sent response:", result);
      
      // Store the verification code during development
      if (result.code) {
        setExpectedCode(result.code);
        console.log("Development verification code:", result.code);
      }
      
      setVerificationSent(true);
      
      toast({
        title: "Verification code sent",
        description: "Please check your phone for the 6-digit code",
      });
      
      return true;
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast({
        title: "Failed to send verification code",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setFormSubmitting(false);
    }
  };

  // Function to verify address using Google Maps API
  // Note: In a real implementation, you would need to integrate with Google Maps API
  const verifyAddress = async (address: string) => {
    // Simulate address verification
    console.log("Verifying address:", address);
    return true; // Assume address is valid for now
  };
  
  // Handle login submit
  const onLoginSubmit = async (values: LoginFormValues) => {
    if (isSubmitting) return;
    
    try {
      setFormSubmitting(true);
      
      console.log(`Submitting login with userType=${userType}, email=${values.email}`);
      
      // Important: Pass isAdmin parameter based on userType
      await signIn(values.email, values.password, userType === "admin");
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Handle signup submit (first step)
  const onSignupSubmit = async (values: SignupFormValues) => {
    if (isSubmitting) return;
    
    try {
      setFormSubmitting(true);
      
      // Verify address before proceeding
      const isAddressValid = await verifyAddress(values.propertyAddress);
      if (!isAddressValid) {
        toast({
          title: "Invalid address",
          description: "The property address you entered could not be verified",
          variant: "destructive",
        });
        setFormSubmitting(false);
        return;
      }
      
      // Store form values for later use
      setTempUserData(values);
      
      // Send verification code and move to next step
      const codeSent = await handleSendVerificationCode(values.phoneNumber);
      if (codeSent) {
        setVerificationStep(true);
      }
      
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Handle verification submit (second step)
  const onVerificationSubmit = async (values: VerificationFormValues) => {
    if (isSubmitting || !tempUserData) return;
    
    try {
      setFormSubmitting(true);
      
      // In development, verify against the expected code if available
      if (expectedCode && values.verificationCode !== expectedCode) {
        toast({
          title: "Invalid verification code",
          description: "The code you entered is incorrect. Please try again.",
          variant: "destructive",
        });
        setFormSubmitting(false);
        return;
      }
      
      // Proceed with actual signup using stored data
      await signUp(
        tempUserData.email,
        tempUserData.password,
        tempUserData.fullName,
        tempUserData.phoneNumber,
        tempUserData.propertyAddress
      );
      
      toast({
        title: "Account created!",
        description: "Your phone has been verified. You can now log in.",
      });
      
      // Navigate to dashboard or login page based on your app flow
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // Resend verification code
  const handleResendCode = async () => {
    if (!tempUserData || isSubmitting) return;
    
    await handleSendVerificationCode(tempUserData.phoneNumber);
  };
  
  // Handle back button from verification step
  const handleBackToSignup = () => {
    setVerificationStep(false);
  };

  // Render login form
  if (!isSignup) {
    return (
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Mail size={18} />
                    </span>
                    <Input
                      placeholder="your.email@example.com"
                      {...field}
                      className="pl-10"
                      disabled={userType === "admin" && !!autoFilledAdmin || isSubmitting}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Lock size={18} />
                    </span>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="pl-10"
                      disabled={userType === "admin" && !!autoFilledAdmin || isSubmitting}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <ZenoraButton 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Log In"}
          </ZenoraButton>
        </form>
      </Form>
    );
  }

  // Render verification step - with its own separate form to avoid type conflicts
  if (verificationStep) {
    return (
      <Form {...verificationForm}>
        <form onSubmit={verificationForm.handleSubmit(onVerificationSubmit)} className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Phone Verification</h3>
            <p className="text-sm text-muted-foreground">
              We've sent a 6-digit code to your phone number. Please enter it below to verify your account.
            </p>
          </div>
          
          <FormField
            control={verificationForm.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP 
                    maxLength={6} 
                    {...field} 
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onChange={(value) => {
                      // Only allow digits
                      const numericValue = value.replace(/\D/g, '');
                      field.onChange(numericValue);
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center justify-between">
            <button 
              type="button"
              onClick={handleBackToSignup}
              className="text-sm text-zenora-purple hover:underline"
              disabled={isSubmitting}
            >
              Back to Signup
            </button>
            
            <button 
              type="button" 
              className="text-sm text-zenora-purple hover:underline"
              onClick={handleResendCode}
              disabled={isSubmitting}
            >
              Resend Code
            </button>
          </div>
          
          <ZenoraButton 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify & Complete Signup"}
          </ZenoraButton>
        </form>
      </Form>
    );
  }

  // Render initial signup form
  return (
    <Form {...signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
        {/* Personal Information */}
        <FormField
          control={signupForm.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <User size={18} />
                  </span>
                  <Input placeholder="John Doe" {...field} className="pl-10" disabled={isSubmitting} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={signupForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Mail size={18} />
                  </span>
                  <Input placeholder="your.email@example.com" {...field} className="pl-10" disabled={isSubmitting} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={signupForm.control}
          name="propertyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <MapPin size={18} />
                  </span>
                  <Input 
                    placeholder="123 Main St, City, State ZIP" 
                    {...field} 
                    className="pl-10"
                    disabled={isSubmitting} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signupForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Phone size={18} />
                  </span>
                  <Input 
                    placeholder="(123) 456-7890" 
                    {...field} 
                    className="pl-10" 
                    disabled={isSubmitting}
                    onChange={(e) => {
                      // Allow only numbers, +, (), -, and spaces in phone number
                      const value = e.target.value.replace(/[^\d\s()+\-]/g, '');
                      field.onChange(value);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={signupForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secure Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Lock size={18} />
                  </span>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <div className="text-xs text-muted-foreground mt-2 space-y-1">
                <p>Password requirements:</p>
                <ul className="list-disc list-inside pl-2">
                  <li>At least 8 characters</li>
                  <li>At least one uppercase letter (A-Z)</li>
                  <li>At least one lowercase letter (a-z)</li>
                  <li>At least one number (0-9)</li>
                </ul>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={signupForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <KeyRound size={18} />
                  </span>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    className="pl-10"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-4">
            By signing up, you'll receive a verification code on your phone to complete your registration.
          </p>
          
          <ZenoraButton 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Sign Up"}
          </ZenoraButton>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
