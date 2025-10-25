-- =====================================================
-- COMPLETE SUPABASE SETUP FOR YOUR WEBSITE
-- Run this entire script in your Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. CONTACTS TABLE (Already exists, but ensuring it's correct)
-- =====================================================
DROP TABLE IF EXISTS contacts CASCADE;

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

-- =====================================================
-- 2. SERVICES TABLE (For Services Page)
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
  icon VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. TESTIMONIALS TABLE (For Testimonial Page)
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

-- =====================================================
-- 4. FAQS TABLE (For FAQ Page)
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

-- =====================================================
-- 5. PRICING PLANS TABLE (For Pricing Page)
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

-- =====================================================
-- 6. TEAM MEMBERS TABLE (For About Page)
-- =====================================================
CREATE TABLE team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  bio TEXT,
  image_url TEXT,
  email VARCHAR(255),
  linkedin_url TEXT,
  twitter_url TEXT,
  is_published BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. SITE SETTINGS TABLE (For Global Settings)
-- =====================================================
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR(50) DEFAULT 'text',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. DISABLE RLS FOR TESTING (Enable later for security)
-- =====================================================
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans DISABLE ROW LEVEL SECURITY;
ALTER TABLE team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- 9. INSERT SAMPLE DATA
-- =====================================================

-- Services Data
INSERT INTO services (title, description, short_description, price, features, is_featured, order_index) VALUES
('Math Tutoring', 'Comprehensive math tutoring for all levels from elementary to college. Our experienced tutors help students build confidence and improve grades in mathematics.', 'Expert math tutoring for all levels', 50.00, '["One-on-one sessions", "Homework help", "Test preparation", "Progress tracking", "Flexible scheduling"]', true, 1),
('Test Preparation', 'Specialized test prep for SAT, ACT, GRE, GMAT and other standardized tests. Proven strategies to boost your scores.', 'Boost your test scores with expert prep', 75.00, '["SAT/ACT prep", "GRE/GMAT prep", "Practice tests", "Score improvement guarantee", "Study materials included"]', true, 2),
('Online Tutoring', 'Convenient online tutoring sessions from the comfort of your home. Same quality instruction with flexible scheduling.', 'Learn from anywhere with online sessions', 45.00, '["Video conferencing", "Screen sharing", "Digital whiteboard", "Recorded sessions", "24/7 availability"]', false, 3),
('Group Classes', 'Small group classes for collaborative learning. Cost-effective way to get quality instruction with peer interaction.', 'Learn together in small groups', 35.00, '["Small class sizes", "Peer interaction", "Cost effective", "Regular assessments", "Group projects"]', false, 4);

-- Testimonials Data
INSERT INTO testimonials (name, company, position, message, rating, is_featured) VALUES
('Sarah Johnson', 'Lincoln High School', 'Student', 'The math tutoring helped me improve my grade from C to A! The tutor was patient and explained everything clearly.', 5, true),
('Michael Chen', 'Stanford University', 'College Student', 'Thanks to the test prep program, I scored 1480 on my SAT. Highly recommend their services!', 5, true),
('Emily Rodriguez', 'Roosevelt Middle School', 'Parent', 'My daughter loves her online tutoring sessions. Her confidence in math has improved dramatically.', 5, false),
('David Kim', 'MIT', 'Graduate Student', 'The GRE prep was excellent. I scored in the 95th percentile and got into my dream program.', 5, true),
('Lisa Wang', 'Jefferson Elementary', 'Student', 'Math used to be scary, but now its my favorite subject! Thank you for making it fun.', 5, false);

-- FAQs Data
INSERT INTO faqs (question, answer, category, order_index) VALUES
('How long are tutoring sessions?', 'Our standard tutoring sessions are 60 minutes long. We also offer 90-minute sessions for intensive test prep or complex topics.', 'general', 1),
('Do you offer online tutoring?', 'Yes! We offer both in-person and online tutoring sessions. Our online platform includes video conferencing, screen sharing, and a digital whiteboard.', 'general', 2),
('What subjects do you tutor?', 'We specialize in mathematics at all levels, from elementary arithmetic to college calculus. We also offer test preparation for SAT, ACT, GRE, and GMAT.', 'subjects', 3),
('How much do sessions cost?', 'Our rates vary by service: Individual tutoring starts at $45/hour, test prep is $75/hour, and group classes are $35/hour per student.', 'pricing', 4),
('Do you guarantee score improvements?', 'For our test prep programs, we guarantee a minimum score improvement or your money back. Individual results may vary based on effort and attendance.', 'guarantees', 5),
('How do I schedule a session?', 'You can schedule sessions through our contact form, by phone, or email. We offer flexible scheduling including evenings and weekends.', 'scheduling', 6);

-- Pricing Plans Data
INSERT INTO pricing_plans (name, description, price, price_period, features, is_popular, order_index, button_text) VALUES
('Basic Tutoring', 'Perfect for students needing occasional help with homework and concepts', 45.00, 'hour', '["1-hour sessions", "Homework help", "Concept explanation", "Progress reports", "Email support"]', false, 1, 'Book Session'),
('Premium Tutoring', 'Comprehensive tutoring with test prep and advanced support', 65.00, 'hour', '["1-hour sessions", "Test preparation", "Study materials", "Progress tracking", "Priority scheduling", "24/7 email support"]', true, 2, 'Get Started'),
('Test Prep Package', 'Intensive test preparation for SAT, ACT, GRE, and GMAT', 75.00, 'hour', '["90-minute sessions", "Practice tests", "Score guarantee", "Study materials", "Progress analytics", "Flexible scheduling"]', false, 3, 'Start Prep');

-- Team Members Data
INSERT INTO team_members (name, position, bio, email, order_index) VALUES
('Dr. Sarah Mitchell', 'Lead Math Tutor', 'PhD in Mathematics from MIT with 10+ years of tutoring experience. Specializes in calculus and test preparation.', 'sarah@mathstutoring412.com', 1),
('James Rodriguez', 'Test Prep Specialist', 'Masters in Education from Stanford. Expert in SAT/ACT prep with average score improvements of 200+ points.', 'james@mathstutoring412.com', 2),
('Emily Chen', 'Online Learning Coordinator', 'Specializes in online education technology and making virtual learning engaging and effective.', 'emily@mathstutoring412.com', 3);

-- Site Settings Data
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_title', 'Math Tutoring 412', 'text', 'Main site title'),
('site_description', 'Professional math tutoring and test preparation services', 'text', 'Site description for SEO'),
('contact_email', 'mathstutoring412@gmail.com', 'email', 'Main contact email'),
('contact_phone', '+1 (412) 555-0123', 'text', 'Main contact phone'),
('address', '123 Education St, Pittsburgh, PA 15213', 'text', 'Business address'),
('hero_title', 'Excel in Math with Expert Tutoring', 'text', 'Homepage hero title'),
('hero_subtitle', 'Personalized math tutoring and test prep to help you achieve your academic goals', 'text', 'Homepage hero subtitle');

-- =====================================================
-- 10. CREATE UPDATED_AT TRIGGERS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_pricing_plans_updated_at BEFORE UPDATE ON pricing_plans FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
SELECT 'Supabase setup complete! All tables created with sample data.' as status;


