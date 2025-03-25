import { Link } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Users, Building, DollarSign, Mail, Settings, BarChart3, Loader } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Client } from "@/types/supabase";

const AdminOverview = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [properties, setProperties] = useState<number>(0);
  const [inquiries, setInquiries] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Fetch real data from the database
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    
    async function loadDashboardData() {
      try {
        if (!isMounted) return;
        setLoading(true);
        
        // Add delay between retries
        if (retryCount > 0) {
          console.log(`Retry attempt ${retryCount}/${MAX_RETRIES} for loading dashboard data`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
        
        // Create separate try/catch blocks for each data fetch to handle partial failures
        
        // 1. Fetch clients
        try {
          const { data: clientsData, error: clientsError } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (clientsError) {
            console.error('Error fetching clients:', clientsError);
          } else if (isMounted) {
            setClients(clientsData as Client[] || []);
          }
        } catch (clientError) {
          console.error('Exception fetching clients:', clientError);
        }
        
        // 2. Fetch properties count
        try {
          const { data: propertiesData, error: propertiesError } = await supabase
            .from('properties')
            .select('id', { count: 'exact' });
          
          if (propertiesError) {
            console.error('Error fetching properties:', propertiesError);
          } else if (isMounted) {
            setProperties(propertiesData.length);
          }
        } catch (propError) {
          console.error('Exception fetching properties:', propError);
        }
        
        // 3. Fetch inquiries
        try {
          const { data: inquiriesData, error: inquiriesError } = await supabase
            .from('inquiries')
            .select('*')
            .eq('is_new', true);
          
          if (inquiriesError) {
            console.error('Error fetching inquiries:', inquiriesError);
          } else if (isMounted) {
            setInquiries(inquiriesData.length);
          }
        } catch (inquiryError) {
          console.error('Exception fetching inquiries:', inquiryError);
        }
        
        // Consider the operation successful if we've made it this far
        if (isMounted) {
          setLoading(false);
        }
        
      } catch (error) {
        console.error('Error loading admin dashboard data:', error);
        
        // Only show error toast if all retries failed and component is still mounted
        if (retryCount >= MAX_RETRIES && isMounted) {
          toast({
            title: "Failed to load dashboard data",
            description: "Could not retrieve the latest information. Please try refreshing the page.",
            variant: "destructive",
          });
          setLoading(false);
        } else if (isMounted) {
          // Retry logic
          retryCount++;
          if (retryCount <= MAX_RETRIES) {
            console.log(`Will retry loading dashboard data (${retryCount}/${MAX_RETRIES})`);
            loadDashboardData(); // Recursive call to retry
          } else {
            setLoading(false);
          }
        }
      }
    }
    
    // Initial load
    loadDashboardData();
    
    // Set up data refresh interval - reload every 2 minutes
    const refreshInterval = setInterval(() => {
      if (isMounted) {
        console.log('Refreshing dashboard data...');
        retryCount = 0; // Reset retry count for periodic refreshes
        loadDashboardData();
      }
    }, 2 * 60 * 1000);
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
    };
  }, []);

  // Calculate estimated monthly revenue
  const estimatedMonthlyRevenue = clients.length * 99; // $99 per client per month

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader className="h-12 w-12 animate-spin text-zenora-purple" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Clients</h3>
                <div className="p-2 bg-zenora-purple/10 rounded-full">
                  <Users className="h-5 w-5 text-zenora-purple" />
                </div>
              </div>
              <p className="text-3xl font-bold">{clients.length}</p>
              <p className="text-sm text-muted-foreground">Total active clients</p>
            </div>
            
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Properties</h3>
                <div className="p-2 bg-blue-100 rounded-full">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">{properties}</p>
              <p className="text-sm text-muted-foreground">Properties under management</p>
            </div>
            
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Revenue</h3>
                <div className="p-2 bg-green-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">${estimatedMonthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Estimated monthly revenue</p>
            </div>
            
            <div className="zenora-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Inquiries</h3>
                <div className="p-2 bg-amber-100 rounded-full">
                  <Mail className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-3xl font-bold">{inquiries}</p>
              <p className="text-sm text-muted-foreground">New inquiries</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="zenora-card p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Recent Client Activity</h2>
                  <ZenoraButton variant="outline" size="sm" as={Link} to="/admin/users">
                    View All
                  </ZenoraButton>
                </div>
                
                {clients.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border rounded-lg">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No clients found.</p>
                    <p className="text-sm">Clients will appear here when they create accounts.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clients.slice(0, 5).map((client) => (
                          <TableRow key={client.id}>
                            <TableCell>
                              <div className="font-medium">{client.full_name || "Unnamed User"}</div>
                              <div className="text-sm text-muted-foreground">{client.email}</div>
                            </TableCell>
                            <TableCell>
                              {new Date(client.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-700">
                                Active
                              </span>
                            </TableCell>
                            <TableCell>
                              <ZenoraButton variant="outline" size="sm" as={Link} to={`/admin/users?clientId=${client.id}`}>
                                View
                              </ZenoraButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
              
              <div className="zenora-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Recent Inquiries</h2>
                  <ZenoraButton variant="outline" size="sm" as={Link} to="/admin/inquiries">
                    View All
                  </ZenoraButton>
                </div>
                
                <div className="space-y-4">
                  {inquiries === 0 ? (
                    <div className="text-center py-8 text-muted-foreground border rounded-lg">
                      <Mail className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p>No new inquiries.</p>
                      <p className="text-sm">New inquiries will appear here when customers contact you.</p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground border rounded-lg">
                      <Mail className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p>You have {inquiries} new inquiries.</p>
                      <p className="text-sm">Visit the inquiries section to view them.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <div className="zenora-card p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Performance Overview</h2>
                  <ZenoraButton variant="outline" size="sm" as={Link} to="/admin/reports">
                    All Reports
                  </ZenoraButton>
                </div>
                <div className="h-60 flex items-center justify-center border border-border rounded-lg mb-4">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Monthly overview of clients, properties, and revenue.
                </p>
              </div>
              
              <div className="zenora-card p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <ZenoraButton variant="outline" size="sm" className="w-full justify-start" as={Link} to="/admin/users">
                    <Users className="mr-2 h-4 w-4" /> Manage Users
                  </ZenoraButton>
                  <ZenoraButton variant="outline" size="sm" className="w-full justify-start" as={Link} to="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" /> System Settings
                  </ZenoraButton>
                  <ZenoraButton variant="outline" size="sm" className="w-full justify-start" as={Link} to="/admin/inquiries">
                    <Mail className="mr-2 h-4 w-4" /> View Inquiries
                  </ZenoraButton>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminOverview;
