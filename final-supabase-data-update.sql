-- =====================================================
-- FINAL COMPREHENSIVE SUPABASE DATA UPDATE
-- Mathematics Tutoring Business - Mathsmastery Institute
-- Run this in your Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. UPDATE SERVICES DATA
-- =====================================================
DELETE FROM services;
INSERT INTO services (title, description, short_description, price, price_type, features, image_url, is_featured, is_published, order_index) VALUES
('Mathematics Tutoring', 'Personalized one-on-one mathematics tutoring for students of all levels. From basic arithmetic to advanced calculus, our expert tutors help students build confidence and achieve academic excellence through customized learning plans and proven teaching methods.', 'Expert math tutoring for all levels', 50.00, 'hour', '["One-on-One Sessions", "Customized Learning Plans", "Homework Help", "Test Preparation", "Progress Tracking", "Flexible Scheduling"]', '/images/Services/pexels-elena-kravets-1601294419-33776534.jpg', true, true, 1),

('SAT/ACT Math Prep', 'Comprehensive SAT and ACT mathematics preparation courses designed to maximize test scores. Our proven strategies, practice materials, and expert instruction help students achieve their target scores and gain admission to their dream colleges.', 'Boost your SAT/ACT math scores', 75.00, 'hour', '["Practice Tests", "Score Analysis", "Test Strategies", "Time Management", "Problem-Solving Techniques", "Progress Reports"]', '/images/Services/pexels-elena-kravets-1601294419-33776534.jpg', true, true, 2),

('Group Study Sessions', 'Small group mathematics sessions that combine collaborative learning with expert instruction. Perfect for students who learn better in a social environment while maintaining personalized attention and cost-effective pricing.', 'Learn math in small groups', 35.00, 'hour', '["Small Groups (3-5 students)", "Collaborative Learning", "Peer Support", "Cost Effective", "Interactive Sessions", "Group Problem Solving"]', '/images/Services/pexels-elena-kravets-1601294419-33776534.jpg', false, true, 3),

('Online Math Courses', 'Comprehensive online mathematics courses covering algebra, geometry, trigonometry, and calculus. Self-paced learning with instructor support, interactive materials, and flexible scheduling for busy students.', 'Complete online math curriculum', 299.00, 'course', '["Self-Paced Learning", "Video Lessons", "Interactive Exercises", "24/7 Access", "Certificate of Completion", "Instructor Support"]', '/images/Services/pexels-elena-kravets-1601294419-33776534.jpg', true, true, 4),

('Homework Help Service', 'Daily homework assistance and support for mathematics students. Get help when you need it most with our flexible homework help service, featuring quick response times and step-by-step explanations.', 'Daily math homework support', 25.00, 'session', '["Daily Support", "Quick Response", "Step-by-Step Solutions", "Concept Explanations", "Study Tips", "Affordable Pricing"]', '/images/Services/pexels-elena-kravets-1601294419-33776534.jpg', false, true, 5);

-- =====================================================
-- 2. UPDATE PRICING PLANS DATA
-- =====================================================
DELETE FROM pricing_plans;
INSERT INTO pricing_plans (name, description, price, price_period, features, is_popular, is_published, order_index, button_text, button_url) VALUES
('Basic Tutoring', 'Perfect for students needing occasional help with math concepts and homework. Ideal for maintaining good grades and building confidence in mathematics.', 199.00, 'month', '["4 One-Hour Sessions", "Homework Help", "Basic Progress Tracking", "Email Support", "Flexible Scheduling", "Study Materials Included"]', false, true, 1, 'Get Started', '/contact'),

('Premium Tutoring', 'Comprehensive tutoring package for serious students wanting consistent improvement and academic excellence. Most popular choice for dedicated learners.', 349.00, 'month', '["8 One-Hour Sessions", "Test Preparation", "Detailed Progress Reports", "Priority Scheduling", "Custom Study Plans", "Parent Updates", "24/7 Email Support", "Practice Materials"]', true, true, 2, 'Choose Premium', '/contact'),

('Elite Program', 'Complete mathematics mastery program with unlimited support and advanced features. Perfect for students aiming for top universities and academic excellence.', 599.00, 'month', '["Unlimited Sessions", "SAT/ACT Prep Included", "College Application Support", "Advanced Problem Solving", "Competition Math Training", "University Preparation", "Personal Math Coach", "Success Guarantee", "Premium Resources"]', false, true, 3, 'Go Elite', '/contact');

-- =====================================================
-- 3. UPDATE TESTIMONIALS DATA
-- =====================================================
DELETE FROM testimonials;
INSERT INTO testimonials (name, company, position, message, rating, image_url, is_featured, is_published) VALUES
('Sarah Johnson', 'Lincoln High School', 'Student', 'Thanks to Mathsmastery Institute, I went from failing algebra to getting an A+ on my final exam! The tutors are incredibly patient and make complex concepts easy to understand. I actually enjoy math now!', 5, null, true, true),

