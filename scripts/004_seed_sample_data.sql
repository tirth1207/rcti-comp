-- Insert sample faculty data
INSERT INTO public.faculty (name, designation, qualification, contact) VALUES
('Dr. Sarah Johnson', 'Head of Department', 'Ph.D. in Computer Science', 'sarah.johnson@college.edu'),
('Prof. Michael Chen', 'Associate Professor', 'M.Tech in Software Engineering', 'michael.chen@college.edu'),
('Dr. Priya Sharma', 'Assistant Professor', 'Ph.D. in Data Science', 'priya.sharma@college.edu'),
('Prof. David Wilson', 'Assistant Professor', 'M.S. in Computer Networks', 'david.wilson@college.edu');

-- Insert sample newsletters
INSERT INTO public.newsletters (title, description) VALUES
('Welcome to New Academic Year 2024-25', 'Important information for all students regarding the new academic year.'),
('Computer Science Department Updates', 'Latest updates from the Computer Science Department including new courses and faculty.'),
('Industry Partnership Program', 'Exciting new partnerships with leading tech companies for internships and placements.');

-- Insert sample course materials
INSERT INTO public.course_materials (subject, semester, title) VALUES
('Data Structures', 3, 'Introduction to Arrays and Linked Lists'),
('Database Management', 4, 'SQL Fundamentals and Query Optimization'),
('Computer Networks', 5, 'OSI Model and TCP/IP Protocol Suite'),
('Software Engineering', 6, 'SDLC Models and Agile Methodology'),
('Machine Learning', 7, 'Supervised Learning Algorithms'),
('Web Development', 4, 'HTML, CSS, and JavaScript Basics');

-- Insert sample student corner notices
INSERT INTO public.students_corner (title, description) VALUES
('Semester Exam Schedule Released', 'The examination schedule for the current semester has been published. Please check the notice board for details.'),
('Scholarship Applications Open', 'Merit-based scholarship applications are now open for eligible students. Deadline: March 15, 2024.'),
('Placement Drive Announcement', 'Major tech companies will be visiting campus for placement drives. Register through the placement portal.');

-- Insert sample events
INSERT INTO public.events (title, description) VALUES
('Tech Fest 2024', 'Annual technical festival featuring coding competitions, robotics, and innovation showcases.'),
('Industry Expert Lecture Series', 'Weekly lectures by industry professionals on emerging technologies and career guidance.'),
('Hackathon Championship', '48-hour coding marathon with exciting prizes and networking opportunities.');
