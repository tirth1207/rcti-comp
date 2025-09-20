-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('newsletters', 'newsletters', true),
  ('materials', 'materials', true),
  ('events', 'events', true),
  ('faculty', 'faculty', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for newsletters bucket
CREATE POLICY "newsletters_bucket_select" ON storage.objects FOR SELECT USING (bucket_id = 'newsletters');
CREATE POLICY "newsletters_bucket_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'newsletters' AND auth.role() = 'authenticated');
CREATE POLICY "newsletters_bucket_update" ON storage.objects FOR UPDATE USING (bucket_id = 'newsletters' AND auth.role() = 'authenticated');
CREATE POLICY "newsletters_bucket_delete" ON storage.objects FOR DELETE USING (bucket_id = 'newsletters' AND auth.role() = 'authenticated');

-- Set up storage policies for materials bucket
CREATE POLICY "materials_bucket_select" ON storage.objects FOR SELECT USING (bucket_id = 'materials');
CREATE POLICY "materials_bucket_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'materials' AND auth.role() = 'authenticated');
CREATE POLICY "materials_bucket_update" ON storage.objects FOR UPDATE USING (bucket_id = 'materials' AND auth.role() = 'authenticated');
CREATE POLICY "materials_bucket_delete" ON storage.objects FOR DELETE USING (bucket_id = 'materials' AND auth.role() = 'authenticated');

-- Set up storage policies for events bucket
CREATE POLICY "events_bucket_select" ON storage.objects FOR SELECT USING (bucket_id = 'events');
CREATE POLICY "events_bucket_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'events' AND auth.role() = 'authenticated');
CREATE POLICY "events_bucket_update" ON storage.objects FOR UPDATE USING (bucket_id = 'events' AND auth.role() = 'authenticated');
CREATE POLICY "events_bucket_delete" ON storage.objects FOR DELETE USING (bucket_id = 'events' AND auth.role() = 'authenticated');

-- Set up storage policies for faculty bucket
CREATE POLICY "faculty_bucket_select" ON storage.objects FOR SELECT USING (bucket_id = 'faculty');
CREATE POLICY "faculty_bucket_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'faculty' AND auth.role() = 'authenticated');
CREATE POLICY "faculty_bucket_update" ON storage.objects FOR UPDATE USING (bucket_id = 'faculty' AND auth.role() = 'authenticated');
CREATE POLICY "faculty_bucket_delete" ON storage.objects FOR DELETE USING (bucket_id = 'faculty' AND auth.role() = 'authenticated');
