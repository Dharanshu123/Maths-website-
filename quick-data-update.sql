-- =====================================================
-- QUICK SUPABASE DATA UPDATE (Keeps existing contacts)
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Update Services for Mathematics Tutoring
DELETE FROM services;
INSERT INTO services (title, description, short_description, price, price_type, features, image_url, is_featured, is_published, order_index) VALUES
('Mathematics Tutoring', 'Personalized one-on-one mathematics tutoring for students of all levels. From basic arithmetic to advanced calculus, our expert tutors help students build confidence and achieve academic excellence.', 'Expert math tutoring for all levels', 50.00, 'hour', '["One-on-One Sessions", "Customized Learning Plans", "Homework Help", "Test Preparation", "Progress Tracking", "Flexible Scheduling"]', '/images/pexels-elena-kravets-1601294419-33776534.jpg', true, true, 1),
('SAT/ACT Math Prep', 'Comprehensive SAT and ACT mathematics preparation courses designed to maximize test scores. Our proven strategies and practice materials help students achieve their target scores.', 'Boost your SAT/ACT math scores', 75.00, 'hour', '["Practice Tests", "Score Analysis", "Test Strategies", "Time Management", "Problem-Solving Techniques", "Progress Reports"]', '/images/pexels-elena-kravets-1601294419-33776534.jpg', true, true, 2),
('Group Study Sessions', 'Small group mathematics sessions that combine collaborative learning with expert instruction. Perfect for students who learn better in a social environment.', 'Learn math in small groups', 35.00, 'hour', '["Small Groups (3-5 students)", "Collaborative Learning", "Peer Support", "Cost Effective", "Interactive Sessions", "Group Problem Solving"]', '/images/pexels-elena-kravets-1601294419-33776534.jpg', false, true, 3);

-- Update Pricing Plans
DELETE FROM pricing_plans;
INSERT INTO pricing_plans (name, description, price, price_period, features, is_popular, is_published, order_index, button_text, button_url) VALUES
('Basic Tutoring', 'Perfect for students needing occasional help with math concepts and homework', 199.00, 'month', '["4 One-Hour Sessions", "Homework Help", "Basic Progress Tracking", "Email Support", "Flexible Scheduling", "Study Materials Included"]', false, true, 1, 'Get Started', '/contact'),
('Premium Tutoring', 'Comprehensive tutoring package for serious students wanting consistent improvement', 349.00, 'month', '["8 One-Hour Sessions", "Test Preparation", "Detailed Progress Reports", "Priority Scheduling", "Custom Study Plans", "Parent Updates", "24/7 Email Support", "Practice Materials"]', true, true, 2, 'Choose Premium', '/contact'),
('Elite Program', 'Complete mathematics mastery program with unlimited support and advanced features', 599.00, 'month', '["Unlimited Sessions", "SAT/ACT Prep Included", "College Application Support", "Advanced Problem Solving", "Competition Math Training", "University Preparation", "Personal Math Coach", "Success Guarantee", "Premium Resources"]', false, true, 3, 'Go Elite', '/contact');

-- Update Testimonials
DELETE FROM testimonials;
INSERT INTO testimonials (name, company, position, message, rating, is_featured, is_published) VALUES
('Sarah Johnson', 'Lincoln High School', 'Student', 'Thanks to Mathsmastery Institute, I went from failing algebra to getting an A+ on my final exam! The tutors are incredibly patient and make complex concepts easy to understand.', 5, true, true),
('Michael Chen', 'Stanford University', 'Parent', 'My daughter struggled with calculus until we found Mathsmastery. The personalized approach and expert tutoring helped her not only pass but excel. She''s now studying engineering at Stanford!', 5, true, true),
('Emily Rodriguez', 'Washington High School', 'Student', 'The SAT math prep course was amazing! I improved my math score by 150 points and got into my dream college. The practice tests and strategies really work!', 5, true, true),
('Jessica Park', 'MIT', 'Former Student', 'The competition math training I received at Mathsmastery helped me win state championships and get into MIT. The advanced problem-solving techniques are incredible!', 5, true, true);

-- Update FAQs
DELETE FROM faqs;
INSERT INTO faqs (question, answer, category, order_index, is_published) VALUES
('What age groups do you tutor?', 'We provide mathematics tutoring for students from elementary school through college level. Our tutors are experienced in working with students aged 8-25, adapting their teaching methods to suit different learning styles and maturity levels.', 'general', 1, true),
('How much do tutoring sessions cost?', 'Our pricing varies based on the type of service: Individual tutoring starts at $50/hour, group sessions at $35/hour, and comprehensive monthly packages from $199. We also offer financial assistance for qualifying families.', 'pricing', 2, true),
('Do you offer online tutoring sessions?', 'Yes! We offer both in-person and online tutoring sessions. Our online platform includes interactive whiteboards, screen sharing, and recording capabilities. Many students find online sessions just as effective as in-person tutoring.', 'online', 3, true),
('What subjects do you cover?', 'We specialize in all areas of mathematics including: Arithmetic, Pre-Algebra, Algebra I & II, Geometry, Trigonometry, Pre-Calculus, Calculus (AP & College level), Statistics, and SAT/ACT Math preparation.', 'subjects', 4, true),
('Can you help with test preparation?', 'Absolutely! We specialize in SAT, ACT, AP Calculus, and other standardized test preparation. Our test prep includes practice exams, timing strategies, problem-solving techniques, and anxiety management.', 'testing', 5, true);

-- Verify the update
SELECT 'Update Complete!' as status, 
       (SELECT COUNT(*) FROM services) as services,
       (SELECT COUNT(*) FROM pricing_plans) as pricing_plans,
       (SELECT COUNT(*) FROM testimonials) as testimonials,
       (SELECT COUNT(*) FROM faqs) as faqs;


