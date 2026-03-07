# Portfolio Backend

RESTful API built with Node.js, Express, and PostgreSQL for managing portfolio content, projects, skills, and contact messages.

## Setup

### Prerequisites
- Node.js >= 14
- PostgreSQL >= 12
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials and JWT secret:
```
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
JWT_SECRET=your_super_secret_key_here
CLIENT_URL=http://localhost:5173
PORT=5000
```

4. Initialize the database:
```bash
npm run db:setup
```

## Running

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)

### Skills
- `GET /api/skills` - List all skills

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get messages (auth required)

### GitHub
- `GET /api/github/repos` - Fetch user repositories

### Health
- `GET /api/health` - API health check

## Project Structure

```
backend/
├── config/
│   └── database.js       # Database connection pool
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── projects.js       # Projects routes
│   ├── skills.js         # Skills routes
│   ├── contact.js        # Contact routes
│   └── github.js         # GitHub proxy routes
├── schema.sql            # Database schema
├── server.js             # Main server entry point
├── .env.example          # Environment variables template
└── README.md             # This file
```

## Database Schema

- **admins** - Admin user accounts
- **projects** - Portfolio projects
- **skills** - Technical skills
- **contacts** - Contact form submissions

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://localhost:5432/portfolio_db |
| JWT_SECRET | Secret key for JWT signing | dev_secret_change_this |
| CLIENT_URL | Frontend URL for CORS | http://localhost:5173 |
| PORT | Server port | 5000 |
| GITHUB_TOKEN | GitHub API token (optional) | - |
