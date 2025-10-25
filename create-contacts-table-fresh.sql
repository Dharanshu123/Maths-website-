-- =====================================================
-- CREATE CONTACTS TABLE FROM SCRATCH
-- Use this if the table doesn't exist or has issues
-- =====================================================

-- Drop the table completely if it exists
DROP TABLE IF EXISTS contacts CASCADE;

-- Create a fresh contacts table
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    service_interest VARCHAR(255),
    company VARCHAR(255),
    subject VARCHAR(255),
    priority VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(20) DEFAULT 'new',
    assigned_to UUID,
    notes TEXT,
    follow_up_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DO NOT enable RLS for now - keep it simple
-- ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Insert a test record to verify it works
INSERT INTO contacts (name, email, message, status) 
VALUES ('Fresh Table Test', 'fresh-test@example.com', 'Testing fresh contacts table', 'new');

-- Verify it worked
SELECT 
    'CONTACTS TABLE CREATED SUCCESSFULLY!' as status,
    id, name, email, message, created_at 
FROM contacts 
ORDER BY created_at DESC;

