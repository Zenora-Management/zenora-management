
import { useState } from "react";
import { Link } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Home, Plus, Search, Edit, Trash, MoreHorizontal } from "lucide-react";

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    name: "Shoreline Apartments",
    address: "123 Ocean View Drive, San Francisco, CA 94103",
    type: "Apartment",
    units: 6,
    occupancyRate: 83,
    status: "active"
  },
  {
    id: 2,
    name: "Urban Heights",
    address: "456 Downtown Blvd, San Francisco, CA 94107",
    type: "Apartment",
    units: 12,
    occupancyRate: 92,
    status: "active"
  },
  {
    id: 3,
    name: "Sunset Townhomes",
    address: "789 Sunset Avenue, San Francisco, CA 94116",
    type: "Townhouse",
    units: 4,
    occupancyRate: 100,
    status: "active"
  },
  {
    id: 4,
    name: "Golden Gate Condos",
    address: "101 Golden Gate Ave, San Francisco, CA 94102",
    type: "Condo",
    units: 8,
    occupancyRate: 75,
    status: "maintenance"
  },
  {
    id: 5,
    name: "Mission District Lofts",
    address: "202 Mission St, San Francisco, CA 94105",
    type: "Loft",
    units: 5,
    occupancyRate: 80,
    status: "active"
  }
];

const PropertyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties] = useState(mockProperties);
  
  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
              Total: <span className="font-medium text-foreground">{filteredProperties.length}</span> properties
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
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
                            property.occupancyRate >= 90
                              ? "bg-green-500"
                              : property.occupancyRate >= 70
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${property.occupancyRate}%` }}
                        ></div>
                      </div>
                      <span>{property.occupancyRate}%</span>
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
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-zenora-dark/70 rounded" aria-label="Delete property">
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
        </div>
        
        {filteredProperties.length === 0 && (
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
    </div>
  );
};

export default PropertyList;
