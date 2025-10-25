-- =====================================================
-- VERIFY SUPABASE SETUP
-- Run this after the main setup to check everything works
-- =====================================================

-- Check if all tables exist
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check contacts table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'contacts'
ORDER BY ordinal_position;

-- Count sample data
SELECT 
  'contacts' as table_name, COUNT(*) as record_count FROM contacts
UNION ALL
SELECT 
  'testimonials' as table_name, COUNT(*) as record_count FROM testimonials
UNION ALL
SELECT 
  'services' as table_name, COUNT(*) as record_count FROM services
UNION ALL
SELECT 
  'pricing_plans' as table_name, COUNT(*) as record_count FROM pricing_plans
UNION ALL
SELECT 
  'faqs' as table_name, COUNT(*) as record_count FROM faqs
UNION ALL
SELECT 
  'newsletter_subscribers' as table_name, COUNT(*) as record_count FROM newsletter_subscribers;

-- Test inserting a contact (this should work from your website)
INSERT INTO contacts (name, email, message, status) 
VALUES ('Test User', 'test@example.com', 'This is a test message from SQL setup', 'new');

-- Verify the insert worked
SELECT name, email, message, status, created_at 
FROM contacts 
WHERE email = 'test@example.com';

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
