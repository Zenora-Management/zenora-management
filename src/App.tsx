
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
import Admin from '@/pages/Admin';
import Auth from '@/components/auth/Auth';
import AdminAuth from '@/components/auth/AdminAuth';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <>
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
        
        {/* Protected routes - User Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
        
        {/* Protected routes - Admin Dashboard */}
        <Route
          path="/admin/*"
          element={
            <AdminAuth>
              <Admin />
            </AdminAuth>
          }
        />
        
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
