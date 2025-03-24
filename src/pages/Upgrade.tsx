
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ZenoraButton } from '@/components/ui/button-zenora';
import { Check, ChevronRight, ExternalLink, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Upgrade = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
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
      savings: '17%',
      features: [
        'Up to 5 properties',
        'Basic AI rent analysis',
        'Tenant screening (3/month)',
        'Maintenance tracking',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing property portfolios',
      price: {
        month: '$79',
        year: '$790'
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
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Comprehensive solution for property management companies',
      price: {
        month: '$199',
        year: '$1990'
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
      popular: false
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Upgrade Your Subscription</h1>
            
            {/* Current Plan */}
            {!isLoading && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Current Plan: {currentPlan.name}</CardTitle>
                  {subscription && (
                    <CardDescription>
                      Status: {subscription.status}
                      {subscription.current_period_end && (
                        `, Renews on ${new Date(subscription.current_period_end).toLocaleDateString()}`
                      )}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {currentPlan.features.length > 0 ? (
                    <ul className="space-y-2">
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
                  <CardFooter>
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
            <div className="mb-8">
              <div className="flex justify-center mb-8">
                <Tabs 
                  defaultValue="month" 
                  value={billingInterval}
                  onValueChange={(value) => setBillingInterval(value as 'month' | 'year')}
                  className="w-full max-w-md"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="month">Monthly Billing</TabsTrigger>
                    <TabsTrigger value="year">
                      Yearly Billing
                      <span className="ml-2 rounded-full bg-zenora-purple/10 px-2 py-0.5 text-xs text-zenora-purple">
                        Save 17%
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <Card key={plan.id} className={`relative ${plan.popular ? 'border-zenora-purple ring-2 ring-zenora-purple' : ''}`}>
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-zenora-purple text-white py-1 px-3 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">{plan.price[billingInterval]}</span>
                        <span className="text-muted-foreground">/{billingInterval}</span>
                        {billingInterval === 'year' && (
                          <p className="text-sm text-zenora-purple mt-1">Save {plan.savings} with annual billing</p>
                        )}
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-zenora-purple shrink-0 mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <ZenoraButton 
                        className="w-full" 
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleSelectPlan(plan.id)}
                        disabled={
                          createCheckoutSession.isPending || 
                          (isSubscriptionActive && subscription?.plan_type === plan.id)
                        }
                      >
                        {isSubscriptionActive && subscription?.plan_type === plan.id
                          ? 'Current Plan'
                          : createCheckoutSession.isPending
                            ? 'Processing...'
                            : 'Select Plan'}
                      </ZenoraButton>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* FAQs */}
            <div className="mt-12">
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