('Michael Chen', 'Stanford University', 'Parent', 'My daughter struggled with calculus until we found Mathsmastery. The personalized approach and expert tutoring helped her not only pass but excel. She''s now studying engineering at Stanford! Best investment we ever made.', 5, null, true, true),

('Emily Rodriguez', 'Washington High School', 'Student', 'The SAT math prep course was amazing! I improved my math score by 150 points and got into my dream college. The practice tests and strategies really work. Thank you for changing my future!', 5, null, true, true),

('David Thompson', 'Parent', 'Father of Two Students', 'Both my kids have been with Mathsmastery for over a year. Their confidence in math has skyrocketed, and their grades have improved dramatically. The tutors genuinely care about student success. Worth every penny!', 5, null, false, true),

('Jessica Park', 'MIT', 'Former Student', 'The competition math training I received at Mathsmastery helped me win state championships and get into MIT. The advanced problem-solving techniques and rigorous preparation were incredible. Life-changing experience!', 5, null, true, true),

('Robert Williams', 'Jefferson Middle School', 'Student', 'I used to hate math and thought I was just bad at it. Now it''s my favorite subject! The tutors make learning fun and help me understand why math is important in real life. My grades went from D''s to A''s!', 5, null, false, true),

('Lisa Anderson', 'Parent', 'Mother', 'The online courses are fantastic! My son can learn at his own pace, and the interactive materials keep him engaged. The progress tracking helps me stay involved in his learning journey. Highly recommend!', 4, null, false, true),

('James Martinez', 'Harvard University', 'Graduate Student', 'Mathsmastery prepared me not just for high school math, but for university-level mathematics. The foundation they built has been invaluable throughout my academic career. Still using techniques I learned there!', 5, null, true, true);

-- =====================================================
-- 4. UPDATE FAQS DATA
-- =====================================================
DELETE FROM faqs;
INSERT INTO faqs (question, answer, category, order_index, is_published) VALUES
('What age groups do you tutor?', 'We provide mathematics tutoring for students from elementary school through college level. Our tutors are experienced in working with students aged 8-25, adapting their teaching methods to suit different learning styles and maturity levels. We have specialized programs for each age group.', 'general', 1, true),

('How do I know if my child needs a math tutor?', 'Signs that your child might benefit from tutoring include: struggling with homework, declining grades, lack of confidence in math class, difficulty understanding concepts, or preparing for important tests like SAT/ACT. We offer free consultations to assess your child''s needs and recommend the best approach.', 'general', 2, true),

('What is your teaching methodology?', 'We use a personalized approach that adapts to each student''s learning style. Our methodology includes: diagnostic assessment, customized learning plans, interactive problem-solving, regular progress monitoring, and building conceptual understanding rather than just memorization. We focus on building confidence alongside competence.', 'teaching', 3, true),

('Do you offer online tutoring sessions?', 'Yes! We offer both in-person and online tutoring sessions. Our online platform includes interactive whiteboards, screen sharing, and recording capabilities. Many students find online sessions just as effective as in-person tutoring, with the added convenience of learning from home.', 'online', 4, true),

('How much do tutoring sessions cost?', 'Our pricing varies based on the type of service: Individual tutoring starts at $50/hour, group sessions at $35/hour, and comprehensive monthly packages from $199. We also offer financial assistance for qualifying families and flexible payment plans to make quality education accessible.', 'pricing', 5, true),

('What subjects do you cover?', 'We specialize in all areas of mathematics including: Arithmetic, Pre-Algebra, Algebra I & II, Geometry, Trigonometry, Pre-Calculus, Calculus (AP & College level), Statistics, and SAT/ACT Math preparation. We also offer competition math training and advanced problem-solving courses.', 'subjects', 6, true),

('How do you track student progress?', 'We provide detailed progress reports that include: assessment scores, areas of improvement, goals achieved, homework completion rates, and recommendations for continued learning. Parents receive monthly progress updates and can schedule regular check-ins with tutors to discuss their child''s development.', 'progress', 7, true),

('Can you help with test preparation?', 'Absolutely! We specialize in SAT, ACT, AP Calculus, and other standardized test preparation. Our test prep includes practice exams, timing strategies, problem-solving techniques, and anxiety management. We have a proven track record of significant score improvements.', 'testing', 8, true),

('What if my child doesn''t connect with their tutor?', 'Student-tutor compatibility is crucial for success. If there''s not a good fit, we''ll match your child with a different tutor at no additional cost. We want to ensure the best possible learning environment and will work with you to find the perfect match for your child''s personality and learning style.', 'support', 9, true),

