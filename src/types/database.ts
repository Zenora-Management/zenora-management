
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
