# Sturdy-portfolio-ANKA-190
Portfolio project for Year 1, Semester 2 of UNASAT Software Engineering

**Tech Stack:** Node.js + Express + MySQL + Vanilla JavaScript  
**Pattern:** MVC (Models, Views, Controllers)

## Project Structure

```
portfolio-api/
├── config/              # Database connection config
│   └── db.js
├── routes/              # API route definitions
│   └── projectRoutes.js
├── controllers/         # Business logic
│   └── projectController.js
├── models/              # Database queries
│   └── projectModel.js
├── middleware/          # Auth, validation, error handling
│   └── authMiddleware.js
├── public/              # Frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── app.js               # Express app entry point
├── package.json         # Dependencies
├── database.sql         # Database schema & sample data
├── .env.example         # Environment variables template
├── .gitignore
└── README.md
```

## Architecture: Request-to-Response Flow

```
Browser (Vanilla JS)
    ↓ fetch('/api/projects')
Routes (/api/projects)
    ↓ getProjects()
Controllers (Business Logic)
    ↓ Project.getAll()
Models (SQL Queries)
    ↓
MySQL Database
    ↓ returns data
Models (format data)
    ↓
Controllers (build response)
    ↓
Routes (send JSON)
    ↓
Browser (render projects)
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `.env` with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db
PORT=3000
```

### 3. Set Up Database
Run the SQL schema:
```bash
mysql -u root -p < database.sql
```

Or manually:
```sql
mysql> CREATE DATABASE portfolio_db;
mysql> USE portfolio_db;
mysql> [paste contents of database.sql]
```

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

### Projects (Fully Implemented)
- `GET /api/projects` — Get all projects
- `GET /api/projects/:id` — Get single project
- `POST /api/projects` — Create project
- `PUT /api/projects/:id` — Update project
- `DELETE /api/projects/:id` — Delete project

### Messages (To Be Implemented)
- `POST /api/messages` — Submit contact form

## Current Status

✅ **Complete:**
- Project structure & folder organization
- Database schema with sample data
- Projects CRUD endpoints
- Frontend HTML/CSS/JS
- API client (fetch in JavaScript)

⏳ **In Progress:**
- Messages API endpoint
- Authentication/Authorization
- Input validation middleware

❌ **Not Started:**
- Admin dashboard
- JWT tokens
- Email notifications
- Deployment

## Testing Endpoints

### Using Fetch (in browser console)
```javascript
// Get all projects
fetch('/api/projects').then(r => r.json()).then(d => console.log(d))

// Create project
fetch('/api/projects', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    title: 'Test',
    description: 'Test project'
  })
}).then(r => r.json()).then(d => console.log(d))
```

### Using Thunder Client or Postman
- Base URL: `http://localhost:3000`
- Test each endpoint manually

## Learning Outcomes

This project teaches:
- **REST API design** — RESTful endpoints, HTTP methods
- **MVC architecture** — Separation of concerns
- **Database design** — Schema, relationships, queries
- **Frontend-Backend communication** — fetch(), API contracts
- **Middleware** — Request/response pipeline
- **Error handling** — Proper HTTP status codes

## Next Steps

1. Implement `/api/messages` endpoint
2. Build authentication middleware
3. Add input validation
4. Create admin dashboard
5. Deploy to production server
