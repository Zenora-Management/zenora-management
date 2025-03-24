
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ZenoraButton } from '@/components/ui/button-zenora';
import { Check, ChevronRight, ExternalLink, AlertTriangle, Sparkles, Star, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const Upgrade = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('year');
  const { 
    subscription, 
    isLoading, 
    createCheckoutSession, 
    cancelSubscription,
    isSubscriptionActive,
    getPlanDetails
  } = useSubscription();
  
  // Get price ID map - replace these with your actual Stripe price IDs once created
  const PRICE_IDS = {
    starter: {
      month: 'price_starter_monthly',
      year: 'price_starter_yearly'
    },
    professional: {
      month: 'price_professional_monthly',
      year: 'price_professional_yearly'
    },
    enterprise: {
      month: 'price_enterprise_monthly',
      year: 'price_enterprise_yearly'
    }
  };
  
  // Plans data
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small landlords with a few properties',
      price: {
        month: '$29',
        year: '$290'
      },
      pricePerMonth: {
        month: '$29',
        year: '$24'
      },
      savings: '17%',
      features: [
        'Up to 5 properties',
        'Basic AI rent analysis',
        'Tenant screening (3/month)',
        'Maintenance tracking',
        'Email support'
      ],
      popular: false,
      icon: <Star className="h-6 w-6 text-amber-500" />
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing property portfolios',
      price: {
        month: '$79',
        year: '$790'
      },
      pricePerMonth: {
        month: '$79',
        year: '$66'
      },
      savings: '17%',
      features: [
        'Up to 20 properties',
        'Advanced AI rent analysis',
        'Unlimited tenant screening',
        'Maintenance tracking & scheduling',
        'Financial reporting',
        'Priority support'
      ],
      popular: true,
      icon: <Sparkles className="h-6 w-6 text-zenora-purple" />
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Comprehensive solution for property management companies',
      price: {
        month: '$199',
        year: '$1,990'
      },
      pricePerMonth: {
        month: '$199',
        year: '$166'
      },
      savings: '17%',
      features: [
        'Unlimited properties',
        'Premium AI rent analysis',
        'Unlimited tenant screening',
        'Advanced maintenance management',
        'Custom financial reporting',
        'API access',
        'Dedicated account manager'
      ],
      popular: false,
      icon: <Zap className="h-6 w-6 text-blue-500" />
    }
  ];
  
  // Check URL params for stripe success/cancel messages
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    if (params.get('success') === 'true') {
      toast({
        title: 'Subscription successful!',
        description: 'Your subscription has been activated.',
      });
      // Clear the URL parameters
      navigate('/upgrade', { replace: true });
    }
    
    if (params.get('canceled') === 'true') {
      toast({
        title: 'Subscription canceled',
        description: 'Your subscription process was canceled.',
        variant: 'destructive',
      });
      // Clear the URL parameters
      navigate('/upgrade', { replace: true });
    }
  }, [location, navigate]);
  
  // Handle plan selection
  const handleSelectPlan = async (planId: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to subscribe to a plan.',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    
    try {
      const priceId = PRICE_IDS[planId as keyof typeof PRICE_IDS][billingInterval];
      await createCheckoutSession.mutateAsync({
        priceId,
        returnUrl: `${window.location.origin}/upgrade`,
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
  
  // Handle subscription cancellation
  const handleCancelSubscription = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
      try {
        await cancelSubscription.mutateAsync();
      } catch (error) {
        console.error('Error canceling subscription:', error);
      }
    }
  };
  
  const currentPlan = subscription ? getPlanDetails() : { name: 'Free', features: [] };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="zenora-container">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Upgrade Your Subscription</h1>
            
            {/* Current Plan */}
            {!isLoading && (
              <Card className="mb-12 border border-zenora-purple/30">
                <CardHeader className="bg-gradient-to-r from-zenora-purple/10 to-transparent">
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-zenora-purple/20 p-1.5 rounded-full">
                      <Sparkles className="h-5 w-5 text-zenora-purple" />
                    </div>
                    Current Plan: {currentPlan.name}
                  </CardTitle>
                  {subscription && (
                    <CardDescription>
                      Status: {subscription.status}
                      {subscription.current_period_end && (
                        `, Renews on ${new Date(subscription.current_period_end).toLocaleDateString()}`
                      )}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-6">
                  {currentPlan.features.length > 0 ? (
                    <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2">
                      {currentPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-zenora-purple shrink-0 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No active subscription. Upgrade to access premium features.</p>
                  )}
                </CardContent>
                {isSubscriptionActive && (
                  <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-6">
                    <ZenoraButton
                      variant="outline" 
                      onClick={handleCancelSubscription}
                    >
                      Cancel Subscription
                    </ZenoraButton>
                  </CardFooter>
                )}
              </Card>
            )}
            
            {/* Subscription Options */}
            <div className="mb-16">
              <div className="flex justify-center mb-12">
                <Tabs 
                  defaultValue="year" 
                  value={billingInterval}
                  onValueChange={(value) => setBillingInterval(value as 'month' | 'year')}
                  className="w-full max-w-md"
                >
                  <TabsList className="grid w-full grid-cols-2 p-1">
                    <TabsTrigger value="month">Monthly Billing</TabsTrigger>
                    <TabsTrigger value="year" className="relative">
                      Yearly Billing
                      <span className="absolute -top-3 right-0 rounded-full bg-zenora-purple px-2 py-0.5 text-xs text-white shadow-md">
                        Save 17%
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {plans.map((plan) => (
                  <div 
                    key={plan.id} 
                    className={cn(
                      "relative rounded-2xl overflow-hidden transition-all duration-300 group hover:shadow-xl", 
                      plan.popular 
                        ? "shadow-lg border-2 border-zenora-purple transform hover:-translate-y-1" 
                        : "shadow-md border border-gray-200 dark:border-gray-800"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-zenora-purple text-white py-2 px-4 text-sm font-medium rounded-bl-xl z-10">
                        Most Popular
                      </div>
                    )}
                    <div className={cn(
                      "p-1",
                      plan.popular ? "bg-zenora-gradient" : ""
                    )}>
                      <div className="bg-white dark:bg-zenora-dark rounded-xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={cn(
                            "rounded-full w-10 h-10 flex items-center justify-center",
                            plan.popular ? "bg-zenora-purple/10" : "bg-gray-100 dark:bg-gray-800"
                          )}>
                            {plan.icon}
                          </div>
                          <h3 className="text-2xl font-bold">{plan.name}</h3>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex items-end">
                            <span className="text-4xl font-extrabold">{plan.price[billingInterval]}</span>
                            <span className="text-muted-foreground ml-2 mb-1">/{billingInterval}</span>
                          </div>
                          {billingInterval === 'year' && (
                            <p className="text-sm text-zenora-purple mt-1">
                              Just {plan.pricePerMonth.year}/mo, billed annually
                            </p>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground mb-6">{plan.description}</p>
                        
                        <ul className="space-y-4 mb-8">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className={cn(
                                "h-5 w-5 shrink-0 mr-2 mt-0.5",
                                plan.popular ? "text-zenora-purple" : "text-green-500"
                              )} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <ZenoraButton 
                          className="w-full" 
                          variant={plan.popular ? "default" : "outline"}
                          onClick={() => handleSelectPlan(plan.id)}
                          disabled={
                            createCheckoutSession.isPending || 
                            (isSubscriptionActive && subscription?.plan_type === plan.id)
                          }
                          animation={plan.popular ? "glow" : "none"}
                        >
                          {isSubscriptionActive && subscription?.plan_type === plan.id
                            ? 'Current Plan'
                            : createCheckoutSession.isPending
                              ? 'Processing...'
                              : 'Select Plan'}
                        </ZenoraButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* FAQs */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How do I change my subscription plan?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You can upgrade or downgrade your plan at any time. The new plan will take effect immediately, and we'll prorate any charges or credits.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What happens when I cancel my subscription?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You'll continue to have access to your current plan's features until the end of your billing period. After that, you'll be downgraded to the free plan.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Are there any refunds if I cancel early?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>We don't offer refunds for partial subscription periods. If you cancel, you'll have access until the end of your current billing cycle.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How secure is my payment information?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>All payments are processed securely through Stripe. We never store your credit card information on our servers.</p>
                  </CardContent>
                </Card>
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
