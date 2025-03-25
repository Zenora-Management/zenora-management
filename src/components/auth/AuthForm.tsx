
import * as z from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Eye, EyeOff, Phone, MapPin, User, Mail } from "lucide-react";
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
  verificationCode: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Define types based on the schemas
type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthForm = ({ mode, userType }: AuthFormProps) => {
  const { signIn, signUp, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [autoFilledAdmin, setAutoFilledAdmin] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [signupStep, setSignupStep] = useState<'personalInfo' | 'verification' | 'addressPassword'>('personalInfo');
  const [verificationSent, setVerificationSent] = useState(false);
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
      verificationCode: "",
    }
  });
  
  // Use the appropriate form based on the mode
  const form = isSignup ? signupForm : loginForm;
  
  // Reset form submission state when mode changes
  useEffect(() => {
    setFormSubmitting(false);
    setSignupStep('personalInfo');
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

  // Function to handle verification code submission
  const handleVerifyCode = async () => {
    const verificationCode = signupForm.getValues("verificationCode");
    if (!verificationCode || verificationCode.length < 6) {
      toast({
        title: "Invalid verification code",
        description: "Please enter the 6-digit code sent to your phone",
        variant: "destructive",
      });
      return;
    }

    // For now we'll just proceed to the next step without actual verification
    // In a real app, you'd verify the code with an API
    toast({
      title: "Verification successful",
      description: "Please continue with your address and password",
    });
    setSignupStep('addressPassword');
  };

  // Function to handle sending verification code
  const handleSendVerificationCode = async () => {
    try {
      // Validate the personal info fields first
      await signupForm.trigger(['fullName', 'email', 'phoneNumber']);
      
      if (signupForm.formState.errors.fullName || 
          signupForm.formState.errors.email || 
          signupForm.formState.errors.phoneNumber) {
        return; // Don't proceed if there are validation errors
      }
      
      // In a real app, you'd call an API to send a verification code
      // For now, we'll simulate sending a code
      setFormSubmitting(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVerificationSent(true);
      setSignupStep('verification');
      
      toast({
        title: "Verification code sent",
        description: "Please check your phone for the 6-digit code",
      });
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast({
        title: "Failed to send verification code",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  // Function to verify address using Google Maps API
  // Note: In a real implementation, you would need to integrate with Google Maps API
  const verifyAddress = async (address: string) => {
    // Simulate address verification
    // In a real app, you'd call the Google Maps API here
    console.log("Verifying address:", address);
    return true; // Assume address is valid for now
  };
  
  const onSubmit = async (values: LoginFormValues | SignupFormValues) => {
    // Prevent submission if already submitting
    if (isSubmitting) {
      return;
    }
    
    try {
      setFormSubmitting(true);
      
      if (!isSignup) {
        // Login flow
        const loginValues = values as LoginFormValues;
        console.log(`Submitting login with userType=${userType}, email=${loginValues.email}`);
        
        // Important: Pass isAdmin parameter based on userType
        await signIn(
          loginValues.email, 
          loginValues.password, 
          userType === "admin"
        );
      } else {
        // Signup flow
        const signupValues = values as SignupFormValues;
        
        // Verify address before signup
        const isAddressValid = await verifyAddress(signupValues.propertyAddress);
        if (!isAddressValid) {
          toast({
            title: "Invalid address",
            description: "The property address you entered could not be verified",
            variant: "destructive",
          });
          return;
        }
        
        await signUp(signupValues.email, signupValues.password, signupValues.fullName);
        
        // In a real app, you would also save the phone number and address
        // For now this would need to be implemented in the signUp function in use-auth-operations.ts
      }
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

  // Render login form
  if (!isSignup) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
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
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
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

  // Render signup form based on current step
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Step 1: Personal Information */}
        {signupStep === 'personalInfo' && (
          <>
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <Phone size={18} />
                      </span>
                      <Input placeholder="(123) 456-7890" {...field} className="pl-10" disabled={isSubmitting} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <ZenoraButton 
              type="button" 
              className="w-full" 
              onClick={handleSendVerificationCode}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Send Verification Code"}
            </ZenoraButton>
          </>
        )}
        
        {/* Step 2: Verification Code */}
        {signupStep === 'verification' && (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Verification</h3>
              <p className="text-sm text-muted-foreground">
                We've sent a 6-digit code to your phone. Please enter it below to continue.
              </p>
              
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field} value={field.value || ""}>
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
              
              <div className="flex flex-col space-y-2">
                <ZenoraButton 
                  type="button" 
                  className="w-full" 
                  onClick={handleVerifyCode}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Verify Code"}
                </ZenoraButton>
                
                <button 
                  type="button" 
                  className="text-sm text-zenora-purple hover:underline"
                  onClick={handleSendVerificationCode}
                  disabled={isSubmitting}
                >
                  Resend Code
                </button>
              </div>
            </div>
          </>
        )}
        
        {/* Step 3: Address and Password */}
        {signupStep === 'addressPassword' && (
          <>
            <FormField
              control={form.control}
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
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secure Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
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
                  <div className="text-xs text-muted-foreground mt-1">
                    Password must be at least 8 characters and include uppercase, lowercase letters and numbers.
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
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
            
            <ZenoraButton 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Sign Up"}
            </ZenoraButton>
          </>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
