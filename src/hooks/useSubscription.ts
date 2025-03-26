import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Subscription } from '@/types/database';

export function useSubscription() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch the current user's subscription
  const { 
    data: subscription, 
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        return null;
      }

      const { data, error } = await supabase
        .from('subscriptions' as any)
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        throw error;
      }
      
      return data as unknown as Subscription | null;
    },
    enabled: !!user,
  });

  // Create checkout session
  const createCheckoutSession = useMutation({
    mutationFn: async ({ priceId, returnUrl }: { priceId: string; returnUrl: string }) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const response = await supabase.functions.invoke('stripe-checkout', {
        body: {
          price_id: priceId,
          user_id: user.id,
          return_url: returnUrl
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    onSuccess: (data) => {
      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      toast({
        title: "Error creating checkout session",
        description: error.message || "There was an error setting up the payment page.",
        variant: "destructive",
      });
    },
  });

  // Cancel subscription
  const cancelSubscription = useMutation({
    mutationFn: async () => {
      if (!user?.id || !subscription?.stripe_subscription_id) {
        throw new Error('No active subscription found');
      }

      const response = await supabase.functions.invoke('stripe-manage-subscription', {
        body: {
          action: 'cancel',
          user_id: user.id,
          subscription_id: subscription.stripe_subscription_id
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Subscription canceled",
        description: "Your subscription has been canceled successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['subscription', user?.id] });
    },
    onError: (error) => {
      toast({
        title: "Error canceling subscription",
        description: error.message || "There was an error canceling your subscription.",
        variant: "destructive",
      });
    },
  });

  // Check if subscription is active
  const isSubscriptionActive = subscription?.status === 'active' || subscription?.status === 'trialing';
  
  // Check if user has access permission
  const hasAccessPermission = isSubscriptionActive && subscription?.has_access_permission;

  // Get subscription plan details - Updated to match the plans from PropertyManagementDetail page
  const getPlanDetails = () => {
    if (!subscription) {
      return { name: 'Free', features: [] };
    }

    switch (subscription.plan_type) {
      case 'client':
        return {
          name: 'Client Plan',
          features: [
            'Full property management',
            'Tenant screening & placement',
            'Maintenance coordination',
            'AI rent analysis (basic)',
            'Regular inspections',
            'Standard support'
          ]
        };
      case 'discount':
        return {
          name: 'Discount Plans',
          features: [
            'All Client Plan features',
            '$500 annual savings',
            'Priority maintenance service',
            'AI rent analysis (enhanced)',
            'Priority support',
            'Quarterly performance reviews'
          ]
        };
      case 'enterprise':
        return {
          name: 'Enterprise Plan',
          features: [
            'All Discount Plan features',
            'Volume discounting',
            'Dedicated account manager',
            'AI rent analysis (premium)',
            'Custom reporting',
            'API access'
          ]
        };
      default:
        return { name: 'Free', features: [] };
    }
  };

  // Setup realtime subscription updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('subscription-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'subscriptions',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        console.log('Subscription update received:', payload);
        queryClient.invalidateQueries({ queryKey: ['subscription', user.id] });
      })
      .subscribe((status) => {
        console.log('Subscription realtime status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient]);

  return {
    subscription,
    isLoading,
    error,
    refetch,
    createCheckoutSession,
    cancelSubscription,
    isSubscriptionActive,
    hasAccessPermission,
    getPlanDetails
  };
}
