
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PropertyManagement from "./pages/PropertyManagement";
import PropertyManagementDetail from "./pages/PropertyManagementDetail";
import AIRentAnalysisDetail from "./pages/AIRentAnalysisDetail";
import TenantScreeningDetail from "./pages/TenantScreeningDetail";
import MaintenanceDetail from "./pages/MaintenanceDetail";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Upgrade from "./pages/Upgrade";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Security from "./pages/Security";
import Blog from "./pages/Blog";
import AIRentAnalysis from "./pages/AIRentAnalysis";
import TenantScreening from "./pages/TenantScreening";
import Maintenance from "./pages/Maintenance";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PropertyDetail from "./pages/PropertyDetail";
import PropertyCreate from "./pages/PropertyCreate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/security" element={<Security />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/help" element={<Help />} />
            
            {/* Service Landing Pages */}
            <Route path="/property-management" element={<PropertyManagement />} />
            <Route path="/property-management/details" element={<PropertyManagementDetail />} />
            <Route path="/ai-rent-analysis/details" element={<AIRentAnalysisDetail />} />
            <Route path="/tenant-screening/details" element={<TenantScreeningDetail />} />
            <Route path="/maintenance/details" element={<MaintenanceDetail />} />
            
            {/* Protected User Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/properties/:id" element={<ProtectedRoute><PropertyDetail /></ProtectedRoute>} />
            <Route path="/dashboard/properties/add" element={<ProtectedRoute><PropertyCreate /></ProtectedRoute>} />
            <Route path="/ai-rent-analysis" element={<ProtectedRoute><AIRentAnalysis /></ProtectedRoute>} />
            <Route path="/tenant-screening" element={<ProtectedRoute><TenantScreening /></ProtectedRoute>} />
            <Route path="/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute isAdmin><Admin /></ProtectedRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
