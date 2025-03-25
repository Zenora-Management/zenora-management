
-- Create clients table to store user information
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create properties table for client properties
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  units INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'Vacant', -- Vacant, Occupied, Maintenance
  monthly_rent DECIMAL(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create documents table for user documents
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT true, -- Controls if user can see this document
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create client_settings table for customizing user dashboard visibility
CREATE TABLE IF NOT EXISTS public.client_settings (
  client_id UUID PRIMARY KEY REFERENCES public.clients(id) ON DELETE CASCADE,
  show_properties BOOLEAN NOT NULL DEFAULT true,
  show_documents BOOLEAN NOT NULL DEFAULT true,
  show_financials BOOLEAN NOT NULL DEFAULT true,
  show_maintenance BOOLEAN NOT NULL DEFAULT true,
  show_ai_insights BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for clients table
CREATE POLICY "Clients can view own data" ON public.clients
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all clients" ON public.clients
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND auth.users.email IN ('anshparikh@gmail.com', 'anvisrini@gmail.com', 'zenoramgmt@gmail.com')
  ));

-- Create policies for properties table
CREATE POLICY "Clients can view own properties" ON public.properties
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Admins can view all properties" ON public.properties
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND auth.users.email IN ('anshparikh@gmail.com', 'anvisrini@gmail.com', 'zenoramgmt@gmail.com')
  ));

CREATE POLICY "Admins can insert properties" ON public.properties
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND auth.users.email IN ('anshparikh@gmail.com', 'anvisrini@gmail.com', 'zenoramgmt@gmail.com')
  ));

CREATE POLICY "Admins can update properties" ON public.properties
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND auth.users.email IN ('anshparikh@gmail.com', 'anvisrini@gmail.com', 'zenoramgmt@gmail.com')
  ));

-- Create policies for documents table
CREATE POLICY "Clients can view their visible documents" ON public.documents
  FOR SELECT USING (
    auth.uid() = client_id AND is_visible = true
  );

CREATE POLICY "Admins can view all documents" ON public.documents
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND auth.users.email IN ('anshparikh@gmail.com', 'anvisrini@gmail.com', 'zenoramgmt@gmail.com')
  ));

CREATE POLICY "Admins can insert documents" ON public.documents
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND auth.users.email IN ('anshparikh@gmail.com', 'anvisrini@gmail.com', 'zenoramgmt@gmail.com')
  ));

CREATE POLICY "Admins can update documents" ON public.documents
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND auth.users.email IN ('anshparikh@gmail.com', 'anvisrini@gmail.com', 'zenoramgmt@gmail.com')
  ));

-- Create policies for client_settings table
CREATE POLICY "Clients can view own settings" ON public.client_settings
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Admins can view all client settings" ON public.client_settings
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND auth.users.email IN ('anshparikh@gmail.com', 'anvisrini@gmail.com', 'zenoramgmt@gmail.com')
  ));

CREATE POLICY "Admins can update client settings" ON public.client_settings
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.uid() = auth.users.id AND auth.users.email IN ('anshparikh@gmail.com', 'anvisrini@gmail.com', 'zenoramgmt@gmail.com')
  ));

-- Create triggers to auto-insert default settings when a new client is created
CREATE OR REPLACE FUNCTION public.handle_new_client()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.client_settings (client_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_client_created
  AFTER INSERT ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_client(); 
