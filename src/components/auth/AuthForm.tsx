
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
  const [verificationSent, setVerificationSent] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
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
    setShowVerification(false);
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
  const handleSendVerificationCode = async () => {
    try {
      // Validate the phone number field first
      await signupForm.trigger('phoneNumber');
      
      if (signupForm.formState.errors.phoneNumber) {
        return; // Don't proceed if there are validation errors
      }
      
      setFormSubmitting(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVerificationSent(true);
      setShowVerification(true);
      
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
          setFormSubmitting(false);
          return;
        }
        
        await signUp(
          signupValues.email, 
          signupValues.password, 
          signupValues.fullName, 
          signupValues.phoneNumber, 
          signupValues.propertyAddress
        );
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

  // *** SIGNUP FORM - Single Page ***
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Personal Information */}
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
        
        <FormField
          control={form.control}
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
          control={form.control}
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
        
        {/* Phone Verification (Optional) */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Phone Verification (Optional)</h3>
            {!showVerification && (
              <ZenoraButton
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSendVerificationCode}
                disabled={isSubmitting || !form.getValues("phoneNumber")}
              >
                Send Code
              </ZenoraButton>
            )}
          </div>
          
          {showVerification && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We've sent a 6-digit code to your phone. Enter it below to verify your phone number.
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
              
              <div className="flex justify-end">
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
          )}
          
          <p className="text-xs text-muted-foreground mt-2">
            Verifying your phone number allows us to send you important property updates and maintenance alerts.
          </p>
        </div>
        
        <ZenoraButton 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Sign Up"}
        </ZenoraButton>
      </form>
    </Form>
  );
};

export default AuthForm;
