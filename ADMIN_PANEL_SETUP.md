# Admin Panel Complete Setup Guide

## System Architecture

Your portfolio website now has a fully integrated admin panel with **complete data persistence** to Supabase database.

### Data Flow

```
Admin Panel (React Component)
    ↓ (Save/Edit/Delete via API)
API Routes (/api/projects, /api/skills, /api/hero-settings)
    ↓ (Supabase Query)
Supabase Database (projects, hero_settings, skills tables)
    ↓ (Fetch via API)
Website Display Components
    ↓
User Sees Changes Instantly ✅
```

---

## Admin Panel Features

### 1. **Dashboard Overview**
- Summary of projects, skills, and messages
- Quick statistics and system status

### 2. **Hero Section Settings** ✅ NOW SAVES TO DATABASE
- Edit: Title, Subtitle, Description
- Update: Profile photo URL, Logo URL
- **Changes persist permanently** in Supabase
- Real-time sync to website hero section

### 3. **Projects Manager** ✅ FULLY WORKING
- **Add Projects**: Create new portfolio projects
- **Edit Projects**: Update existing projects
- **Delete Projects**: Remove with confirmation
- **Fields**: Title, Description, Tech Stack, Image URL, GitHub Link, Live Link
- **Database Persistence**: All changes saved to `projects` table
- **Real-time Sync**: Website displays updated projects immediately

### 4. **Skills Manager** ✅ NEW & FULLY WORKING
- **Add Skill Categories**: Frontend, Backend, Tools, etc.
- **Edit Skills**: Update categories and skill items
- **Delete Skills**: Remove skill categories
- **Database Persistence**: Saved to `skills` table
- **Real-time Sync**: Website skills section updates automatically

### 5. **Messages Manager** ✅ FULLY WORKING
- View all contact form submissions
- Delete spam/unwanted messages
- Reply directly via email
- Messages stored in Supabase

### 6. **Admin Settings**
- View admin email
- Change password (uses Supabase auth)
- Email configuration status
- System information

---

## Database Tables

### projects
```sql
- id: UUID (Primary Key)
- title: TEXT (Required)
- description: TEXT (Required)
- tech_stack: TEXT[] (Array of technologies)
- image_url: TEXT (Project screenshot)
- github_link: TEXT (GitHub repository URL)
- live_link: TEXT (Deployed project URL)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### hero_settings
```sql
- id: UUID (Primary Key)
- title: TEXT (e.g., "I'm Sangam Kunwar")
- subtitle: TEXT (e.g., "Full-Stack Developer")
- description: TEXT (Bio/tagline)
- photo_url: TEXT (Profile photo URL)
- logo_url: TEXT (Portfolio logo URL)
- updated_at: TIMESTAMP
```

### skills
```sql
- id: UUID (Primary Key)
- category: TEXT (e.g., "Frontend", "Backend", "Tools")
- items: TEXT[] (Array of skills in that category)
- updated_at: TIMESTAMP
```

---

## API Endpoints

All endpoints are fully implemented and connected to Supabase:

### Projects
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Hero Settings
- `GET /api/hero-settings` - Fetch hero content
- `PUT /api/hero-settings` - Create or update hero settings

### Skills
- `GET /api/skills` - Fetch all skill categories
- `POST /api/skills` - Create new skill category
- `PUT /api/skills/[id]` - Update skill category
- `DELETE /api/skills/[id]` - Delete skill category

---

## How to Use the Admin Panel

### 1. Access Admin Panel
```
URL: http://localhost:3000/admin
OR
https://yourdomain.com/admin

Email: sangamkunwar48@gmail.com
(Only this email has admin access)
```

### 2. Make Changes
- Navigate to any section (Hero, Projects, Skills)
- Edit or create new items
- Click "Save" or "Add" button
- See success message

### 3. Verify Changes
- Go to "View Website" button in sidebar
- Changes appear immediately on website ✅
- No page refresh needed

### 4. Delete Items
- Click trash icon on any item
- Confirm deletion
- Item removed from database and website instantly

---

## Row Level Security (RLS)

All tables have RLS enabled for security:

### Public Read Access
- Website can read all data without authentication
- Visitors can see projects, hero content, skills

### Authenticated Write Access
- Only logged-in users can add/edit/delete
- Admin email verification on admin panel
- API validation on server side

---

## Troubleshooting

### Changes not showing on website?
1. Check browser console for errors (F12)
2. Verify Supabase connection in environment variables
3. Clear browser cache (Ctrl+Shift+Delete)
4. Refresh website page

### Can't access admin panel?
1. Make sure you're logged in with: `sangamkunwar48@gmail.com`
2. Check if Supabase authentication is configured
3. Verify Google/GitHub OAuth is set up correctly

### Database errors?
1. Check Supabase dashboard: https://supabase.com/dashboard
2. Verify project is online (not in maintenance)
3. Check RLS policies are enabled
4. View database tables in SQL editor

---

## Environment Variables Required

Make sure these are set in your Vercel project:

```
NEXT_PUBLIC_SUPABASE_URL=https://uhunxhnvvadynrfbsowp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_POSTGRES_URL=[connection-string]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
RESEND_API_KEY=[for-contact-emails]
```

---

## Features Summary

| Feature | Status | Database | Website Sync |
|---------|--------|----------|--------------|
| Hero Section Edit | ✅ Works | Supabase | Real-time |
| Projects CRUD | ✅ Works | Supabase | Real-time |
| Skills Management | ✅ Works | Supabase | Real-time |
| Messages View | ✅ Works | Supabase | - |
| Password Change | ✅ Works | Supabase Auth | - |
| Admin Auth | ✅ Works | Supabase Auth | - |

---

## Complete Admin Workflow Example

### Adding a New Project:
1. Go to Admin Panel → Projects
2. Click "Add Project"
3. Fill in:
   - Title: "My New App"
   - Description: "Built with React and Node.js"
   - Tech Stack: React, Node.js, MongoDB
   - Image URL: [screenshot URL]
   - GitHub Link: https://github.com/user/repo
   - Live Link: https://mynewapp.com
4. Click "Add Project"
5. See success message
6. Go to website homepage
7. **New project appears in Projects section instantly!** ✅

### Editing Hero Section:
1. Go to Admin Panel → Hero Section
2. Change title to "I'm John Doe"
3. Change subtitle to "Senior Full-Stack Developer"
4. Upload new profile photo URL
5. Click "Save Changes"
6. Go to website homepage
7. **Hero section updated immediately!** ✅

### Managing Skills:
1. Go to Admin Panel → Skills
2. Click "Add Skill Category"
3. Add category: "DevOps"
4. Add skills: Docker, Kubernetes, AWS
5. Click "Add Category"
6. Go to website Skills section
7. **DevOps skills appear instantly!** ✅

---

## Next Steps

1. ✅ Admin panel is fully functional
2. ✅ All data saves to Supabase
3. ✅ Website displays changes in real-time
4. Configure Google/GitHub OAuth for login (optional)
5. Set up email notifications (Resend API)
6. Deploy to production with Vercel

---

**Status: ADMIN PANEL FULLY WORKING AND SYNCED WITH WEBSITE! 🚀**
