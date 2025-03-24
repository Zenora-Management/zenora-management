
export interface Property {
  id: string;
  owner_id: string;
  name: string;
  address: string;
  type: string;
  units: number;
  occupancy_rate: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan_type: string;
  plan_interval: string;
  status: string;
  current_period_end?: string;
  created_at: string;
  updated_at: string;
}
