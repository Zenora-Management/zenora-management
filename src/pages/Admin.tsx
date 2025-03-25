
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
  Client, ClientSettings, Tables 
} from "@/types/supabase";
import { ExtendedProperty, ExtendedDocument } from "@/types/admin";

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
  const [clientProperties, setClientProperties] = useState<ExtendedProperty[]>([]);
  const [clientDocuments, setClientDocuments] = useState<ExtendedDocument[]>([]);
  const [manageClientOpen, setManageClientOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [newProperty, setNewProperty] = useState<Partial<ExtendedProperty>>({});
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);
  const [uploadDocumentOpen, setUploadDocumentOpen] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [documentType, setDocumentType] = useState("property");
  const [uploading, setUploading] = useState(false);

  const loadClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      console.log('Loaded clients:', data);
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
  };

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('public:clients')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'clients'
      }, (payload) => {
        console.log('Realtime update received:', payload);
        loadClients();
      })
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
        if (status !== 'SUBSCRIBED') {
          console.error('Failed to subscribe to realtime updates');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleViewClient = async (client: Client) => {
    setSelectedClient(client);
    setActiveTab("info");
    
    try {
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
      
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false });
      
      if (propertiesError) {
        throw propertiesError;
      }
      
      setClientProperties(propertiesData as ExtendedProperty[] || []);
      
      const { data: documentsData, error: documentsError } = await supabase
        .from('documents')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false });
      
      if (documentsError) {
        throw documentsError;
      }
      
      setClientDocuments(documentsData as ExtendedDocument[] || []);
      
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

  const toggleDocumentVisibility = async (documentId: string, isVisible: boolean) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ is_visible: !isVisible })
        .eq('id', documentId);
      
      if (error) {
        throw error;
      }
      
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

  const handleDocumentUpload = async () => {
    if (!selectedClient || !documentFile || !documentName) {
      toast({
        title: "Missing information",
        description: "Please provide a document name and select a file.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setUploading(true);
      
      const fileExt = documentFile.name.split('.').pop();
      const fileName = `${selectedClient.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('client_documents')
        .upload(fileName, documentFile);
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data: urlData } = await supabase
        .storage
        .from('client_documents')
        .getPublicUrl(fileName);
      
      const newDocument: Partial<ExtendedDocument> = {
        client_id: selectedClient.id,
        name: documentName,
        description: documentDescription,
        type: documentType,
        file_path: fileName,
        file_url: urlData.publicUrl,
        file_size: documentFile.size,
        file_type: documentFile.type,
        is_visible: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { data: docData, error: docError } = await supabase
        .from('documents')
        .insert([newDocument])
        .select()
        .single();
      
      if (docError) {
        throw docError;
      }
      
      // Add the file_url to the returned document
      const docWithUrl = { ...docData, file_url: urlData.publicUrl } as ExtendedDocument;
      
      setClientDocuments([docWithUrl, ...clientDocuments]);
      
      setUploadDocumentOpen(false);
      setDocumentFile(null);
      setDocumentName("");
      setDocumentDescription("");
      setDocumentType("property");
      
      toast({
        title: "Document uploaded",
        description: "The document has been successfully uploaded and is now visible to the client.",
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Failed to upload document",
        description: "Could not upload the document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAddProperty = async () => {
    if (!selectedClient || !newProperty.address) {
      toast({
        title: "Missing information",
        description: "Please provide at least the property address.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const propertyData: Partial<ExtendedProperty> = {
        client_id: selectedClient.id,
        address: newProperty.address,
        name: newProperty.address,
        city: newProperty.city || "",
        state: newProperty.state || "",
        zip: newProperty.zip || "",
        type: newProperty.type || "residential",
        bedrooms: newProperty.bedrooms || 0,
        bathrooms: newProperty.bathrooms || 0,
        square_footage: newProperty.square_footage || 0,
        year_built: newProperty.year_built || 0,
        status: newProperty.status || "active",
        rental_rate: newProperty.rental_rate || 0,
        units: newProperty.units || 1,
        monthly_rent: newProperty.rental_rate || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Only send the fields that the API expects
      const dbPropertyData = {
        client_id: propertyData.client_id,
        address: propertyData.address,
        name: propertyData.name || propertyData.address,
        status: propertyData.status,
        units: propertyData.units,
        monthly_rent: propertyData.monthly_rent
      };
      
      const { data, error } = await supabase
        .from('properties')
        .insert([dbPropertyData])
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      // Merge the returned data with the additional fields
      const fullProperty: ExtendedProperty = {
        ...data,
        city: newProperty.city,
        state: newProperty.state,
        zip: newProperty.zip,
        type: newProperty.type,
        bedrooms: newProperty.bedrooms,
        bathrooms: newProperty.bathrooms,
        square_footage: newProperty.square_footage,
        year_built: newProperty.year_built,
        rental_rate: newProperty.rental_rate
      };
      
      setClientProperties([fullProperty, ...clientProperties]);
      
      setAddPropertyOpen(false);
      setNewProperty({});
      
      toast({
        title: "Property added",
        description: "The property has been successfully added to the client's portfolio.",
      });
    } catch (error) {
      console.error('Error adding property:', error);
      toast({
        title: "Failed to add property",
        description: "Could not add the property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      return;
    }
    
    try {
      const documentToDelete = clientDocuments.find(doc => doc.id === documentId);
      
      if (!documentToDelete) return;
      
      if (documentToDelete.file_path) {
        const { error: storageError } = await supabase
          .storage
          .from('client_documents')
          .remove([documentToDelete.file_path]);
        
        if (storageError) {
          console.error('Error deleting file from storage:', storageError);
        }
      }
      
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);
      
      if (dbError) {
        throw dbError;
      }
      
      setClientDocuments(clientDocuments.filter(doc => doc.id !== documentId));
      
      toast({
        title: "Document deleted",
        description: "The document has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Failed to delete document",
        description: "Could not delete the document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);
      
      if (error) {
        throw error;
      }
      
      setClientProperties(clientProperties.filter(prop => prop.id !== propertyId));
      
      toast({
        title: "Property deleted",
        description: "The property has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Failed to delete property",
        description: "Could not delete the property. Please try again.",
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
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </ZenoraButton>
      </div>
      
      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clients" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Accounts</CardTitle>
              <CardDescription>
                View and manage client information, documents, and properties.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zenora-purple"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Properties</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          No clients found
                        </TableCell>
                      </TableRow>
                    ) : (
                      clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.full_name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{new Date(client.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {clientProperties.filter(p => p.client_id === client.id).length}
                          </TableCell>
                          <TableCell>
                            {clientDocuments.filter(d => d.client_id === client.id).length}
                          </TableCell>
                          <TableCell className="text-right">
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage administrator and staff accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-10 text-muted-foreground">
                Team management coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={manageClientOpen} onOpenChange={setManageClientOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedClient?.full_name || 'Client'}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="settings">Dashboard Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input value={selectedClient?.full_name || ''} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={selectedClient?.email || ''} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={selectedClient?.phone || ''} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value={selectedClient?.address || ''} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label>Created</Label>
                  <Input 
                    value={selectedClient ? new Date(selectedClient.created_at).toLocaleString() : ''} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>
                <div>
                  <Label>Last Updated</Label>
                  <Input 
                    value={selectedClient ? new Date(selectedClient.updated_at).toLocaleString() : ''} 
                    readOnly 
                    className="bg-muted" 
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="properties" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Properties</h3>
                <ZenoraButton onClick={() => setAddPropertyOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </ZenoraButton>
              </div>
              
              {clientProperties.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground border rounded-lg">
                  <Building className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>No properties found for this client</p>
                  <ZenoraButton 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setAddPropertyOpen(true)}
                  >
                    Add First Property
                  </ZenoraButton>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clientProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">{property.address}</CardTitle>
                        <CardDescription>
                          {property.city}, {property.state} {property.zip}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Type:</span>
                            <p className="capitalize">{property.type}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Beds:</span>
                            <p>{property.bedrooms}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Baths:</span>
                            <p>{property.bathrooms}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Sq.Ft:</span>
                            <p>{property.square_footage}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Year:</span>
                            <p>{property.year_built}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Rent:</span>
                            <p>${property.rental_rate?.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-2 flex justify-end border-t bg-muted/20">
                        <ZenoraButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProperty(property.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </ZenoraButton>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Documents</h3>
                <ZenoraButton onClick={() => setUploadDocumentOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </ZenoraButton>
              </div>
              
              {clientDocuments.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground border rounded-lg">
                  <File className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>No documents found for this client</p>
                  <ZenoraButton 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setUploadDocumentOpen(true)}
                  >
                    Upload First Document
                  </ZenoraButton>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <a 
                            href={document.file_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium hover:underline flex items-center"
                          >
                            <File className="h-4 w-4 mr-2" />
                            {document.name}
                          </a>
                          {document.description && (
                            <p className="text-xs text-muted-foreground">{document.description}</p>
                          )}
                        </TableCell>
                        <TableCell className="capitalize">{document.type}</TableCell>
                        <TableCell>{formatFileSize(document.file_size || 0)}</TableCell>
                        <TableCell>{new Date(document.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {document.is_visible ? (
                              <>
                                <Eye className="h-4 w-4 mr-1 text-green-500" />
                                <span className="text-sm">Visible</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span className="text-sm">Hidden</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <ZenoraButton
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleDocumentVisibility(document.id, document.is_visible)}
                            >
                              {document.is_visible ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </ZenoraButton>
                            <ZenoraButton
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDocument(document.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </ZenoraButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Dashboard Visibility Settings</h3>
              <p className="text-muted-foreground">
                Control what the client can see on their dashboard
              </p>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show_properties" 
                    checked={clientSettings?.show_properties}
                    onCheckedChange={(checked) => 
                      setClientSettings(prev => prev ? { ...prev, show_properties: !!checked } : null)
                    }
                  />
                  <Label htmlFor="show_properties">Properties</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show_documents" 
                    checked={clientSettings?.show_documents}
                    onCheckedChange={(checked) => 
                      setClientSettings(prev => prev ? { ...prev, show_documents: !!checked } : null)
                    }
                  />
                  <Label htmlFor="show_documents">Documents</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show_financials" 
                    checked={clientSettings?.show_financials}
                    onCheckedChange={(checked) => 
                      setClientSettings(prev => prev ? { ...prev, show_financials: !!checked } : null)
                    }
                  />
                  <Label htmlFor="show_financials">Financials</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show_maintenance" 
                    checked={clientSettings?.show_maintenance}
                    onCheckedChange={(checked) => 
                      setClientSettings(prev => prev ? { ...prev, show_maintenance: !!checked } : null)
                    }
                  />
                  <Label htmlFor="show_maintenance">Maintenance</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show_ai_insights" 
                    checked={clientSettings?.show_ai_insights}
                    onCheckedChange={(checked) => 
                      setClientSettings(prev => prev ? { ...prev, show_ai_insights: !!checked } : null)
                    }
                  />
                  <Label htmlFor="show_ai_insights">AI Insights</Label>
                </div>
              </div>
              
              <ZenoraButton className="mt-4" onClick={updateClientSettings}>
                <Settings className="h-4 w-4 mr-2" />
                Save Settings
              </ZenoraButton>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <Dialog open={addPropertyOpen} onOpenChange={setAddPropertyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Property</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                value={newProperty.address || ''} 
                onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                placeholder="123 Main St"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={newProperty.city || ''} 
                  onChange={(e) => setNewProperty({...newProperty, city: e.target.value})}
                  placeholder="Anytown"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input 
                  id="state" 
                  value={newProperty.state || ''} 
                  onChange={(e) => setNewProperty({...newProperty, state: e.target.value})}
                  placeholder="CA"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input 
                  id="zip" 
                  value={newProperty.zip || ''} 
                  onChange={(e) => setNewProperty({...newProperty, zip: e.target.value})}
                  placeholder="90210"
                />
              </div>
              <div>
                <Label htmlFor="type">Property Type</Label>
                <select 
                  id="type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newProperty.type || 'residential'}
                  onChange={(e) => setNewProperty({...newProperty, type: e.target.value})}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="land">Land</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input 
                  id="bedrooms"
                  type="number" 
                  value={newProperty.bedrooms || ''} 
                  onChange={(e) => setNewProperty({...newProperty, bedrooms: parseInt(e.target.value) || 0})}
                  placeholder="3"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input 
                  id="bathrooms"
                  type="number" 
                  value={newProperty.bathrooms || ''} 
                  onChange={(e) => setNewProperty({...newProperty, bathrooms: parseInt(e.target.value) || 0})}
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor="square_footage">Square Footage</Label>
                <Input 
                  id="square_footage"
                  type="number" 
                  value={newProperty.square_footage || ''} 
                  onChange={(e) => setNewProperty({...newProperty, square_footage: parseInt(e.target.value) || 0})}
                  placeholder="1500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year_built">Year Built</Label>
                <Input 
                  id="year_built"
                  type="number" 
                  value={newProperty.year_built || ''} 
                  onChange={(e) => setNewProperty({...newProperty, year_built: parseInt(e.target.value) || 0})}
                  placeholder="2000"
                />
              </div>
              <div>
                <Label htmlFor="rental_rate">Monthly Rent ($)</Label>
                <Input 
                  id="rental_rate"
                  type="number" 
                  value={newProperty.rental_rate || ''} 
                  onChange={(e) => setNewProperty({...newProperty, rental_rate: parseInt(e.target.value) || 0})}
                  placeholder="2000"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <ZenoraButton variant="outline" onClick={() => setAddPropertyOpen(false)}>
              Cancel
            </ZenoraButton>
            <ZenoraButton onClick={handleAddProperty}>
              Add Property
            </ZenoraButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={uploadDocumentOpen} onOpenChange={setUploadDocumentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="documentName">Document Name</Label>
              <Input 
                id="documentName" 
                value={documentName} 
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Lease Agreement"
              />
            </div>
            
            <div>
              <Label htmlFor="documentDescription">Description (Optional)</Label>
              <Textarea 
                id="documentDescription" 
                value={documentDescription} 
                onChange={(e) => setDocumentDescription(e.target.value)}
                placeholder="Details about this document..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="documentType">Document Type</Label>
              <select 
                id="documentType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="property">Property Document</option>
                <option value="financial">Financial Document</option>
                <option value="legal">Legal Document</option>
                <option value="maintenance">Maintenance Document</option>
                <option value="communication">Communication</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="documentFile">File</Label>
              <Input 
                id="documentFile" 
                type="file" 
                onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <ZenoraButton variant="outline" onClick={() => setUploadDocumentOpen(false)} disabled={uploading}>
              Cancel
            </ZenoraButton>
            <ZenoraButton onClick={handleDocumentUpload} disabled={uploading || !documentFile || !documentName}>
              {uploading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </>
              )}
            </ZenoraButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const PropertiesManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Property Management</h2>
    <p className="mb-6 text-muted-foreground">Manage all properties in the system.</p>
    <div className="space-y-4">
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const FinancialsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Financial Management</h2>
    <p className="mb-6 text-muted-foreground">Manage system finances, payments, and subscriptions.</p>
    <div className="space-y-4">
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const InquiriesManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Inquiries Management</h2>
    <p className="mb-6 text-muted-foreground">Manage and respond to user inquiries and support requests.</p>
    <div className="space-y-4">
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const ReportsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Reports</h2>
    <p className="mb-6 text-muted-foreground">Generate and view system-wide reports and analytics.</p>
    <div className="space-y-4">
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const WebsiteManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Website Management</h2>
    <p className="mb-6 text-muted-foreground">Manage website content, blog posts, and SEO settings.</p>
    <div className="space-y-4">
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const NotificationsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Notifications</h2>
    <p className="mb-6 text-muted-foreground">Manage system notifications and announcements.</p>
    <div className="space-y-4">
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const SettingsManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">System Settings</h2>
    <p className="mb-6 text-muted-foreground">Configure global system settings and preferences.</p>
    <div className="space-y-4">
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

const SecurityManagement = () => (
  <div className="zenora-card p-6">
    <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
    <p className="mb-6 text-muted-foreground">Manage system security, access logs, and authentication settings.</p>
    <div className="space-y-4">
      <p>This feature is coming soon.</p>
    </div>
  </div>
);

export default Admin;
