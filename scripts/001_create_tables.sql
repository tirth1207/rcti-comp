-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'faculty')) DEFAULT 'faculty',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create newsletters table
CREATE TABLE IF NOT EXISTS public.newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on newsletters
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;

-- Newsletter policies - public read, authenticated write
CREATE POLICY "newsletters_select_all" ON public.newsletters FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "newsletters_insert_auth" ON public.newsletters FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "newsletters_update_auth" ON public.newsletters FOR UPDATE TO authenticated USING (true);
CREATE POLICY "newsletters_delete_auth" ON public.newsletters FOR DELETE TO authenticated USING (true);

-- Create course_materials table
CREATE TABLE IF NOT EXISTS public.course_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT NOT NULL,
  semester INTEGER NOT NULL CHECK (semester >= 1 AND semester <= 8),
  title TEXT NOT NULL,
  file_url TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on course_materials
ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;

-- Course materials policies - public read, authenticated write
CREATE POLICY "course_materials_select_all" ON public.course_materials FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "course_materials_insert_auth" ON public.course_materials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "course_materials_update_auth" ON public.course_materials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "course_materials_delete_auth" ON public.course_materials FOR DELETE TO authenticated USING (true);

-- Create students_corner table
CREATE TABLE IF NOT EXISTS public.students_corner (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on students_corner
ALTER TABLE public.students_corner ENABLE ROW LEVEL SECURITY;

-- Students corner policies - public read, authenticated write
CREATE POLICY "students_corner_select_all" ON public.students_corner FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "students_corner_insert_auth" ON public.students_corner FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "students_corner_update_auth" ON public.students_corner FOR UPDATE TO authenticated USING (true);
CREATE POLICY "students_corner_delete_auth" ON public.students_corner FOR DELETE TO authenticated USING (true);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Events policies - public read, authenticated write
CREATE POLICY "events_select_all" ON public.events FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "events_insert_auth" ON public.events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "events_update_auth" ON public.events FOR UPDATE TO authenticated USING (true);
CREATE POLICY "events_delete_auth" ON public.events FOR DELETE TO authenticated USING (true);

-- Create faculty table
CREATE TABLE IF NOT EXISTS public.faculty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  qualification TEXT,
  photo_url TEXT,
  contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on faculty
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;

-- Faculty policies - public read, authenticated write
CREATE POLICY "faculty_select_all" ON public.faculty FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "faculty_insert_auth" ON public.faculty FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "faculty_update_auth" ON public.faculty FOR UPDATE TO authenticated USING (true);
CREATE POLICY "faculty_delete_auth" ON public.faculty FOR DELETE TO authenticated USING (true);

-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on feedback
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Feedback policies - anyone can insert, authenticated can read
CREATE POLICY "feedback_insert_all" ON public.feedback FOR INSERT TO PUBLIC WITH CHECK (true);
CREATE POLICY "feedback_select_auth" ON public.feedback FOR SELECT TO authenticated USING (true);
