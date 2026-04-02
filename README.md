# 🚀 Portfolio — Full-Stack Application

A professional portfolio application with a modular React frontend and scalable Express.js backend.

---

## 📁 Organized Project Structure

```
portfolio/
├── backend/                        # Express.js REST API
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js                 # POST /login
│   │   ├── projects.js             # GET/POST/PUT/DELETE projects
│   │   ├── skills.js               # GET skills
│   │   ├── contact.js              # POST/GET contact messages
│   │   └── github.js               # GET GitHub repositories
│   ├── server.js                   # Main entry point
│   ├── .env.example                # Environment variables template
│   ├── package.json
│   └── README.md                   # Backend documentation
│
├── frontend/                       # React portfolio website
│   ├── components/                 # Reusable React components
│   ├── pages/                      # Page-level components
│   ├── styles/                     # CSS and styling files
│   ├── portfolio.jsx               # Main portfolio component
│   ├── package.json
│   └── README.md                   # Frontend documentation
│
├── package.json                    # Node.js dependencies
├── .env.example                    # Global environment template
├── .gitignore                      # Git ignore configuration
└── README.md                       # This file
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js >= 14
- npm or yarn

---

## 🔌 API Endpoints

### Public Routes
| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/api/health`        | Server health check      |
| GET    | `/api/projects`      | List all projects        |
| GET    | `/api/skills`        | List all skills          |
| GET    | `/api/github/repos`  | Fetch GitHub repos       |
| POST   | `/api/contact`       | Submit contact message   |
| POST   | `/api/auth/login`    | Admin login → JWT token  |

### Protected Routes (JWT Required)
| Method | Endpoint              | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/projects`       | Create new project       |
| PUT    | `/api/projects/:id`   | Update project           |
| DELETE | `/api/projects/:id`   | Delete project           |
| GET    | `/api/contact`        | View contact messages    |

---

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- JWT authentication with bcryptjs
- Helmet, CORS, Rate limiting

**Frontend:**
- React 18+ with Hooks
- CSS for styling
- Fetch API for HTTP requests

**Infrastructure:**
- Environment-based configuration
- Rate limiting (15min windows, 100 requests/IP)

---

## 📋 Features

✅ **Projects Management** - Create, read, update, delete portfolio projects  
✅ **Skills Tracking** - Organize skills by category with proficiency levels  
✅ **GitHub Integration** - Real-time repository fetching from GitHub API  
✅ **Contact Form** - Message submission with admin notification  
✅ **Admin Panel** - Authentication & CRUD operations for projects  
✅ **Security** - JWT tokens, password hashing, rate limiting, security headers  
✅ **Responsive Design** - Mobile-friendly React components  
✅ **Modular Architecture** - Organized routes, middleware, and config

---

## 🚀 Deployment

### Backend Options
- Heroku, Railway, Render, AWS (Elastic Beanstalk, EC2)
- Set environment variables for production database/secret

### Frontend Options
- Vercel, Netlify, AWS S3 + CloudFront, GitHub Pages

---

## 📝 Environment Variables

### Backend (.env)
```
JWT_SECRET=your_secret_key_change_in_production
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
GITHUB_TOKEN=optional_github_api_token
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_GITHUB_USER=GodelVivek1068
```

---

## 📚 Documentation

- See [backend/README.md](backend/README.md) for detailed backend documentation
- See [frontend/README.md](frontend/README.md) for frontend setup & components

---

## 👨‍💻 Development Scripts

```bash
# Backend
cd backend
npm install        # Install dependencies
npm run dev        # Start with auto-reload
npm run db:setup   # Initialize database
npm start          # Production mode

# Frontend
cd frontend
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## ⚖️ License

This project is open source and available for portfolio demonstration purposes.

---

For detailed setup and development instructions, see the individual README files in the `backend/` and `frontend/` directories.
- Toggle project featured status

---

## 🚢 Deployment

### Backend (Railway / Render)
```bash
# Set environment variables in your hosting platform
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
NODE_ENV=production
```

### Frontend (Vercel / Netlify)
```bash
npm run build
# Deploy /dist folder
# Set VITE_API_URL=https://your-backend.railway.app
```

---

## 📝 Environment Variables

```env
PORT=4000
DATABASE_URL=postgresql://user:pass@host:5432/portfolio_db
JWT_SECRET=change_this_to_a_strong_random_secret
CLIENT_URL=https://vivekjadhav.dev
GITHUB_TOKEN=optional_for_higher_rate_limits
```

---

*Built with ❤️ by Vivek Jadhav*
