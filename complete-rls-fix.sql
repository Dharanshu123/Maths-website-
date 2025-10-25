-- =====================================================
-- COMPLETE RLS FIX FOR CONTACTS TABLE
-- This will completely reset and fix the RLS policies
-- =====================================================

-- Step 1: Disable RLS temporarily to clean up
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies
DROP POLICY IF EXISTS "Allow public inserts on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated users to read contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated users to update contacts" ON contacts;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON contacts;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON contacts;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON contacts;
DROP POLICY IF EXISTS "Enable read for anonymous users" ON contacts;

-- Step 3: Re-enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Step 4: Create simple, working policies
CREATE POLICY "contacts_insert_policy" ON contacts
    FOR INSERT 
    TO public
    WITH CHECK (true);

CREATE POLICY "contacts_select_policy" ON contacts
    FOR SELECT 
    TO public
    USING (true);

CREATE POLICY "contacts_update_policy" ON contacts
    FOR UPDATE 
    TO public
    USING (true);

-- Step 5: Test the fix immediately
INSERT INTO contacts (name, email, message, status) 
VALUES ('Policy Fix Test', 'policy-fix@example.com', 'Testing after complete RLS reset', 'new');

-- Step 6: Verify it worked
SELECT 
    'RLS POLICIES FIXED!' as status,
    COUNT(*) as total_contacts,
    MAX(created_at) as latest_contact
FROM contacts;

-- Step 7: Show current policies
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd
FROM pg_policies 
WHERE tablename = 'contacts';

