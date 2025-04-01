
import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Index from '@/pages/Index';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Help from '@/pages/Help';
import Blog from '@/pages/Blog';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Security from '@/pages/Security';
import Cookies from '@/pages/Cookies';
import Careers from '@/pages/Careers';
import ContactPage from '@/pages/Contact';
import EmailTestPage from '@/pages/EmailTest';
import PropertyManagement from '@/pages/PropertyManagement';
import PropertyManagementDetail from '@/pages/PropertyManagementDetail';
import AIRentAnalysis from '@/pages/AIRentAnalysis';
import AIRentAnalysisDetail from '@/pages/AIRentAnalysisDetail';
import TenantScreening from '@/pages/TenantScreening';
import TenantScreeningDetail from '@/pages/TenantScreeningDetail';
import Maintenance from '@/pages/Maintenance';
import MaintenanceDetail from '@/pages/MaintenanceDetail';
import Pricing from '@/pages/Pricing';
import NotFound from '@/pages/NotFound';

function App() {
  console.log("App component rendering");
  
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/help" element={<Help />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/security" element={<Security />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/email-test" element={<EmailTestPage />} />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Service pages */}
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/ai-rent-analysis" element={<AIRentAnalysis />} />
        <Route path="/tenant-screening" element={<TenantScreening />} />
        <Route path="/maintenance" element={<Maintenance />} />
        
        {/* Service detail pages */}
        <Route path="/property-management/details" element={<PropertyManagementDetail />} />
        <Route path="/ai-rent-analysis/details" element={<AIRentAnalysisDetail />} />
        <Route path="/tenant-screening/details" element={<TenantScreeningDetail />} />
        <Route path="/maintenance/details" element={<MaintenanceDetail />} />
        
        {/* 404 route */}
        <Route path="/404" element={<NotFound />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
