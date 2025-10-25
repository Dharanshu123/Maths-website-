-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- Secure access control for all tables
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is admin or manager
CREATE OR REPLACE FUNCTION is_admin_or_manager(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = user_id AND role IN ('admin', 'manager')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- USER PROFILES POLICIES
-- =============================================

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (except role)
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles" ON public.user_profiles
  FOR SELECT USING (is_admin(auth.uid()));

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles" ON public.user_profiles
  FOR UPDATE USING (is_admin(auth.uid()));

-- =============================================
-- PUBLIC CONTENT POLICIES (READ-ONLY)
-- =============================================

-- Anyone can read published pages
CREATE POLICY "Anyone can read published pages" ON public.pages
  FOR SELECT USING (is_published = true);

-- Admins can manage all pages
CREATE POLICY "Admins can manage pages" ON public.pages
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Anyone can read published articles
CREATE POLICY "Anyone can read published articles" ON public.articles
  FOR SELECT USING (is_published = true);

-- Admins can manage articles
CREATE POLICY "Admins can manage articles" ON public.articles
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Anyone can read active services
CREATE POLICY "Anyone can read active services" ON public.services
  FOR SELECT USING (is_active = true);

-- Admins can manage services
CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Anyone can read active pricing plans
CREATE POLICY "Anyone can read active pricing plans" ON public.pricing_plans
  FOR SELECT USING (is_active = true);

-- Admins can manage pricing plans
CREATE POLICY "Admins can manage pricing plans" ON public.pricing_plans
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Anyone can read active team members
CREATE POLICY "Anyone can read active team members" ON public.team_members
  FOR SELECT USING (is_active = true);

-- Admins can manage team members
CREATE POLICY "Admins can manage team members" ON public.team_members
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Anyone can read published FAQs
CREATE POLICY "Anyone can read published faqs" ON public.faqs
  FOR SELECT USING (is_published = true);

-- Admins can manage FAQs
CREATE POLICY "Admins can manage faqs" ON public.faqs
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Anyone can read approved testimonials
CREATE POLICY "Anyone can read approved testimonials" ON public.testimonials
  FOR SELECT USING (is_approved = true);

-- Admins can manage testimonials
CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- =============================================
-- CONTACT & INTERACTION POLICIES
-- =============================================

-- Anyone can create contacts (contact form submissions)
CREATE POLICY "Anyone can create contacts" ON public.contacts
  FOR INSERT WITH CHECK (true);

-- Admins can read all contacts
CREATE POLICY "Admins can read contacts" ON public.contacts
  FOR SELECT USING (is_admin_or_manager(auth.uid()));

-- Admins can update contacts
CREATE POLICY "Admins can update contacts" ON public.contacts
  FOR UPDATE USING (is_admin_or_manager(auth.uid()));

-- Anyone can subscribe to newsletter
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Subscribers can update their own subscription
CREATE POLICY "Users can update own subscription" ON public.newsletter_subscribers
  FOR UPDATE USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Admins can manage newsletter subscribers
CREATE POLICY "Admins can manage newsletter" ON public.newsletter_subscribers
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- =============================================
-- APPOINTMENT POLICIES
-- =============================================

-- Anyone can create appointments
CREATE POLICY "Anyone can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (true);

-- Users can read their own appointments (by email)
CREATE POLICY "Users can read own appointments" ON public.appointments
  FOR SELECT USING (
    client_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Admins can manage all appointments
CREATE POLICY "Admins can manage appointments" ON public.appointments
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- =============================================
-- MEDIA & ANALYTICS POLICIES
-- =============================================

-- Authenticated users can upload media
CREATE POLICY "Authenticated users can upload media" ON public.media_files
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Users can read their own uploaded media
CREATE POLICY "Users can read own media" ON public.media_files
  FOR SELECT USING (uploaded_by = auth.uid());

-- Admins can manage all media
CREATE POLICY "Admins can manage media" ON public.media_files
  FOR ALL USING (is_admin_or_manager(auth.uid()));

-- Anyone can create analytics events (for tracking)
CREATE POLICY "Anyone can create analytics events" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- Admins can read analytics
CREATE POLICY "Admins can read analytics" ON public.analytics_events
  FOR SELECT USING (is_admin(auth.uid()));

-- =============================================
-- SITE SETTINGS POLICIES
-- =============================================

-- Anyone can read site settings
CREATE POLICY "Anyone can read site settings" ON public.site_settings
  FOR SELECT USING (true);

-- Only admins can manage site settings
CREATE POLICY "Admins can manage site settings" ON public.site_settings
  FOR ALL USING (is_admin(auth.uid()));

-- =============================================
-- FUNCTION TO CREATE ADMIN USER
-- =============================================

-- Function to create first admin user (run this after user signs up)
CREATE OR REPLACE FUNCTION create_admin_user(user_email TEXT)
RETURNS VOID AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Get user ID from auth.users
  SELECT id INTO user_id FROM auth.users WHERE email = user_email;
  
  IF user_id IS NOT NULL THEN
    -- Insert or update user profile as admin
    INSERT INTO public.user_profiles (id, email, role, full_name)
    VALUES (user_id, user_email, 'admin', 'Administrator')
    ON CONFLICT (id) 
    DO UPDATE SET role = 'admin';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- TRIGGER TO AUTO-CREATE USER PROFILES
-- =============================================

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
