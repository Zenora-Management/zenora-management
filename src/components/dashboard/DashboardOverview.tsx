import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Building, PieChart, User, HelpCircle, Zap, Settings, FileText, Clock, AlertTriangle, Loader } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ClientSettings, Property, Document } from "@/types/supabase";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DashboardOverview = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<ClientSettings | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    // Set up mounted ref for cleanup
    isMountedRef.current = true;
    
    // Track retry attempts
    let retryCount = 0;
    const MAX_RETRIES = 3;
    
    async function loadClientData() {
      if (!user) return;
      
      try {
        if (!isMountedRef.current) return;
        
        // Add delay between retries to avoid hammering the server
        if (retryCount > 0) {
          console.log(`Retry attempt ${retryCount}/${MAX_RETRIES} for loading dashboard data`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
        
        setLoading(true);
        setError(null);
        
        // Fetch client settings
        let clientSettings: ClientSettings | null = null;
        try {
          const { data: settingsData, error: settingsError } = await supabase
            .from('client_settings')
            .select('*')
            .eq('client_id', user.id)
            .single();
            
          if (settingsError && settingsError.code !== 'PGRST116') {
            console.error('Error fetching client settings:', settingsError);
            // Continue with defaults instead of throwing
          }
          
          // If no settings found, use defaults
          clientSettings = settingsData || {
            client_id: user.id,
            show_properties: true,
            show_documents: true,
            show_financials: true,
            show_maintenance: true,
            show_ai_insights: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as ClientSettings;
          
          if (isMountedRef.current) {
            setSettings(clientSettings);
            console.log('Client settings loaded successfully');
          }
        } catch (settingsError) {
          console.error('Exception in settings fetch:', settingsError);
          // Use defaults if there's an error
          clientSettings = {
            client_id: user.id,
            show_properties: true,
            show_documents: true,
            show_financials: true,
            show_maintenance: true,
            show_ai_insights: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as ClientSettings;
          
          if (isMountedRef.current) {
            setSettings(clientSettings);
          }
        }
        
        // Only continue if we have settings
        if (!clientSettings) {
          throw new Error("Could not initialize client settings");
        }
        
        // Fetch properties if enabled
        if (clientSettings.show_properties) {
          try {
            const { data: propertiesData, error: propertiesError } = await supabase
              .from('properties')
              .select('*')
              .eq('client_id', user.id)
              .order('created_at', { ascending: false });
              
            if (propertiesError) {
              console.error('Error fetching properties:', propertiesError);
              // Continue instead of throwing
            }
            
            if (isMountedRef.current) {
              setProperties(propertiesData as Property[] || []);
              console.log('Properties loaded successfully:', propertiesData?.length || 0);
            }
          } catch (propError) {
            console.error('Error in properties fetch:', propError);
            // Don't let property errors break the entire dashboard
          }
        }
        
        // Fetch documents if enabled
        if (clientSettings.show_documents) {
          try {
            const { data: documentsData, error: documentsError } = await supabase
              .from('documents')
              .select('*')
              .eq('client_id', user.id)
              .eq('is_visible', true)
              .order('created_at', { ascending: false });
              
            if (documentsError) {
              console.error('Error fetching documents:', documentsError);
              // Continue instead of throwing
            }
            
            if (isMountedRef.current) {
              setDocuments(documentsData as Document[] || []);
              console.log('Documents loaded successfully:', documentsData?.length || 0);
            }
          } catch (docError) {
            console.error('Error in documents fetch:', docError);
            // Don't let document errors break the entire dashboard
          }
        }
        
        // All data loaded, clear loading state
        if (isMountedRef.current) {
          setLoading(false);
          console.log('Dashboard data loaded completely');
        }
        
      } catch (error) {
        console.error('Error loading client data:', error);
        
        // Only show toast and set error if all retries failed and component is still mounted
        if (retryCount >= MAX_RETRIES && isMountedRef.current) {
          setError('Failed to load dashboard data. Please try refreshing the page.');
          toast({
            title: "Failed to load data",
            description: "Could not retrieve your dashboard information. Please try again.",
            variant: "destructive",
          });
          setLoading(false);
        } else if (isMountedRef.current) {
          // Retry logic
          retryCount++;
          if (retryCount <= MAX_RETRIES) {
            console.log(`Will retry loading dashboard data (${retryCount}/${MAX_RETRIES})`);
            loadClientData(); // Recursive call to retry
          } else {
            setLoading(false);
          }
        }
      }
    }
    
    // Initial load
    loadClientData();
    
    // Set up data refresh interval - reload every 3 minutes
    const refreshInterval = setInterval(() => {
      if (isMountedRef.current && user) {
        console.log('Refreshing dashboard data...');
        retryCount = 0; // Reset retry count for periodic refreshes
        loadClientData();
      }
    }, 3 * 60 * 1000);
    
    // Cleanup function
    return () => {
      isMountedRef.current = false;
      clearInterval(refreshInterval);
      console.log('Dashboard cleanup: unmounted and cleared interval');
    };
  }, [user]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader className="h-12 w-12 animate-spin text-zenora-purple" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <ZenoraButton onClick={() => window.location.reload()}>
          Reload Dashboard
        </ZenoraButton>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-6">
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Welcome to your Dashboard</AlertTitle>
          <AlertDescription>
            It looks like this is your first time here. Please set up your preferences to customize your dashboard.
          </AlertDescription>
        </Alert>
        <ZenoraButton as={Link} to="/dashboard/settings">
          <Settings className="mr-2 h-4 w-4" /> Set Up Dashboard
        </ZenoraButton>
      </div>
    );
  }

  return (
    <>
      {settings?.show_properties && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="zenora-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Properties</h3>
              <div className="p-2 bg-zenora-purple/10 rounded-full">
                <Building className="h-5 w-5 text-zenora-purple" />
              </div>
            </div>
            <p className="text-3xl font-bold">{properties.length}</p>
            <p className="text-sm text-muted-foreground">Total properties under management</p>
          </div>
          
          {settings?.show_financials && (
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Occupancy</h3>
                <div className="p-2 bg-green-100 rounded-full">
                  <User className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">
                {properties.filter(p => p.status === 'Occupied').length === properties.length && properties.length > 0
                  ? '100%'
                  : properties.length === 0
                  ? '0%'
                  : `${Math.round((properties.filter(p => p.status === 'Occupied').length / properties.length) * 100)}%`
                }
              </p>
              <p className="text-sm text-muted-foreground">
                {properties.filter(p => p.status === 'Occupied').length === properties.length && properties.length > 0
                  ? 'All units are currently occupied'
                  : properties.length === 0
                  ? 'No properties added yet'
                  : `${properties.filter(p => p.status === 'Occupied').length} of ${properties.length} units occupied`
                }
              </p>
            </div>
          )}
          
          {settings?.show_financials && (
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Revenue</h3>
                <div className="p-2 bg-blue-100 rounded-full">
                  <PieChart className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">
                ${properties
                  .filter(p => p.status === 'Occupied')
                  .reduce((sum, property) => sum + (property.monthly_rent || 0), 0)
                  .toLocaleString()
                }
              </p>
              <p className="text-sm text-muted-foreground">Monthly rental income</p>
            </div>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {settings?.show_properties && (
          <div className="lg:col-span-2">
            <div className="zenora-card p-6 h-full">
              <h2 className="text-xl font-bold mb-6">Your Properties</h2>
              
              <div className="space-y-4">
                {properties.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border rounded-lg">
                    <Building className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No properties found.</p>
                    <p className="text-sm">Your properties will appear here once they're added to your account.</p>
                  </div>
                ) : (
                  properties.map((property) => (
                    <div key={property.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-medium">{property.name}</h3>
                        <p className="text-sm text-muted-foreground">{property.address}</p>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <span className={`text-sm ${
                          property.status === 'Occupied' 
                            ? 'bg-green-100 text-green-700' 
                            : property.status === 'Vacant'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                          } py-1 px-3 rounded-full`}>
                          {property.status}
                        </span>
                        <ZenoraButton variant="outline" size="sm" className="ml-3" as={Link} to={`/dashboard/properties/${property.id}`}>
                          View
                        </ZenoraButton>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="mt-6">
                <ZenoraButton as={Link} to="/dashboard/properties">
                  <Building className="mr-2 h-4 w-4" /> Manage Properties
                </ZenoraButton>
              </div>
            </div>
          </div>
        )}
        
        <div>
          {settings?.show_ai_insights && (
            <div className="zenora-card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">AI Insights</h2>
              <div className="p-4 border border-zenora-purple/30 bg-zenora-purple/5 rounded-lg">
                <p className="text-sm mb-2">
                  <strong>Rent Optimization:</strong> Based on current market trends, you could increase rent on your properties by 5% upon renewal.
                </p>
                <ZenoraButton variant="outline" size="sm" className="w-full" as={Link} to="/dashboard/ai-rent-analysis">
                  <Zap className="mr-2 h-4 w-4" /> View Rent Analysis
                </ZenoraButton>
              </div>
            </div>
          )}
          
          {settings?.show_documents && (
            <div className="zenora-card p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Documents</h2>
                <ZenoraButton variant="outline" size="sm" as={Link} to="/dashboard/documents">View All</ZenoraButton>
              </div>
              
              {documents.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground border rounded-lg">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No documents available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.slice(0, 3).map(doc => (
                    <div key={doc.id} className="flex items-center p-3 border rounded-lg">
                      <FileText className="h-4 w-4 text-muted-foreground mr-3" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> 
                          {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <ZenoraButton variant="outline" size="sm">View</ZenoraButton>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="zenora-card p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <ZenoraButton variant="outline" size="sm" className="w-full justify-start" as={Link} to="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" /> Account Settings
              </ZenoraButton>
              <ZenoraButton variant="outline" size="sm" className="w-full justify-start" as={Link} to="/dashboard/help">
                <HelpCircle className="mr-2 h-4 w-4" /> Get Support
              </ZenoraButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
