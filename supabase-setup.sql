-- =====================================================
-- COMPLETE SUPABASE DATABASE SETUP
-- Run these scripts in your Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. CONTACTS TABLE (Contact Form Submissions)
-- =====================================================
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  service_interest VARCHAR(255),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts
CREATE POLICY "Allow public inserts on contacts" ON contacts
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read contacts" ON contacts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update contacts" ON contacts
  FOR UPDATE TO authenticated USING (true);

-- Create indexes for contacts
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_email ON contacts(email);

-- =====================================================
-- 2. TESTIMONIALS TABLE (Customer Reviews)
-- =====================================================
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  position VARCHAR(255),
  message TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials
CREATE POLICY "Allow public to read published testimonials" ON testimonials
  FOR SELECT TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Allow authenticated users to manage testimonials" ON testimonials
  FOR ALL TO authenticated USING (true);

-- Create indexes for testimonials
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured, is_published);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at);

-- =====================================================
-- 3. FAQS TABLE (Frequently Asked Questions)
-- =====================================================
CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  is_published BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for FAQs
CREATE POLICY "Allow public to read published faqs" ON faqs
  FOR SELECT TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Allow authenticated users to manage faqs" ON faqs
  FOR ALL TO authenticated USING (true);

-- Create indexes for FAQs
CREATE INDEX idx_faqs_published ON faqs(is_published, order_index);
CREATE INDEX idx_faqs_category ON faqs(category, is_published);

-- =====================================================
-- 4. SERVICES TABLE (Service Offerings)
-- =====================================================
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2),
  price_type VARCHAR(50) DEFAULT 'fixed',
  features JSONB DEFAULT '[]',
  image_url TEXT,
  icon_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies for services
CREATE POLICY "Allow public to read published services" ON services
  FOR SELECT TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Allow authenticated users to manage services" ON services
  FOR ALL TO authenticated USING (true);

-- Create indexes for services
CREATE INDEX idx_services_published ON services(is_published, order_index);
CREATE INDEX idx_services_featured ON services(is_featured, is_published);

-- =====================================================
-- 5. PRICING PLANS TABLE (Pricing Page)
-- =====================================================
CREATE TABLE pricing_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  price_period VARCHAR(50) DEFAULT 'month',
  features JSONB DEFAULT '[]',
  is_popular BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  button_text VARCHAR(100) DEFAULT 'Get Started',
  button_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

-- Create policies for pricing plans
CREATE POLICY "Allow public to read published pricing_plans" ON pricing_plans
  FOR SELECT TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Allow authenticated users to manage pricing_plans" ON pricing_plans
  FOR ALL TO authenticated USING (true);

-- Create indexes for pricing plans
CREATE INDEX idx_pricing_plans_published ON pricing_plans(is_published, order_index);
CREATE INDEX idx_pricing_plans_popular ON pricing_plans(is_popular, is_published);

-- =====================================================
-- 6. SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample testimonials
INSERT INTO testimonials (name, company, position, message, rating, is_featured, is_published) VALUES
('John Smith', 'Tech Corp', 'CEO', 'Amazing work! They delivered exactly what we needed on time and within budget.', 5, true, true),
('Sarah Johnson', 'Design Studio', 'Creative Director', 'Professional, fast, and high-quality results. Highly recommend!', 5, true, true),
('Mike Wilson', 'Startup Inc', 'Founder', 'Great team to work with. They understood our vision perfectly.', 5, false, true),
('Emily Davis', 'E-commerce Plus', 'Marketing Manager', 'Outstanding service and support. Our sales increased by 40%!', 5, true, true),
('David Brown', 'Local Business', 'Owner', 'Transformed our online presence completely. Very satisfied!', 4, false, true);

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, order_index, is_published) VALUES
('How long does a typical project take?', 'Most projects are completed within 2-4 weeks, depending on complexity and scope. We provide detailed timelines during the consultation phase.', 'general', 1, true),
('Do you provide ongoing support?', 'Yes, we offer maintenance and support packages for all our projects. This includes updates, security patches, and technical support.', 'support', 2, true),
('What technologies do you use?', 'We use modern technologies like React, Next.js, Node.js, Supabase, and more based on project requirements and client preferences.', 'technical', 3, true),
('Can you work with our existing website?', 'Absolutely! We can redesign, optimize, or add new features to your existing website while maintaining your current content and SEO rankings.', 'general', 4, true),
('What is included in the price?', 'Our pricing includes design, development, testing, deployment, and initial training. Ongoing support and maintenance are available as separate packages.', 'pricing', 5, true),
('Do you offer mobile app development?', 'Yes, we develop mobile apps for both iOS and Android platforms using modern frameworks like React Native and Flutter.', 'technical', 6, true);

