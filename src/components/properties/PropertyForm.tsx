
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Building, ChevronLeft, Loader2 } from "lucide-react";
import { useProperties, Property } from "@/hooks/useProperties";
import { useAuth } from "@/contexts/AuthContext";

interface PropertyFormProps {
  property?: Property;
  isEditing?: boolean;
}

const PropertyForm = ({ property, isEditing = false }: PropertyFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProperty, updateProperty } = useProperties();
  
  const [formData, setFormData] = useState({
    name: property?.name || "",
    address: property?.address || "",
    type: property?.type || "Apartment",
    units: property?.units || 1,
    occupancy_rate: property?.occupancy_rate || 0,
    status: property?.status || "active"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "units" || name === "occupancy_rate" ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && property) {
        await updateProperty.mutateAsync({
          ...property,
          ...formData
        });
      } else {
        if (!user?.id) {
          throw new Error("User must be logged in to create a property");
        }
        
        await createProperty.mutateAsync({
          ...formData,
          owner_id: user.id
        });
      }
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };
  
  const isSubmitting = createProperty.isPending || updateProperty.isPending;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zenora-dark/50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zenora-purple/10 rounded-lg">
            <Building className="h-5 w-5 text-zenora-purple" />
          </div>
          <h2 className="text-xl font-semibold">
            {isEditing ? "Edit Property" : "Add New Property"}
          </h2>
        </div>
      </div>
      
      <div className="zenora-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Property Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="zenora-input"
                placeholder="e.g. Shoreline Apartments"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-2">
                Property Type
              </label>
              <select
                id="type"
                name="type"
                className="zenora-input"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Duplex">Duplex</option>
                <option value="Loft">Loft</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className="zenora-input"
                placeholder="e.g. 123 Ocean View Drive, San Francisco, CA 94103"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="units" className="block text-sm font-medium mb-2">
                Number of Units
              </label>
              <input
                id="units"
                name="units"
                type="number"
                className="zenora-input"
                min="1"
                value={formData.units}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="occupancy_rate" className="block text-sm font-medium mb-2">
                Occupancy Rate (%)
              </label>
              <input
                id="occupancy_rate"
                name="occupancy_rate"
                type="number"
                className="zenora-input"
                min="0"
                max="100"
                value={formData.occupancy_rate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="zenora-input"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="vacant">Vacant</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <ZenoraButton
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </ZenoraButton>
            <ZenoraButton
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditing ? "Update Property" : "Create Property"
              )}
            </ZenoraButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
