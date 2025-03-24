
import { useState } from "react";
import { Link } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Home, Plus, Search, Edit, Trash, MoreHorizontal, Loader2 } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const PropertyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { properties, isLoading, error, deleteProperty } = useProperties();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // Handle property deletion
  const handleDeleteClick = (id: string) => {
    setPropertyToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (propertyToDelete) {
      try {
        await deleteProperty.mutateAsync(propertyToDelete);
        setDeleteConfirmOpen(false);
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };
  
  // Filter properties based on search term
  const filteredProperties = properties 
    ? properties.filter(property => 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  
  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <Home className="h-5 w-5 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold">My Properties</h2>
          </div>
        </div>
        
        <div className="zenora-card p-6">
          <div className="py-12 text-center">
            <h3 className="text-lg font-medium mb-2 text-red-500">Error loading properties</h3>
            <p className="text-muted-foreground mb-4">
              There was an error loading your properties. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zenora-purple/10 rounded-lg">
            <Home className="h-5 w-5 text-zenora-purple" />
          </div>
          <h2 className="text-xl font-semibold">My Properties</h2>
        </div>
        
        <Link to="/dashboard/properties/add">
          <ZenoraButton size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Property
          </ZenoraButton>
        </Link>
      </div>
      
      <div className="zenora-card p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <input
              type="search"
              className="zenora-input pl-10"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Total: <span className="font-medium text-foreground">
                {isLoading ? "..." : filteredProperties.length}
              </span> properties
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-zenora-purple" />
            <span className="ml-2 text-lg">Loading properties...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {filteredProperties.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Property</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Units</th>
                    <th className="text-left py-3 px-4">Occupancy</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map((property) => (
                    <tr 
                      key={property.id} 
                      className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-zenora-dark/50"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium">{property.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{property.address}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">{property.type}</td>
                      <td className="py-4 px-4">{property.units}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                property.occupancy_rate >= 90
                                  ? "bg-green-500"
                                  : property.occupancy_rate >= 70
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${property.occupancy_rate}%` }}
                            ></div>
                          </div>
                          <span>{property.occupancy_rate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          property.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : property.status === "maintenance"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/dashboard/properties/${property.id}`}>
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-zenora-dark/70 rounded" aria-label="Edit property">
                              <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </button>
                          </Link>
                          <button 
                            className="p-1 hover:bg-gray-100 dark:hover:bg-zenora-dark/70 rounded" 
                            aria-label="Delete property"
                            onClick={() => handleDeleteClick(property.id)}
                          >
                            <Trash className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-zenora-dark/70 rounded" aria-label="More options">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 dark:bg-zenora-dark/70 flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? `No properties matching "${searchTerm}"`
                    : "You haven't added any properties yet."}
                </p>
                {!searchTerm && (
                  <Link to="/dashboard/properties/add">
                    <ZenoraButton>
                      <Plus className="h-4 w-4 mr-2" /> Add Your First Property
                    </ZenoraButton>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-0">
            <ZenoraButton
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
              className="sm:mr-2"
            >
              Cancel
            </ZenoraButton>
            <ZenoraButton
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteProperty.isPending}
            >
              {deleteProperty.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Property"
              )}
            </ZenoraButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyList;
