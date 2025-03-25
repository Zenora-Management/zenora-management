import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminOverview from "@/components/admin/AdminOverview";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Eye, EyeOff, UserPlus, Settings, File, Building, 
  Trash2, PencilLine, Plus, Upload 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Client, ClientSettings, Property, Document, 
  Tables 
} from "@/types/supabase";

const Admin = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="properties" element={<PropertiesManagement />} />
        <Route path="financials" element={<FinancialsManagement />} />
        <Route path="inquiries" element={<InquiriesManagement />} />
        <Route path="reports" element={<ReportsManagement />} />
        <Route path="website" element={<WebsiteManagement />} />
        <Route path="notifications" element={<NotificationsManagement />} />
        <Route path="settings" element={<SettingsManagement />} />
        <Route path="security" element={<SecurityManagement />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

const UsersManagement = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientSettings, setClientSettings] = useState<ClientSettings | null>(null);
  const [clientProperties, setClientProperties] = useState<Property[]>([]);
  const [clientDocuments, setClientDocuments] = useState<Document[]>([]);
  const [manageClientOpen, setManageClientOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  // Load clients on component mount
  useEffect(() => {
    async function loadClients() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setClients(data as Client[] || []);
      } catch (error) {
        console.error('Error loading clients:', error);
        toast({
          title: "Failed to load clients",
          description: "Could not retrieve client data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadClients();
  }, []);

  // Load client details when selected
  const handleViewClient = async (client: Client) => {
    setSelectedClient(client);
    setActiveTab("info");
    
    try {
      // Load client settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('client_settings')
        .select('*')
        .eq('client_id', client.id)
        .single();
      
      if (settingsError && settingsError.code !== 'PGRST116') {
        throw settingsError;
      }
      
      setClientSettings(settingsData as ClientSettings || {
        client_id: client.id,
        show_properties: true,
        show_documents: true,
        show_financials: true,
        show_maintenance: true,
        show_ai_insights: true
      } as ClientSettings);
      
      // Load client properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false });
      
      if (propertiesError) {
        throw propertiesError;
      }
      
      setClientProperties(propertiesData as Property[] || []);
      
      // Load client documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('documents')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false });
      
      if (documentsError) {
        throw documentsError;
      }
      
      setClientDocuments(documentsData as Document[] || []);
      
      setManageClientOpen(true);
    } catch (error) {
      console.error('Error loading client details:', error);
      toast({
        title: "Failed to load client details",
        description: "Could not retrieve client information. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update client visibility settings
  const updateClientSettings = async () => {
    if (!clientSettings || !selectedClient) return;
    
    try {
      const { error } = await supabase
        .from('client_settings')
        .upsert([clientSettings])
        .eq('client_id', selectedClient.id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Settings updated",
        description: "Client dashboard settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating client settings:', error);
      toast({
        title: "Failed to update settings",
        description: "Could not update client settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Toggle document visibility
  const toggleDocumentVisibility = async (documentId: string, isVisible: boolean) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ is_visible: !isVisible })
        .eq('id', documentId);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setClientDocuments(
        clientDocuments.map(doc => 
          doc.id === documentId 
            ? { ...doc, is_visible: !isVisible } 
            : doc
        )
      );
      
      toast({
        title: isVisible ? "Document hidden" : "Document visible",
        description: `The document is now ${isVisible ? 'hidden from' : 'visible to'} the client.`,
      });
    } catch (error) {
      console.error('Error toggling document visibility:', error);
      toast({
        title: "Failed to update document",
        description: "Could not update document visibility. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">
            View and manage user accounts, documents, and settings.
          </p>
        </div>
        <ZenoraButton>
          <UserPlus className="mr-2 h-4 w-4" /> Add New Client
        </ZenoraButton>
      </div>
      
      <div className="zenora-card">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Properties</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No clients found.
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.full_name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone || "—"}</TableCell>
                      <TableCell>
                        {clientProperties.filter(p => p.client_id === client.id).length}
                      </TableCell>
                      <TableCell>{new Date(client.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <ZenoraButton 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewClient(client)}
                        >
                          Manage
                        </ZenoraButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Client Management Dialog */}
      <Dialog open={manageClientOpen} onOpenChange={setManageClientOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedClient?.full_name}
              <span className="text-muted-foreground ml-2 text-sm font-normal">
                {selectedClient?.email}
              </span>
            </DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Client Info</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="settings">Dashboard Settings</TabsTrigger>
            </TabsList>
            
            {/* Client Info Tab */}
            <TabsContent value="info" className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={selectedClient?.full_name || ""}
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        value={selectedClient?.email || ""}
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={selectedClient?.phone || ""}
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea 
                        id="address" 
                        value={selectedClient?.address || ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Account Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Account Created</span>
                      <span>
                        {selectedClient?.created_at 
                          ? new Date(selectedClient.created_at).toLocaleDateString() 
                          : "—"
                        }
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Total Properties</span>
                      <span>{clientProperties.length}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Total Documents</span>
                      <span>{clientDocuments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="py-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Client Documents</h3>
                <ZenoraButton size="sm">
                  <Upload className="mr-2 h-4 w-4" /> Upload Document
                </ZenoraButton>
              </div>
              
              {clientDocuments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border rounded-lg">
                  <File className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No documents found for this client.</p>
                  <ZenoraButton className="mt-4" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Document
                  </ZenoraButton>
                </div>
              ) : (
                <div className="space-y-3">
                  {clientDocuments.map((doc) => (
                    <div 
                      key={doc.id} 
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        {doc.description && (
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {doc.file_type.toUpperCase()} • {formatFileSize(doc.file_size)} • 
                          {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <ZenoraButton 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleDocumentVisibility(doc.id, doc.is_visible)}
                        >
                          {doc.is_visible ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" /> Hide
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" /> Show
                            </>
                          )}
                        </ZenoraButton>
                        <ZenoraButton variant="outline" size="sm">
                          <PencilLine className="mr-2 h-4 w-4" /> Edit
                        </ZenoraButton>
                        <ZenoraButton variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </ZenoraButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Properties Tab */}
            <TabsContent value="properties" className="py-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Client Properties</h3>
                <ZenoraButton size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Property
                </ZenoraButton>
              </div>
              
              {clientProperties.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground border rounded-lg">
                  <Building className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No properties found for this client.</p>
                  <ZenoraButton className="mt-4" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Property
                  </ZenoraButton>
                </div>
              ) : (
                <div className="space-y-3">
                  {clientProperties.map((property) => (
                    <div 
                      key={property.id} 
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{property.name}</p>
                        <p className="text-sm text-muted-foreground">{property.address}</p>
                        <div className="flex items-center mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                            property.status === 'Occupied' 
                              ? 'bg-green-100 text-green-800' 
                              : property.status === 'Vacant'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {property.status}
                          </span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {property.units} {property.units === 1 ? 'unit' : 'units'}
                          </span>
                          {property.monthly_rent && (
                            <span className="text-sm text-muted-foreground ml-2">
                              ${property.monthly_rent}/month
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <ZenoraButton variant="outline" size="sm">
                          <PencilLine className="mr-2 h-4 w-4" /> Edit
                        </ZenoraButton>
                        <ZenoraButton variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </ZenoraButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Dashboard Settings Tab */}
            <TabsContent value="settings" className="py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Visibility Settings</CardTitle>
                  <CardDescription>
                    Control what sections are visible to this client in their dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="show_properties"
                        checked={clientSettings?.show_properties || false}
                        onCheckedChange={(checked) => 
                          setClientSettings(prev => prev ? {
                            ...prev,
                            show_properties: !!checked
                          } : null)
                        }
                      />
                      <Label htmlFor="show_properties">Show Properties Section</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="show_documents" 
                        checked={clientSettings?.show_documents || false}
                        onCheckedChange={(checked) => 
                          setClientSettings(prev => prev ? {
                            ...prev,
                            show_documents: !!checked
                          } : null)
                        }
                      />
                      <Label htmlFor="show_documents">Show Documents Section</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="show_financials" 
                        checked={clientSettings?.show_financials || false}
                        onCheckedChange={(checked) => 
                          setClientSettings(prev => prev ? {
                            ...prev,
                            show_financials: !!checked
                          } : null)
                        }
                      />
                      <Label htmlFor="show_financials">Show Financials Section</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="show_maintenance" 
                        checked={clientSettings?.show_maintenance || false}
                        onCheckedChange={(checked) => 
                          setClientSettings(prev => prev ? {
                            ...prev,
                            show_maintenance: !!checked
                          } : null)
                        }
                      />
                      <Label htmlFor="show_maintenance">Show Maintenance Section</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="show_ai_insights" 
                        checked={clientSettings?.show_ai_insights || false}
                        onCheckedChange={(checked) => 
                          setClientSettings(prev => prev ? {
                            ...prev,
                            show_ai_insights: !!checked
                          } : null)
                        }
                      />
                      <Label htmlFor="show_ai_insights">Show AI Insights Section</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <ZenoraButton onClick={updateClientSettings}>
                    <Settings className="mr-2 h-4 w-4" /> Save Settings
                  </ZenoraButton>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <ZenoraButton 
              variant="outline" 
              onClick={() => setManageClientOpen(false)}
            >
              Close
            </ZenoraButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Utility function to format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Placeholder components for each section
const PropertiesManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Property Management</h2>
    <p className="mb-6 text-muted-foreground">Manage all properties in the system.</p>
    <div className="space-y-4">
      {/* Property management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const FinancialsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Financial Management</h2>
    <p className="mb-6 text-muted-foreground">Manage system finances, payments, and subscriptions.</p>
    <div className="space-y-4">
      {/* Financial management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const InquiriesManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Inquiries Management</h2>
    <p className="mb-6 text-muted-foreground">Manage and respond to user inquiries and support requests.</p>
    <div className="space-y-4">
      {/* Inquiries management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const ReportsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Reports</h2>
    <p className="mb-6 text-muted-foreground">Generate and view system-wide reports and analytics.</p>
    <div className="space-y-4">
      {/* Reports management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const WebsiteManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Website Management</h2>
    <p className="mb-6 text-muted-foreground">Manage website content, blog posts, and SEO settings.</p>
    <div className="space-y-4">
      {/* Website management content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const NotificationsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Notifications</h2>
    <p className="mb-6 text-muted-foreground">Manage system notifications and announcements.</p>
    <div className="space-y-4">
      {/* Notifications content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const SettingsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">System Settings</h2>
    <p className="mb-6 text-muted-foreground">Configure global system settings and preferences.</p>
    <div className="space-y-4">
      {/* Settings content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const SecurityManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
    <p className="mb-6 text-muted-foreground">Manage system security, access logs, and authentication settings.</p>
    <div className="space-y-4">
      {/* Security content would go here */}
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

export default Admin;