-- Insert sample services
INSERT INTO services (title, description, short_description, price, price_type, features, is_featured, is_published, order_index) VALUES
('Web Development', 'Custom website development with modern technologies and responsive design. We create fast, secure, and SEO-optimized websites that convert visitors into customers.', 'Professional websites built with latest technologies', 2999.00, 'fixed', '["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile Friendly", "Contact Forms", "Social Media Integration"]', true, true, 1),
('E-commerce Solutions', 'Complete online store setup and management with payment processing, inventory management, and customer analytics. Perfect for businesses looking to sell online.', 'Full e-commerce platform development', 4999.00, 'fixed', '["Payment Integration", "Inventory Management", "Admin Dashboard", "Mobile App", "Analytics", "Customer Support"]', true, true, 2),
('Digital Marketing', 'Comprehensive digital marketing strategies to boost your online presence and increase sales. We handle SEO, social media, and content marketing.', 'Boost your online presence and sales', 1999.00, 'monthly', '["SEO Optimization", "Social Media Management", "Content Marketing", "Analytics & Reporting", "PPC Campaigns", "Email Marketing"]', false, true, 3),
('Mobile App Development', 'Native and cross-platform mobile app development for iOS and Android. From concept to app store deployment.', 'Custom mobile apps for your business', 7999.00, 'fixed', '["iOS & Android", "Cross-platform", "App Store Deployment", "Push Notifications", "Offline Functionality", "API Integration"]', true, true, 4);

-- Insert sample pricing plans
INSERT INTO pricing_plans (name, description, price, price_period, features, is_popular, is_published, order_index, button_text, button_url) VALUES
('Starter', 'Perfect for small businesses and startups looking to establish their online presence', 999.00, 'one-time', '["5 Pages Website", "Responsive Design", "Basic SEO", "Contact Form", "1 Month Support", "SSL Certificate", "Mobile Optimized"]', false, true, 1, 'Get Started', '/contact'),
('Professional', 'Ideal for growing businesses that need advanced features and functionality', 2999.00, 'one-time', '["10 Pages Website", "Advanced Design", "SEO Optimization", "E-commerce Ready", "3 Months Support", "Analytics Setup", "Social Media Integration", "Blog Setup"]', true, true, 2, 'Choose Professional', '/contact'),
('Enterprise', 'Complete solution for large businesses with custom requirements', 5999.00, 'one-time', '["Unlimited Pages", "Custom Features", "Advanced SEO", "Full E-commerce", "6 Months Support", "Priority Support", "Custom Integrations", "Performance Optimization", "Security Audit"]', false, true, 3, 'Contact Us', '/contact');

-- =====================================================
-- 7. CREATE UPDATED_AT TRIGGER FUNCTIONS
-- =====================================================

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_pricing_plans_updated_at BEFORE UPDATE ON pricing_plans FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Your database is now ready with:
-- ✅ 5 Tables: contacts, testimonials, faqs, services, pricing_plans
-- ✅ Row Level Security enabled
-- ✅ Proper indexes for performance
-- ✅ Sample data for testing
-- ✅ Auto-updating timestamps
-- 
-- Next steps:
-- 1. Test your contact form at http://localhost:3000/contact
-- 2. Check the data in your Supabase dashboard
-- 3. Customize the sample data as needed
-- =====================================================
