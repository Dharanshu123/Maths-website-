-- =============================================
-- COMPLETE SUPABASE BACKEND SCHEMA
-- Business Website with Admin Panel
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- 1. USER MANAGEMENT & AUTHENTICATION
-- =============================================

-- Custom user profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. CONTENT MANAGEMENT
-- =============================================

-- Pages content management
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    meta_description TEXT,
    content JSONB, -- Flexible content structure
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog/News articles
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    category TEXT,
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    author_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. BUSINESS DATA
-- =============================================

-- Services offered
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    price DECIMAL(10,2),
    duration_minutes INTEGER,
    category TEXT,
    features JSONB, -- Array of features
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pricing plans
CREATE TABLE IF NOT EXISTS public.pricing_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    billing_period TEXT DEFAULT 'monthly' CHECK (billing_period IN ('monthly', 'yearly', 'one-time')),
    features JSONB, -- Array of features
    is_popular BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT,
    bio TEXT,
    image_url TEXT,
    email TEXT,
    phone TEXT,
    social_links JSONB, -- {linkedin, twitter, etc}
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 4. CUSTOMER INTERACTION
-- =============================================

-- Enhanced contacts table (update existing)
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent'));
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id);
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS follow_up_date TIMESTAMPTZ;

-- Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    position TEXT,
    message TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ system
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    is_published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    source TEXT, -- Where they subscribed from
    tags TEXT[],
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ
);

-- =============================================
-- 5. BUSINESS OPERATIONS
-- =============================================

-- Appointments/Bookings
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    service_id UUID REFERENCES public.services(id),
    appointment_date TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show')),
    notes TEXT,
    assigned_to UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- File uploads/Media library
CREATE TABLE IF NOT EXISTS public.media_files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    alt_text TEXT,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics/Tracking
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_type TEXT NOT NULL, -- 'page_view', 'form_submit', 'download', etc.
    event_data JSONB,
    user_id UUID REFERENCES auth.users(id),
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 6. SYSTEM SETTINGS
-- =============================================

-- Site settings/configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB,
    description TEXT,
    updated_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 7. TRIGGERS FOR UPDATED_AT
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pricing_plans_updated_at BEFORE UPDATE ON public.pricing_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 8. SAMPLE DATA
-- =============================================

-- Insert sample services
INSERT INTO public.services (name, description, short_description, price, duration_minutes, category, features, image_url) VALUES
('Web Development', 'Complete website development from design to deployment', 'Custom websites built with modern technologies', 2999.00, 480, 'development', '["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile Friendly"]', '/images/services/web-dev.jpg'),
('Digital Marketing', 'Comprehensive digital marketing strategy and execution', 'Grow your business with targeted marketing', 1499.00, 240, 'marketing', '["Social Media", "Google Ads", "Content Strategy", "Analytics"]', '/images/services/marketing.jpg'),
('Consulting', 'Business and technology consulting services', 'Expert advice for your business growth', 199.00, 60, 'consulting', '["Strategy Planning", "Technology Audit", "Process Optimization"]', '/images/services/consulting.jpg');

-- Insert sample pricing plans
INSERT INTO public.pricing_plans (name, description, price, billing_period, features, is_popular) VALUES
('Starter', 'Perfect for small businesses getting started', 99.00, 'monthly', '["5 Pages Website", "Basic SEO", "Mobile Responsive", "Email Support"]', false),
('Professional', 'Ideal for growing businesses', 199.00, 'monthly', '["15 Pages Website", "Advanced SEO", "E-commerce Ready", "Priority Support", "Analytics Dashboard"]', true),
('Enterprise', 'For large organizations with complex needs', 499.00, 'monthly', '["Unlimited Pages", "Custom Development", "24/7 Support", "Advanced Analytics", "API Integration", "Dedicated Manager"]', false);

-- Insert sample FAQs
INSERT INTO public.faqs (question, answer, category, sort_order) VALUES
('How long does it take to build a website?', 'Typically, a standard business website takes 2-4 weeks to complete, depending on complexity and content requirements.', 'general', 1),
('Do you provide ongoing support?', 'Yes, we offer various support packages including maintenance, updates, and technical assistance.', 'support', 2),
('Can you help with SEO?', 'Absolutely! All our websites come with basic SEO optimization, and we offer advanced SEO services as well.', 'seo', 3);

-- Insert sample site settings
INSERT INTO public.site_settings (key, value, description) VALUES
('site_name', '"Your Business Name"', 'The name of your website/business'),
('contact_email', '"info@yourbusiness.com"', 'Main contact email address'),
('contact_phone', '"+1 (555) 123-4567"', 'Main contact phone number'),
('business_hours', '{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 6:00 PM", "saturday": "10:00 AM - 4:00 PM", "sunday": "Closed"}', 'Business operating hours'),
('social_links', '{"facebook": "https://facebook.com/yourbusiness", "twitter": "https://twitter.com/yourbusiness", "linkedin": "https://linkedin.com/company/yourbusiness", "instagram": "https://instagram.com/yourbusiness"}', 'Social media links');
