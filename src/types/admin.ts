
import { Property as BaseProperty, Document as BaseDocument } from '@/types/supabase';

export interface ExtendedProperty extends BaseProperty {
  city?: string;
  state?: string;
  zip?: string;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  square_footage?: number;
  year_built?: number;
  rental_rate?: number;
}

export interface ExtendedDocument extends BaseDocument {
  file_url?: string;
  type?: string;
}
