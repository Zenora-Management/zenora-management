
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
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Upgrade = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Only yearly billing is available
  const billingInterval = 'year';
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
      year: 'price_starter_yearly'
    },
    professional: {
      year: 'price_professional_yearly'
    },
    enterprise: {
      year: 'price_enterprise_yearly'
    }
  };
  
  // Plans data - Updated to match the Property Management page
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small landlords with a few properties',
      price: {
        year: '$290'
      },
      pricePerMonth: {
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
      icon: <Star className="h-6 w-6 text-amber-500" />,
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing property portfolios',
      price: {
        year: '$790'
      },
      pricePerMonth: {
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
      icon: <Sparkles className="h-6 w-6 text-zenora-purple" />,
      color: 'from-zenora-purple to-zenora-light'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Comprehensive solution for property management companies',
      price: {
        year: '$1,990'
      },
      pricePerMonth: {
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
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      color: 'from-blue-500 to-blue-600'
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

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-zenora-purple/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-amber-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="zenora-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-zenora-gradient mb-4">
                Upgrade Your Experience
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that's right for you and take your property management to the next level.
              </p>
            </div>
            
            {/* Current Plan */}
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Card className="mb-12 border border-zenora-purple/30 overflow-hidden bg-gradient-to-r from-zenora-purple/5 to-transparent">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-zenora-purple/20 p-2 rounded-full">
                          <Sparkles className="h-5 w-5 text-zenora-purple" />
                        </div>
                        <CardTitle>Current Plan: {currentPlan.name}</CardTitle>
                      </div>
                      {subscription && subscription.status === 'active' && (
                        <div className="bg-green-500/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                          Active
                        </div>
                      )}
                    </div>
                    {subscription && (
                      <CardDescription>
                        {subscription.current_period_end && (
                          <span className="font-medium">
                            Renews on {new Date(subscription.current_period_end).toLocaleDateString()}
                          </span>
                        )}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="pt-6">
                    {currentPlan.features.length > 0 ? (
                      <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2">
                        {currentPlan.features.map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <Check className="h-5 w-5 text-zenora-purple shrink-0 mr-2" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6">
                        <p className="text-muted-foreground mb-4">No active subscription. Upgrade to access premium features.</p>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ZenoraButton
                            onClick={() => document.getElementById('pricing-plans')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group"
                          >
                            View Plans <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </ZenoraButton>
                        </motion.div>
                      </div>
                    )}
                  </CardContent>
                  {isSubscriptionActive && (
                    <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-6">
                      <ZenoraButton
                        variant="outline" 
                        onClick={handleCancelSubscription}
                        className="group"
                      >
                        Cancel Subscription
                      </ZenoraButton>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            )}
            
            {/* Subscription Options */}
            <motion.div 
              id="pricing-plans"
              className="mb-16"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex justify-center mb-12">
                <div className="w-full max-w-md text-center">
                  <div className="bg-zenora-purple/10 text-zenora-purple font-medium py-2 px-4 rounded-full inline-block">
                    Yearly Billing <span className="ml-1 font-bold">Save 17%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {plans.map((plan, index) => (
                  <motion.div 
                    key={plan.id} 
                    variants={itemVariants}
                    className={cn(
                      "relative rounded-2xl overflow-hidden transition-all duration-500 group", 
                      plan.popular 
                        ? "shadow-lg border-2 border-zenora-purple" 
                        : "shadow-md border border-gray-200 dark:border-gray-800"
                    )}
                    whileHover={{ 
                      translateY: -8,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-6 -right-12 w-32 h-12 rotate-45 bg-zenora-gradient text-white text-center text-xs font-semibold py-1 shadow-lg z-10">
                        Popular
                      </div>
                    )}
                    <div className={cn(
                      "p-1",
                      plan.popular ? `bg-gradient-to-br ${plan.color}` : ""
                    )}>
                      <div className="bg-white dark:bg-zenora-dark rounded-xl p-8 h-full flex flex-col">
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
                            <motion.span 
                              key={`${plan.id}-${billingInterval}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-4xl font-extrabold"
                            >
                              {plan.price[billingInterval]}
                            </motion.span>
                            <span className="text-muted-foreground ml-2 mb-1">/{billingInterval}</span>
                          </div>
                          <p className="text-sm text-zenora-purple mt-1">
                            Just {plan.pricePerMonth[billingInterval]}/mo, billed annually
                          </p>
                        </div>
                        
                        <p className="text-muted-foreground mb-6">{plan.description}</p>
                        
                        <ul className="space-y-4 mb-8 flex-grow">
                          {plan.features.map((feature, idx) => (
                            <motion.li 
                              key={idx} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.03 * idx }}
                            >
                              <div className={cn(
                                `rounded-full p-1 mr-2 mt-0.5 bg-gradient-to-r ${plan.color}`,
                              )}>
                                <Check className="h-3 w-3 text-white" />
                              </div>
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        <ZenoraButton 
                          className="w-full mt-auto group" 
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
                              : <>Select Plan <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></>}
                        </ZenoraButton>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* FAQs */}
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <Card className="transition-all duration-300 hover:border-zenora-purple/30 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <span className="bg-zenora-purple/10 p-1 rounded-full mr-2">
                        <ChevronRight className="h-4 w-4 text-zenora-purple" />
                      </span>
                      How do I change my subscription plan?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You can upgrade or downgrade your plan at any time. The new plan will take effect immediately, and we'll prorate any charges or credits.</p>
                  </CardContent>
                </Card>
                
                <Card className="transition-all duration-300 hover:border-zenora-purple/30 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <span className="bg-zenora-purple/10 p-1 rounded-full mr-2">
                        <ChevronRight className="h-4 w-4 text-zenora-purple" />
                      </span>
                      What happens when I cancel my subscription?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You'll continue to have access to your current plan's features until the end of your billing period. After that, you'll be downgraded to the free plan.</p>
                  </CardContent>
                </Card>
                
                <Card className="transition-all duration-300 hover:border-zenora-purple/30 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <span className="bg-zenora-purple/10 p-1 rounded-full mr-2">
                        <ChevronRight className="h-4 w-4 text-zenora-purple" />
                      </span>
                      Are there any refunds if I cancel early?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>We don't offer refunds for partial subscription periods. If you cancel, you'll have access until the end of your current billing cycle.</p>
                  </CardContent>
                </Card>
                
                <Card className="transition-all duration-300 hover:border-zenora-purple/30 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <span className="bg-zenora-purple/10 p-1 rounded-full mr-2">
                        <ChevronRight className="h-4 w-4 text-zenora-purple" />
                      </span>
                      Do you offer a free trial?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>We don't currently offer free trials, but we do have a 30-day money-back guarantee if you're not satisfied with our service.</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upgrade;
