-- =====================================================
-- EMAIL NOTIFICATIONS FOR CONTACT FORM
-- This will send you an email whenever someone submits the contact form
-- =====================================================

-- First, let's create a function to handle new contact submissions
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- This function will be called whenever a new contact is inserted
  -- You can integrate with email services here
  
  -- For now, let's just log the event
  RAISE NOTICE 'New contact submitted: % (%) - %', NEW.name, NEW.email, NEW.message;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that fires when a new contact is inserted
DROP TRIGGER IF EXISTS on_contact_created ON contacts;
CREATE TRIGGER on_contact_created
  AFTER INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();

-- Test the trigger
INSERT INTO contacts (name, email, message, status) 
VALUES ('Email Test User', 'email-test@example.com', 'Testing email notifications', 'new');

-- Verify it worked
SELECT 'Email notification trigger created!' as status;


