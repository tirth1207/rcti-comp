-- Create a new script to add a Gmail admin user for testing
-- This script adds a sample Gmail admin user that can be used for login testing
-- Note: In production, users should sign up through the registration form

-- Insert sample admin user profile (this will be linked when the user signs up)
-- The actual auth.users record will be created when the user signs up via Supabase Auth
INSERT INTO public.profiles (id, name, role) VALUES
-- This is a placeholder UUID that will be replaced when the actual user signs up
('00000000-0000-0000-0000-000000000001', 'Gmail Admin User', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Note: To actually use Gmail login, you need to:
-- 1. Sign up through the /auth/sign-up page with a Gmail address
-- 2. Confirm your email address
-- 3. The profile will be automatically created via the trigger
-- 
-- For testing purposes, you can create a user with these credentials:
-- Email: admin@gmail.com
-- Password: (choose a secure password during signup)
