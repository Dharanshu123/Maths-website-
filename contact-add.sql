-- =====================================================
-- SAMPLE DATA FOR CONTACTS TABLE
-- Run this in your Supabase SQL Editor after creating the contacts table
-- =====================================================

-- Insert sample contact form submissions
INSERT INTO contacts (name, email, phone, message, service_interest, status) VALUES
('John Smith', 'john.smith@email.com', '+1-555-0123', 'Hi, I am interested in your web development services. Could you please provide more information about your pricing and timeline for a small business website?', 'Web Development', 'new'),

('Sarah Johnson', 'sarah.j@company.com', '+1-555-0456', 'We need an e-commerce solution for our retail business. We have about 200 products and need payment integration with Stripe. What would be the cost and timeline?', 'E-commerce Solutions', 'contacted'),

('Mike Wilson', 'mike.wilson@startup.io', '+1-555-0789', 'Looking for a complete digital marketing package including SEO, social media management, and content creation for our tech startup. Please send me a quote.', 'Digital Marketing', 'new'),

('Emily Davis', 'emily@designstudio.com', '+1-555-0321', 'I need a portfolio website for my design agency. Something modern and creative that showcases our work effectively. When can we schedule a consultation?', 'Web Development', 'new'),

('David Brown', 'david.brown@localstore.com', '+1-555-0654', 'Our current website is outdated and not mobile-friendly. We need a complete redesign with better user experience. Can you help us with this project?', 'Web Development', 'contacted'),

('Lisa Garcia', 'lisa@techcorp.com', '+1-555-0987', 'We are launching a new product and need a landing page with lead capture forms and analytics integration. What is your availability for next month?', 'Web Development', 'new'),

('Robert Taylor', 'robert.taylor@business.net', '+1-555-0147', 'Interested in your mobile app development services. We need both iOS and Android apps for our food delivery business. Please provide a detailed proposal.', 'Mobile App Development', 'new'),

('Jennifer Lee', 'jennifer@ecommerce.shop', '+1-555-0258', 'Our online store needs better SEO and conversion optimization. We are getting traffic but sales are low. Can you audit our current site and suggest improvements?', 'Digital Marketing', 'contacted'),

('Christopher Moore', 'chris.moore@consulting.biz', '+1-555-0369', 'Need a professional website for my consulting business with appointment booking functionality and client portal. What would be the cost for such a project?', 'Web Development', 'new'),

('Amanda White', 'amanda@nonprofit.org', '+1-555-0741', 'We are a non-profit organization looking for a website redesign with donation functionality and volunteer registration. Do you offer any discounts for non-profits?', 'Web Development', 'new'),

('Kevin Johnson', 'kevin@restaurant.com', '+1-555-0852', 'Restaurant owner here. Need an online ordering system integrated with our website and social media presence management. What packages do you offer?', 'E-commerce Solutions', 'contacted'),

('Rachel Green', 'rachel.green@fashion.style', '+1-555-0963', 'Fashion blogger looking for a complete website makeover with blog functionality, social media integration, and email newsletter signup. When can we start?', 'Web Development', 'new'),

('Thomas Anderson', 'thomas@realestate.pro', '+1-555-0174', 'Real estate agent needing a property listing website with search functionality, virtual tours integration, and lead generation forms. Please send pricing details.', 'Web Development', 'new'),

('Michelle Rodriguez', 'michelle@fitness.gym', '+1-555-0285', 'Gym owner looking for a website with class scheduling, membership management, and online payment processing. Also need social media marketing help.', 'Web Development', 'new'),

('Daniel Kim', 'daniel@photography.art', '+1-555-0396', 'Professional photographer needing a portfolio website with client galleries, booking system, and payment integration for session deposits. What is your timeline?', 'Web Development', 'contacted');

-- =====================================================
-- VERIFICATION QUERY
-- Run this to check if data was inserted successfully
-- =====================================================

-- Check total count of contacts
SELECT COUNT(*) as total_contacts FROM contacts;

-- View all contacts ordered by creation date
SELECT 
  id,
  name,
  email,
  service_interest,
  status,
  created_at
FROM contacts 
ORDER BY created_at DESC;

-- Count contacts by status
SELECT 
  status,
  COUNT(*) as count
FROM contacts 
GROUP BY status
ORDER BY count DESC;

-- Count contacts by service interest
SELECT 
  service_interest,
  COUNT(*) as count
FROM contacts 
GROUP BY service_interest
ORDER BY count DESC;
