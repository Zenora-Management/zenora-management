
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Login from '@/pages/Login';
import Help from '@/pages/Help';
import Blog from '@/pages/Blog';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Security from '@/pages/Security';
import Cookies from '@/pages/Cookies';
import Careers from '@/pages/Careers';
import ContactPage from '@/pages/Contact';
import EmailTestPage from '@/pages/EmailTest';
import Dashboard from '@/pages/Dashboard';
import Auth from '@/components/auth/Auth';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Zenora - AI Property Management</title>
        <meta name="description" content="AI-powered property management that makes landlords' lives easier." />
      </Helmet>
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/help" element={<Help />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/security" element={<Security />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/email-test" element={<EmailTestPage />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
