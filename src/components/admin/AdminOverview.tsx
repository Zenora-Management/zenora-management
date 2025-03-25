
import { Link } from "react-router-dom";
import { ZenoraButton } from "@/components/ui/button-zenora";
import { Users, Building, DollarSign, Mail, Settings, BarChart3 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminOverview = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="zenora-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Clients</h3>
            <div className="p-2 bg-zenora-purple/10 rounded-full">
              <Users className="h-5 w-5 text-zenora-purple" />
            </div>
          </div>
          <p className="text-3xl font-bold">42</p>
          <p className="text-sm text-muted-foreground">Total active clients</p>
        </div>
        
        <div className="zenora-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Properties</h3>
            <div className="p-2 bg-blue-100 rounded-full">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">78</p>
          <p className="text-sm text-muted-foreground">Properties under management</p>
        </div>
        
        <div className="zenora-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Revenue</h3>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">$83,950</p>
          <p className="text-sm text-muted-foreground">Monthly revenue</p>
        </div>
        
        <div className="zenora-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Inquiries</h3>
            <div className="p-2 bg-amber-100 rounded-full">
              <Mail className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-muted-foreground">New inquiries this week</p>
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
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Properties</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "John Smith", email: "john@example.com", properties: 2, status: "Active" },
                    { name: "Maria Garcia", email: "maria@example.com", properties: 1, status: "Active" },
                    { name: "Robert Chen", email: "robert@example.com", properties: 3, status: "Active" },
                    { name: "Sarah Johnson", email: "sarah@example.com", properties: 1, status: "Pending" },
                    { name: "David Kim", email: "david@example.com", properties: 2, status: "Active" },
                  ].map((client, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">{client.email}</div>
                      </TableCell>
                      <TableCell>{client.properties}</TableCell>
                      <TableCell>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          client.status === "Active" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {client.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <ZenoraButton variant="outline" size="sm">
                          View
                        </ZenoraButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="zenora-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Inquiries</h2>
              <ZenoraButton variant="outline" size="sm" as={Link} to="/admin/inquiries">
                View All
              </ZenoraButton>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  name: "Michael Turner",
                  email: "michael@example.com",
                  subject: "Inquiry about Client Plan",
                  date: "2 hours ago",
                  isDemoRequest: false,
                },
                {
                  name: "Jennifer Lee",
                  email: "jennifer@example.com",
                  subject: "Request a Demo",
                  date: "5 hours ago",
                  isDemoRequest: true,
                },
                {
                  name: "Thomas Wilson",
                  email: "thomas@example.com",
                  subject: "Pricing Information",
                  date: "1 day ago",
                  isDemoRequest: false,
                },
              ].map((inquiry, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h3 className="font-medium">{inquiry.name}</h3>
                    <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    <p className="text-sm">
                      {inquiry.subject}
                      {inquiry.isDemoRequest && (
                        <span className="ml-2 bg-zenora-purple/10 text-zenora-purple px-2 py-0.5 rounded-full text-xs">
                          Demo Request
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{inquiry.date}</p>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <ZenoraButton variant="outline" size="sm">
                      View
                    </ZenoraButton>
                  </div>
                </div>
              ))}
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
              Monthly overview of properties, occupancy rates, and revenue generation.
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
  );
};

export default AdminOverview;
