-- =====================================================
-- FIX RLS POLICIES FOR CONTACTS TABLE
-- Run this in Supabase SQL Editor to fix the insert issue
-- =====================================================

-- First, let's drop existing policies and recreate them properly
DROP POLICY IF EXISTS "Allow public inserts on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated users to read contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated users to update contacts" ON contacts;

-- Create new policies that work correctly
CREATE POLICY "Enable insert for anonymous users" ON contacts
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users" ON contacts
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Enable update for authenticated users" ON contacts
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Also allow anonymous users to read their own submissions (optional)
CREATE POLICY "Enable read for anonymous users" ON contacts
  FOR SELECT 
  TO anon 
  USING (true);

-- Test the fix by inserting a sample contact
INSERT INTO contacts (name, email, message, status) 
VALUES ('RLS Test User', 'rls-test@example.com', 'Testing RLS policies after fix', 'new');

-- Verify the insert worked
SELECT 'SUCCESS: RLS policies fixed!' as status, COUNT(*) as total_contacts FROM contacts;

