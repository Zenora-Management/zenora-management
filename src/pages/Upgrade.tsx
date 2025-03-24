
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Check, CreditCard, HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Upgrade = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro" | "enterprise">("pro");

  const handleUpgrade = () => {
    toast({
      title: "Upgrade initiated",
      description: `You've selected the ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan with ${billingCycle} billing.`,
      variant: "default",
    });
  };

  const plans = {
    basic: {
      name: "Basic",
      monthly: 19.99,
      yearly: 199.99,
      features: [
        "Up to 2 properties",
        "1 AI rent analysis per month",
        "Standard support",
        "Basic reporting",
      ],
      color: "bg-gradient-to-r from-blue-500 to-teal-400",
    },
    pro: {
      name: "Pro",
      monthly: 39.99,
      yearly: 399.99,
      features: [
        "Up to 5 properties",
        "3 AI rent analyses per month",
        "Priority support",
        "Advanced reporting",
        "API access",
      ],
      color: "bg-gradient-to-r from-purple-600 to-violet-400",
    },
    enterprise: {
      name: "Enterprise",
      monthly: 99.99,
      yearly: 999.99,
      features: [
        "Unlimited properties",
        "Unlimited AI rent analyses",
        "24/7 dedicated support",
        "Custom reports & dashboards",
        "API access with higher rate limits",
        "White-labeling options",
        "Dedicated account manager",
      ],
      color: "bg-gradient-to-r from-orange-500 to-amber-400",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gradient-to-b from-white to-gray-50 dark:from-zenora-dark dark:to-black">
        <div className="zenora-container">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-zenora-gradient">
              Upgrade Your Plan
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose the plan that best fits your property management needs and unlock powerful AI-driven features.
            </p>
          </div>
          
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 text-sm font-medium rounded-full ${
                  billingCycle === "monthly"
                    ? "bg-white dark:bg-black shadow"
                    : "text-muted-foreground"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 text-sm font-medium rounded-full flex items-center ${
                  billingCycle === "yearly"
                    ? "bg-white dark:bg-black shadow"
                    : "text-muted-foreground"
                }`}
              >
                Yearly Billing
                <span className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs py-0.5 px-1.5 rounded-full">
                  Save 16%
                </span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(Object.keys(plans) as Array<keyof typeof plans>).map((planKey) => {
              const plan = plans[planKey];
              const isSelected = selectedPlan === planKey;
              
              return (
                <div 
                  key={planKey}
                  className={`zenora-card relative overflow-hidden ${
                    isSelected 
                      ? "ring-2 ring-zenora-purple dark:ring-zenora-purple" 
                      : ""
                  }`}
                >
                  {planKey === "pro" && (
                    <div className="absolute top-0 right-0 bg-zenora-gradient text-white text-xs font-bold py-1 px-3 rounded-bl">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className={`h-2 w-full ${plan.color}`}></div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                    
                    <div className="mb-6">
                      <span className="text-3xl font-extrabold">${billingCycle === "monthly" ? plan.monthly : plan.yearly}</span>
                      <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <ZenoraButton
                      onClick={() => setSelectedPlan(planKey)}
                      className="w-full"
                      variant={isSelected ? "default" : "outline"}
                    >
                      {isSelected ? "Selected" : "Select Plan"}
                    </ZenoraButton>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 zenora-card p-6">
            <h2 className="text-xl font-bold mb-4">Complete Your Upgrade</h2>
            
            <div className="mb-6">
              <p className="font-medium mb-2">Selected Plan:</p>
              <div className="flex items-center bg-gray-50 dark:bg-zenora-dark/50 p-3 rounded-md">
                <div className={`h-8 w-8 rounded-full ${plans[selectedPlan].color} mr-3`}></div>
                <div>
                  <p className="font-semibold">{plans[selectedPlan].name} Plan</p>
                  <p className="text-sm text-muted-foreground">
                    ${billingCycle === "monthly" ? plans[selectedPlan].monthly : plans[selectedPlan].yearly}/{billingCycle === "monthly" ? "month" : "year"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6 mb-6">
              <h3 className="font-medium mb-4">Payment Method</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="card-name" className="block text-sm font-medium mb-1">Name on Card</label>
                  <input id="card-name" type="text" className="zenora-input" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium mb-1">Card Number</label>
                  <div className="relative">
                    <input id="card-number" type="text" className="zenora-input pl-10" placeholder="1234 5678 9012 3456" />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <CreditCard className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="card-expiry" className="block text-sm font-medium mb-1">Expiration Date</label>
                  <input id="card-expiry" type="text" className="zenora-input" placeholder="MM/YY" />
                </div>
                <div>
                  <label htmlFor="card-cvc" className="block text-sm font-medium mb-1">CVC</label>
                  <input id="card-cvc" type="text" className="zenora-input" placeholder="123" />
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <input id="save-card" type="checkbox" className="mr-2" />
                <label htmlFor="save-card" className="text-sm">Save this card for future payments</label>
              </div>
            </div>
            
            <div className="border-t pt-6 mb-6">
              <h3 className="font-medium mb-2">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{plans[selectedPlan].name} Plan ({billingCycle})</span>
                  <span>${billingCycle === "monthly" ? plans[selectedPlan].monthly : plans[selectedPlan].yearly}</span>
                </div>
                {billingCycle === "yearly" && (
                  <div className="flex justify-between">
                    <span className="text-green-600">Annual discount</span>
                    <span className="text-green-600">-$${(plans[selectedPlan].monthly * 12 - plans[selectedPlan].yearly).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>${billingCycle === "monthly" ? plans[selectedPlan].monthly : plans[selectedPlan].yearly}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-zenora-dark/20 p-3 rounded-md text-sm mb-6 flex items-start">
                <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0 text-zenora-purple" />
                <p>
                  You'll be charged ${billingCycle === "monthly" ? plans[selectedPlan].monthly : plans[selectedPlan].yearly} 
                  for your {billingCycle} subscription to the {plans[selectedPlan].name} Plan. 
                  You can cancel or change your plan at any time from your account settings.
                </p>
              </div>
              
              <div className="flex gap-3">
                <ZenoraButton onClick={handleUpgrade} className="flex-grow">
                  Complete Upgrade
                </ZenoraButton>
                <Link to="/dashboard">
                  <ZenoraButton variant="outline">
                    Cancel
                  </ZenoraButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upgrade;
