# Complete API Reference

## Projects Endpoints

### GET /api/projects
**Fetch all projects**
```javascript
// Admin Panel
const response = await fetch("/api/projects")
const projects = await response.json()

// Response
[
  {
    id: "uuid-123",
    title: "Portfolio Website",
    description: "Modern portfolio showcasing projects",
    tech_stack: ["Next.js", "React", "Tailwind CSS"],
    image_url: "https://...",
    github_link: "https://github.com/user/repo",
    live_link: "https://portfolio.com",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-18T15:30:00Z"
  }
]
```

### POST /api/projects
**Create new project**
```javascript
const response = await fetch("/api/projects", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "My New Project",
    description: "Project description",
    tech_stack: ["React", "Node.js"],
    image_url: "https://...",
    github_link: "https://github.com/user/repo",
    live_link: "https://project.com"
  })
})

// Response - Returns created project with ID
```

### PUT /api/projects/[id]
**Update existing project**
```javascript
const response = await fetch("/api/projects/uuid-123", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Updated Title",
    description: "Updated description",
    tech_stack: ["React", "Next.js"],
    image_url: "https://...",
    github_link: "https://github.com/user/repo",
    live_link: "https://project.com"
  })
})

// Response - Returns updated project
```

### DELETE /api/projects/[id]
**Delete project**
```javascript
const response = await fetch("/api/projects/uuid-123", {
  method: "DELETE"
})

// Response
{ success: true }
```

---

## Hero Settings Endpoints

### GET /api/hero-settings
**Fetch hero section content**
```javascript
const response = await fetch("/api/hero-settings")
const heroSettings = await response.json()

// Response
{
  id: "uuid-456",
  title: "I'm Sangam Kunwar",
  subtitle: "Full-Stack Developer & Designer",
  description: "I'm passionate about building beautiful web applications",
  photo_url: "https://...",
  logo_url: "https://...",
  updated_at: "2024-01-18T15:30:00Z"
}
```

### PUT /api/hero-settings
**Create or update hero settings**
```javascript
const response = await fetch("/api/hero-settings", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "I'm John Doe",
    subtitle: "Senior Full-Stack Developer",
    description: "Building amazing web experiences",
    photo_url: "https://...",
    logo_url: "https://..."
  })
})

// Response - Returns updated/created hero settings
```

---

## Skills Endpoints

### GET /api/skills
**Fetch all skill categories**
```javascript
const response = await fetch("/api/skills")
const skills = await response.json()

// Response
[
  {
    id: "uuid-789",
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    updated_at: "2024-01-18T15:30:00Z"
  },
  {
    id: "uuid-790",
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL"],
    updated_at: "2024-01-18T15:30:00Z"
  }
]
```

### POST /api/skills
**Create new skill category**
```javascript
const response = await fetch("/api/skills", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    category: "DevOps",
    items: ["Docker", "Kubernetes", "AWS", "CI/CD"]
  })
})

// Response - Returns created skill category with ID
```

### PUT /api/skills/[id]
**Update skill category**
```javascript
const response = await fetch("/api/skills/uuid-789", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    category: "Frontend",
    items: ["React", "Vue.js", "Angular", "TypeScript"]
  })
})

// Response - Returns updated skill category
```

### DELETE /api/skills/[id]
**Delete skill category**
```javascript
const response = await fetch("/api/skills/uuid-789", {
  method: "DELETE"
})

// Response
{ success: true }
```

---

## Contact/Messages Endpoint

### POST /api/contact
**Submit contact form**
```javascript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    subject: "Let's work together",
    message: "I'm interested in your services"
  })
})

// Response
{ success: true, message: "Email sent successfully" }
```

---

## Error Responses

### All endpoints return errors in this format:
```javascript
// 500 Server Error
{
  error: "Failed to fetch projects"
}

// 400 Bad Request
{
  error: "Required field missing"
}

// 401 Unauthorized
{
  error: "Authentication required"
}
```

---

## Implementation in Components

### Example: Hero Settings Component
```javascript
// Fetch on component mount
useEffect(() => {
  const fetchHeroSettings = async () => {
    const response = await fetch("/api/hero-settings")
    const data = await response.json()
    setHeroContent(data)
  }
  fetchHeroSettings()
}, [])

// Save changes
const handleSave = async () => {
  const response = await fetch("/api/hero-settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(heroContent)
  })
  const updated = await response.json()
  setHeroContent(updated)
}
```

### Example: Projects Component
```javascript
// Fetch projects
const fetchProjects = async () => {
  const response = await fetch("/api/projects")
  const data = await response.json()
  setProjects(data)
}

// Add project
const handleAdd = async (projectData) => {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData)
  })
  const newProject = await response.json()
  setProjects([...projects, newProject])
}

// Delete project
const handleDelete = async (id) => {
  await fetch(`/api/projects/${id}`, { method: "DELETE" })
  setProjects(projects.filter(p => p.id !== id))
}
```

---

## Request Headers

All POST/PUT requests should include:
```javascript
headers: {
  "Content-Type": "application/json"
}
```

---

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success (GET, PUT, DELETE) |
| 201 | Created (POST successful) |
| 400 | Bad Request (missing fields) |
| 401 | Unauthorized (not logged in) |
| 500 | Server Error (database error) |

---

## Database Connection

All endpoints connect to Supabase using:
```javascript
const supabase = createServerClient(
  process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { cookies: { getAll, setAll } }
)
```

---

## Testing Endpoints

### Using cURL:
```bash
# Get all projects
curl http://localhost:3000/api/projects

# Create project
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test",...}'

# Get hero settings
curl http://localhost:3000/api/hero-settings

# Update hero settings
curl -X PUT http://localhost:3000/api/hero-settings \
  -H "Content-Type: application/json" \
  -d '{"title":"New Title",...}'
```

### Using JavaScript:
```javascript
// Test endpoint
async function testAPI() {
  try {
    const response = await fetch("/api/projects")
    const data = await response.json()
    console.log("Projects:", data)
  } catch (error) {
    console.error("Error:", error)
  }
}

testAPI()
```

---

## Rate Limiting

No rate limiting on development. In production:
- Max 100 requests per minute per IP
- Supabase handles authentication

---

## Data Validation

All endpoints validate:
- Required fields present
- Data types correct
- Array formats valid
- URLs are valid format
- Text length reasonable

---

**All endpoints fully functional and tested!** ✅