('Do you offer group tutoring sessions?', 'Yes, we offer small group sessions (3-5 students) which are cost-effective and allow for collaborative learning. Group sessions work well for students who are motivated by peer interaction and enjoy learning together. We carefully match students by skill level and learning pace for optimal results.', 'group', 10, true);

-- =====================================================
-- 5. ADD SAMPLE CONTACT DATA (Mathematics Tutoring Focused)
-- =====================================================
-- Note: This will preserve existing contacts and add new sample data
INSERT INTO contacts (name, email, phone, message, service_interest, status) VALUES
('Alex Johnson', 'alex.johnson@email.com', '+1-555-0123', 'Hi, I''m interested in SAT math prep for my daughter. She''s a junior in high school and wants to improve her math score by at least 100 points. What programs do you recommend and when can we start?', 'SAT/ACT Math Prep', 'new'),

('Maria Garcia', 'maria.garcia@gmail.com', '+1-555-0456', 'My son is struggling with Algebra II and his grades are dropping. We need a tutor who can help him understand the concepts better and catch up with his class. He''s a visual learner and needs patient instruction.', 'Mathematics Tutoring', 'contacted'),

('David Kim', 'dkim@yahoo.com', '+1-555-0789', 'Looking for online calculus tutoring for my college freshman daughter. She needs help with derivatives and integrals. Do you have tutors available for evening sessions? She''s available after 7 PM EST.', 'Online Math Courses', 'new'),

('Jennifer Smith', 'jen.smith@outlook.com', '+1-555-0321', 'Interested in group tutoring sessions for geometry. My daughter learns better in social settings and enjoys collaborative learning. What are your group sizes and availability for high school students?', 'Group Study Sessions', 'new'),

('Robert Chen', 'robert.chen@email.com', '+1-555-0654', 'Need help with daily homework for pre-algebra. My son gets frustrated with math homework every night and we end up arguing. Do you offer homework help services that can reduce this stress?', 'Homework Help Service', 'contacted'),

('Lisa Thompson', 'lisa.t@gmail.com', '+1-555-0987', 'My twin boys need math tutoring - one for algebra and one for geometry. Do you offer sibling discounts? They''re both motivated students but learn at different paces. Looking for individual sessions.', 'Mathematics Tutoring', 'new'),

('Michael Rodriguez', 'mrodriguez@email.com', '+1-555-0147', 'Looking for competition math training for my gifted 8th grader. She wants to participate in math olympiad competitions and needs advanced problem-solving skills. Do you have specialized programs for gifted students?', 'Mathematics Tutoring', 'new'),

('Amanda Wilson', 'amanda.wilson@yahoo.com', '+1-555-0258', 'Interested in your Elite program for my high school senior. He wants to major in engineering and needs strong math preparation for college. What does the unlimited sessions package include exactly?', 'Elite Program', 'contacted'),

('Christopher Lee', 'chris.lee@gmail.com', '+1-555-0369', 'Need ACT math prep urgently. My daughter is taking the test in 6 weeks and needs to improve her math score from 24 to 30+. Do you have intensive programs that can help achieve this goal quickly?', 'SAT/ACT Math Prep', 'new'),

('Sarah Davis', 'sarah.davis@email.com', '+1-555-0741', 'My son has severe math anxiety and has lost all confidence in his abilities. Looking for a patient, encouraging tutor who specializes in building confidence while improving skills. This is more about mindset than just grades.', 'Mathematics Tutoring', 'new')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- 6. VERIFY DATA UPDATE
-- =====================================================
-- Check that all data was inserted correctly
SELECT 'Services' as table_name, COUNT(*) as record_count FROM services
UNION ALL
SELECT 'Pricing Plans' as table_name, COUNT(*) as record_count FROM pricing_plans
UNION ALL
SELECT 'Testimonials' as table_name, COUNT(*) as record_count FROM testimonials
UNION ALL
SELECT 'FAQs' as table_name, COUNT(*) as record_count FROM faqs
UNION ALL
SELECT 'Contacts' as table_name, COUNT(*) as record_count FROM contacts;

-- =====================================================
-- FINAL SUPABASE DATA UPDATE COMPLETE!
-- =====================================================
-- Your database now has:
-- ✅ 5 Mathematics Services (tutoring, test prep, group sessions, etc.)
-- ✅ 3 Pricing Plans (Basic $199, Premium $349, Elite $599)
-- ✅ 8 Customer Testimonials with 5-star ratings
-- ✅ 10 Comprehensive FAQs covering all aspects
-- ✅ 10+ Fresh sample contacts for mathematics tutoring
-- 
-- All data is now optimized for Mathsmastery Institute!
-- Your website will display professional mathematics tutoring content.
-- =====================================================
