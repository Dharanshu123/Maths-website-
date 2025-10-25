-- =====================================================
-- UPDATE TESTIMONIALS WITH MATHSONLINE AUTHENTIC DATA
-- Extracted from https://www.mathsonline.com.au/testimonials
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Clear existing testimonials and insert authentic MathsOnline testimonials
DELETE FROM testimonials;

INSERT INTO testimonials (name, company, position, message, rating, image_url, is_featured, is_published) VALUES
('Lorene Stevenson', 'Bluff QLD', 'Parent', 'We love the video tutorials, they are very clearly explained, very concise. You''re able to rewind or go back or pause if you need to replay them. It''s great that you can access any year level, you can diagnose if your child needs some extra help, the lessons are in full colour, with diagrams that show very clearly exactly what to do. My kids find it very clearly explained.', 5, null, true, true),

('Rebekah Haack', 'Albion Park NSW', 'Parent', 'MathsOnline doesn''t put pressure on the child to have to get their question or lesson right first time around, they are given a space to try and fail but also succeed. They know they can work towards 100% and there is space and time to do that and I think that encourages the child to learn because they are enjoying it and because they know it is attainable. I am so thankful that we discovered this product and we will definitely be using it in the school years to come.', 5, null, true, true),

('Claire Cheong', 'Balwyn VIC', 'Year 9 Student', 'I have been doing MathsOnline for three years now and one of the best thing about MathsOnline is the fact that for tests and exams and I can have some extra revision to help me. My grades have improved from using MathsOnline especially with the video tutorials and the easy access to it.', 5, null, true, true),

('John Sargeant', 'Bonny Hills, NSW', 'Parent', 'We found MathsOnline when our child first entered year 7 in about 2009. We found that he was having some teacher issues, and not understanding his teacher in Mathematics and that caused him to be not so confident in his work he was producing. With the assistance of MathsOnline, he was able to gain confidence, he was able to improve his grades, and he was able to do this by listening to the video tutorials online and understanding them as they were being taught by someone else. This went on to year 12 where he did 3 unit Maths all with the aid of MathsOnline.', 5, null, true, true),

('Anthony English', 'Ryde NSW', 'Parent of 7 Children', 'My wife and I have 7 children and they''ve been using MathsOnline ever since they started, our eldest child is 16. I really like the way that it goes through very short lessons, really systematic. The children enjoy it, even those who aren''t so good at maths, or are not so confident. I really love the program and the children do too. We don''t really have any trouble getting them to do it. It''s great.', 5, null, false, true),

('Britney Lorenz', 'Campbelltown NSW', 'Year 9 Student', 'MathsOnline has been a huge help for me in this subject. Before I started I used to struggle heaps with maths but now I''m excelling to great heights. Everything is so simple and easy to understand on the site from the videos to the worksheets. Without it I wouldn''t be able to finish high school. Thanks MathsOnline', 5, null, true, true),

('Kerrin Simpson', 'Old Bar NSW', 'Parent', 'Two years ago, we discovered MathsOnline which is the best thing that has ever happened to us. The kids are really engaged now. All they have to do in the morning is just put the headset on, the lesson is playing, and they just move from one to the other. It''s completely aligned with the Australian curriculum. The lessons are fantastic, they are very well put together and we just really enjoy it. Thank you, MathsOnline.', 5, null, false, true),

('Michelle Eime', 'Jerusalem Israel', 'Parent', 'Since we live outside the Australia I like the online convenience and being able to access lessons from all devices; Desktops, iPads, Laptops and I appreciate the way the lessons are explained and we are able to access lessons from different grade levels. MathsOnline has been wonderful for our family and it helps to boost confidence and to create a love of Maths. Thank you Mr. Pat', 5, null, false, true),

('Sherri Mcnichol', 'Bucasia QLD', 'Qualified Primary School Teacher', 'We have had MathsOnline for a few years now and I found it amazing for consolidating the maths my children are learning class. I am also a qualified primary school teacher and I recommend MathsOnline to friends and students who are experiencing difficulties. MathsOnline is easy to use, the lessons are shorts and to the point, easily understood and the students can stop and rewind at any point. It is convenient in that it can be used anytime, anywhere, on any device. There is detailed reporting so parents can keep track of their child''s progress at all times. MathsOnline is particularly useful for revision before exams, improving the student''s confidence. Most of all MathsOnline is value for money and it''s much more affordable than a private tutor.', 5, null, true, true),

('Nike Ajao', 'Port Lincoln SA', 'Parent', 'I would like to let you know that your program is absolutely fantastic. My kids love it, my daughter actually say she loves maths now because whenever a new topic is being taught in the class room she understands it a lot better and that is because of your easy to understand short video lessons you provide at the beginning of every lesson. Thank you for saving me time, money and anxiety.', 5, null, false, true),

('Nate Gaze', 'Baldivis WA', 'Year 5 Student', 'Hi my name is Nate, I love MathsOnline because it is simple to use and the video tells you what you going to be doing and the next exercise. With MathsOnline I am two years ahead and mum can go and check, to see what percentage I am working at, I am currently working at 90%.', 5, null, false, true),

('Rose Banks', 'Evanston Park SA', 'Year 2 Student', 'I''m in year two and MathsOnline helps me with what I am doing in class. If I am having trouble I can rewind it and watch the lesson again.', 5, null, false, true),

('Nikki Bilic', 'Ryde NSW', 'Parent', 'I''m really pleased I purchased MathsOnline, I have two children one in primary school and the other in high school, with MathsOnline they can come home and revise exactly what they have been learning in class. Over a six month period my son has gone from maths class Four to maths class Two and my daughter now has much better understanding of the maths tasks she is completing. With those results it is very easy for me to recommend MathsOnline.', 5, null, false, true),

('Susan McLain', 'Balmain NSW', 'Grandparent', 'I use MathsOnline to help my grandchildren, I really like it because it gives them access to lessons from earlier grades but the most beneficial part I feel is the weekly revision tasks which allow the children to reinforce skills they may have forgotten and are great for revision. I would definitely recommend MathsOnline to parents and to grandparents.', 5, null, false, true),

('Eva Gaze', 'Baldivis WA', 'Year 1 Student', 'I think MathsOnline is really cool because if you get stuck you can just watch the video again and then you will know how to do it.', 5, null, false, true);

-- =====================================================
-- VERIFY TESTIMONIALS UPDATE
-- =====================================================
SELECT 'Testimonials Updated' as status, COUNT(*) as total_count FROM testimonials;

-- Show sample of updated testimonials
SELECT name, position, company, rating, is_featured 
FROM testimonials 
ORDER BY is_featured DESC, created_at DESC 
LIMIT 5;

-- =====================================================
-- TESTIMONIALS UPDATE COMPLETE!
-- =====================================================
-- Your database now has:
-- ✅ 15 Authentic testimonials from MathsOnline
-- ✅ Real student and parent experiences
-- ✅ Diverse age groups (Year 1 to Year 12)
-- ✅ Geographic diversity across Australia and internationally
-- ✅ Mix of students, parents, teachers, and grandparents
-- ✅ All testimonials have 5-star ratings
-- ✅ Featured testimonials for homepage display
-- 
-- Source: https://www.mathsonline.com.au/testimonials
-- =====================================================
