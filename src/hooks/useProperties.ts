
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type Property = {
  id: string;
  name: string;
  address: string;
  type: string;
  units: number;
  occupancy_rate: number;
  status: string;
  created_at?: string;
  updated_at?: string;
};

export function useProperties() {
  const queryClient = useQueryClient();
  
  // Fetch all properties for the authenticated user
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data as Property[];
    },
  });
  
  // Create a new property
  const createProperty = useMutation({
    mutationFn: async (newProperty: Omit<Property, 'id'>) => {
      const { data, error } = await supabase
        .from('properties')
        .insert([newProperty])
        .select();
      
      if (error) {
        throw error;
      }
      
      return data[0] as Property;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Property created",
        description: "Your property has been successfully added.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating property",
        description: error.message || "There was an error creating your property.",
        variant: "destructive",
      });
    },
  });
  
  // Update an existing property
  const updateProperty = useMutation({
    mutationFn: async (property: Property) => {
      const { data, error } = await supabase
        .from('properties')
        .update({
          name: property.name,
          address: property.address,
          type: property.type,
          units: property.units,
          occupancy_rate: property.occupancy_rate,
          status: property.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', property.id)
        .select();
      
      if (error) {
        throw error;
      }
      
      return data[0] as Property;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Property updated",
        description: "Your property has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating property",
        description: error.message || "There was an error updating your property.",
        variant: "destructive",
      });
    },
  });
  
  // Delete a property
  const deleteProperty = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Property deleted",
        description: "Your property has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting property",
        description: error.message || "There was an error deleting your property.",
        variant: "destructive",
      });
    },
  });
  
  return {
    properties,
    isLoading,
    error,
    createProperty,
    updateProperty,
    deleteProperty
  };
}
