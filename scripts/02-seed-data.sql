-- Seed initial data for portfolio

-- Insert sample projects
INSERT INTO projects (title, description, tech_stack, image_url, github_link, live_link) VALUES
('Portfolio Website', 'Modern portfolio showcasing projects and collaborations', ARRAY['Next.js', 'React', 'Tailwind CSS'], 'https://via.placeholder.com/400x250?text=Portfolio', 'https://github.com', 'https://example.com'),
('E-commerce Platform', 'Full-stack e-commerce solution with payment integration', ARRAY['Node.js', 'MongoDB', 'React'], 'https://via.placeholder.com/400x250?text=Ecommerce', 'https://github.com', 'https://example.com'),
('Analytics Dashboard', 'Data visualization dashboard with interactive charts', ARRAY['Next.js', 'Recharts', 'Supabase'], 'https://via.placeholder.com/400x250?text=Analytics', 'https://github.com', 'https://example.com');

-- Insert sample skills
INSERT INTO skills (category, items) VALUES
('Frontend', ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript']),
('Backend', ARRAY['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'APIs', 'REST']),
('Tools', ARRAY['Git', 'Docker', 'AWS', 'Vercel', 'GitHub', 'VS Code']);
