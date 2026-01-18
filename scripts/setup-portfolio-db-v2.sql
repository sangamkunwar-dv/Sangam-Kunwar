-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read on projects" ON projects;
DROP POLICY IF EXISTS "Allow public read on hero_settings" ON hero_settings;
DROP POLICY IF EXISTS "Allow public read on skills" ON skills;
DROP POLICY IF EXISTS "Allow authenticated admin on projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated admin on hero_settings" ON hero_settings;
DROP POLICY IF EXISTS "Allow authenticated admin on skills" ON skills;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  image_url TEXT,
  github_link TEXT,
  live_link TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create hero_settings table
CREATE TABLE IF NOT EXISTS hero_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  photo_url TEXT,
  logo_url TEXT,
  updated_at TIMESTAMP DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  items TEXT[] NOT NULL,
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "public_read_projects" ON projects FOR SELECT USING (true);
CREATE POLICY "public_read_hero" ON hero_settings FOR SELECT USING (true);
CREATE POLICY "public_read_skills" ON skills FOR SELECT USING (true);

-- Create policies for authenticated write access
CREATE POLICY "authenticated_write_projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "authenticated_update_projects" ON projects FOR UPDATE WITH CHECK (true);
CREATE POLICY "authenticated_delete_projects" ON projects FOR DELETE USING (true);

CREATE POLICY "authenticated_write_hero" ON hero_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "authenticated_update_hero" ON hero_settings FOR UPDATE WITH CHECK (true);
CREATE POLICY "authenticated_delete_hero" ON hero_settings FOR DELETE USING (true);

CREATE POLICY "authenticated_write_skills" ON skills FOR INSERT WITH CHECK (true);
CREATE POLICY "authenticated_update_skills" ON skills FOR UPDATE WITH CHECK (true);
CREATE POLICY "authenticated_delete_skills" ON skills FOR DELETE USING (true);

-- Insert default hero settings
INSERT INTO hero_settings (title, subtitle, description) 
VALUES ('Welcome to My Portfolio', 'Full Stack Developer', 'Creating beautiful and functional web experiences')
ON CONFLICT DO NOTHING;

-- Insert sample project
INSERT INTO projects (title, description, tech_stack, github_link, live_link)
VALUES (
  'Sample Project',
  'This is a sample project to get you started',
  ARRAY['React', 'Next.js', 'Tailwind CSS'],
  'https://github.com',
  'https://example.com'
)
ON CONFLICT DO NOTHING;
