# Portfolio Project

A full-stack portfolio application with a Node.js/Express backend and React frontend. Features project showcasing, skill management, GitHub integration, and a contact system.

**Ready for deployment on Railway!** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for step-by-step instructions.

## Project Structure

```
portfolio/
├── backend/                    # Express.js REST API
│   ├── config/
│   │   └── database.js         # PostgreSQL connection
│   ├── middleware/
│   │   └── auth.js             # JWT authentication
│   ├── routes/
│   │   ├── auth.js             # Authentication endpoints
│   │   ├── projects.js         # Projects CRUD
│   │   ├── skills.js           # Skills endpoints
│   │   ├── contact.js          # Contact form & messages
│   │   └── github.js           # GitHub API proxy
│   ├── schema.sql              # Database schema & seed data
│   ├── server.js               # Main server file
│   ├── .env.example            # Environment template
│   ├── .env.production         # Production configuration
│   ├── railway.toml            # Railway config
│   └── README.md               # Backend documentation
│
├── frontend/                   # React portfolio website
│   ├── components/             # Reusable React components
│   ├── pages/                  # Page components
│   ├── styles/                 # CSS files
│   ├── portfolio.jsx           # Main component
│   ├── .env.production         # Production configuration
│   ├── railway.toml            # Railway config
│   └── README.md               # Frontend documentation
│
├── package.json                # Node.js dependencies
├── .env.example                # Global environment template
├── .gitignore                  # Git ignore rules
├── Procfile                    # Process file for Railway
├── railway.json                # Root Railway config
├── DEPLOYMENT_GUIDE.md         # 📚 Detailed deployment instructions
├── DEPLOYMENT_SUMMARY.md       # 🚀 Quick deployment summary
├── deploy.sh                   # Setup script (Linux/Mac)
├── deploy.bat                  # Setup script (Windows)
└── README.md                   # This file
```

## Quick Start (Development)

### Prerequisites
- Node.js >= 14
- PostgreSQL >= 12
- npm/yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials
# Then initialize database
npm run db:setup

# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🚀 Deployment

### Railway Deployment (Recommended)

This project is configured for easy deployment to Railway with PostgreSQL.

**Quick Start:**
1. See [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) for quick checklist
2. See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions

**Key Files:**
- `railway.json` - Root Railway configuration
- `backend/railway.toml` - Backend Railway config
- `frontend/railway.toml` - Frontend Railway config
- `backend/.env.production` - Backend production variables template
- `frontend/.env.production` - Frontend production variables template

**Prerequisites:**
- GitHub account with code pushed
- Railway account (free tier available)
- Generated JWT secret (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT with bcrypt
- **Security:** Helmet, CORS, Rate limiting
- **Deployment:** Railway

### Frontend
- **Framework:** React 18+
- **Build Tool:** Vite
- **State:** React Hooks
- **Styling:** CSS
- **Deployment:** Vercel or Railway

## API Endpoints

See [backend/README.md](backend/README.md) for full API documentation.

### Key Routes
- `/api/health` - Health check
- `/api/auth/login` - Admin authentication
- `/api/projects` - Projects management
- `/api/skills` - Technical skills
- `/api/contact` - Contact form & messages
- `/api/github/repos` - GitHub repositories proxy

## Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories.

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
GITHUB_TOKEN=optional_github_token
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_GITHUB_USER=GodelVivek1068
```

## Development Scripts

### Backend
```bash
npm start              # Production build
npm run dev            # Development with auto-reload
npm run db:setup       # Initialize database
```

### Frontend
```bash
npm run dev            # Development server
npm run build          # Production build
npm run preview        # Preview production build
```

## Database

The PostgreSQL database includes:
- **admins** - Admin user accounts
- **projects** - Portfolio projects
- **skills** - Technical skills with levels
- **contacts** - Contact form submissions

Run `npm run db:setup` to initialize with seed data.

## Features

- ✅ Project showcase with GitHub/Live links
- ✅ Skill inventory with proficiency levels
- ✅ Real-time GitHub repository integration
- ✅ Contact form with admin panel
- ✅ JWT-based admin authentication
- ✅ Responsive design
- ✅ Rate limiting & security headers
- ✅ Modular API architecture

## Deployment

### Backend
Can be deployed to:
- Heroku
- AWS (EC2, Elastic Beanstalk)
- DigitalOcean
- Railway
- Render

### Frontend
Can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting

## File Organization Notes

- **backend/** contains all server-side logic and API routes
- **frontend/** contains the React UI application
- Configuration files extracted into `config/` for maintainability
- Routes organized by feature (auth, projects, skills, etc.)
- Middleware isolated for reusability
- Database schema and seed data in `schema.sql`

## Next Steps

1. ✅ Set up backend database schema
2. ✅ Configure environment variables
3. ✅ Implement frontend components (extract from portfolio.jsx)
4. ✅ Add styling to components
5. ✅ Test API endpoints
6. ✅ Deploy backend and frontend

---

For detailed information, see:
- [Backend Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md)
