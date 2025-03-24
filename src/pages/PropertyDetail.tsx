
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Building, ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PropertyForm from "@/components/properties/PropertyForm";
import { Property } from "@/types/database";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        
        if (!id) {
          throw new Error("Property ID is required");
        }
        
        // Use type assertion to bypass TypeScript's type checking for Supabase
        const { data, error } = await supabase
          .from('properties' as any)
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        setProperty(data as unknown as Property);
      } catch (error: any) {
        console.error("Error fetching property:", error);
        setError(error.message || "Failed to load property");
        toast({
          title: "Error",
          description: "Failed to load property details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperty();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zenora-purple" />
        <span className="ml-2 text-lg">Loading property details...</span>
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The property you are looking for does not exist or you don't have permission to view it."}
          </p>
          <ZenoraButton onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </ZenoraButton>
        </div>
      </div>
    );
  }
  
  return <PropertyForm property={property} isEditing />;
};

export default PropertyDetail;
