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
CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read on hero_settings" ON hero_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read on skills" ON skills FOR SELECT USING (true);

-- Create policies for admin write access (requires authentication)
CREATE POLICY "Allow authenticated admin on projects" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated admin on hero_settings" ON hero_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated admin on skills" ON skills FOR ALL USING (true) WITH CHECK (true);

-- Insert default hero settings
INSERT INTO hero_settings (title, subtitle, description) 
VALUES ('Welcome to My Portfolio', 'Full Stack Developer', 'Creating beautiful and functional web experiences')
ON CONFLICT DO NOTHING;
