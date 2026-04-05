# 🚀 Portfolio — Full-Stack Application

A professional portfolio application showcasing projects, skills, and GitHub repositories with an admin panel for content management.

**Tech Stack:** Node.js + Express.js | React 18+ | Vite | JWT Authentication | CORS | Rate Limiting

---

## 📁 Project Structure

```
portfolio/
├── backend/                           # Express.js REST API Server
│   ├── middleware/
│   │   └── auth.js                    # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js                    # Authentication endpoints
│   │   ├── projects.js                # Projects CRUD operations
│   │   ├── skills.js                  # Skills endpoints
│   │   ├── contact.js                 # Contact form & messages
│   │   └── github.js                  # GitHub API proxy
│   ├── server.js                      # Main Express server
│   ├── .env.example                   # Environment variables template
│   ├── package.json                   # Backend dependencies
│   └── README.md                      # Backend documentation
│
├── frontend/                          # React Portfolio Website
│   ├── components/                    # Reusable React components
│   ├── pages/                         # Page-level components
│   ├── styles/                        # CSS stylesheets
│   ├── src/
│   │   ├── App.jsx                    # Main app component
│   │   ├── main.jsx                   # React entry point
│   │   └── portfolio.jsx              # Portfolio component
│   ├── index.html                     # HTML entry point
│   ├── vite.config.js                 # Vite configuration
│   ├── package.json                   # Frontend dependencies
│   └── README.md                      # Frontend documentation
│
├── package.json                       # Root dependencies
├── server.js                          # Optional root server file
├── Procfile                           # Process file for deployment
├── .env.example                       # Global environment template
├── .gitignore                         # Git ignore rules
└── README.md                          # This file
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** >= 14 (24.x recommended)
- **npm** >= 10.x
- **git**

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your settings:
# - JWT_SECRET: Your secret key for JWT tokens
# - CLIENT_URL: Frontend URL (http://localhost:5173 for dev)
# - PORT: Server port (default: 5000)
```

Start the backend:
```bash
npm run dev          # Development mode (with auto-reload via nodemon)
npm start            # Production mode
```

Backend server runs at `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Frontend app runs at `http://localhost:5173`

---

## 🔌 API Reference

### Public Endpoints (No Authentication Required)

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/api/projects`      | Fetch all projects       |
| GET    | `/api/skills`        | Fetch all skills         |
| GET    | `/api/github/repos`  | Fetch GitHub repositories|
| POST   | `/api/contact`       | Submit contact message   |
| POST   | `/api/auth/login`    | Admin login (returns JWT)|

### Protected Endpoints (JWT Token Required)

| Method | Endpoint              | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/projects`       | Create new project       |
| PUT    | `/api/projects/:id`   | Update project by ID     |
| DELETE | `/api/projects/:id`   | Delete project by ID     |
| GET    | `/api/contact`        | View all contact messages|

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | Node.js 24.x | JavaScript runtime |
| | Express.js 4.x | HTTP server framework |
| | CORS | Cross-origin requests |
| | Helmet | Security headers |
| | express-rate-limit | API rate limiting |
| **Frontend** | React 18+ | UI library |
| | Vite | Build tool & dev server |
| | CSS | Styling |
| | Fetch API | HTTP requests |
| **Security** | JWT | Token authentication |
| **Dev Tools** | nodemon | Auto-reload backend |
| | npm | Package management |

---

## 📋 Key Features

✅ **Full-Stack Application** - Complete frontend & backend  
✅ **Projects Management** - Create, read, update, delete portfolio projects  
✅ **Skills Showcase** - Organize technical skills by category  
✅ **GitHub Integration** - Display real-time repositories via GitHub API  
✅ **Contact System** - Message submission and admin inbox  
✅ **Admin Authentication** - JWT-based admin panel access  
✅ **Security Hardening** - Helmet headers, rate limiting, CORS  
✅ **Responsive Design** - Mobile-friendly React components  
✅ **Modular Architecture** - Clean separation of concerns  

---

## 🚀 Deployment

### Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories:

**Backend (.env)**
```
PORT=5000
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000
```

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production
cd ../backend
npm start
```

---

## 📚 Documentation

- [Backend Documentation](backend/README.md) - API setup, endpoints, and server configuration
- [Frontend Documentation](frontend/README.md) - React components, styling, and UI setup

---

## 🔐 Security Features

- **JWT Authentication** - Secure admin access with tokens
- **Helmet.js** - Automatic security header protection
- **CORS** - Controlled cross-origin requests
- **Rate Limiting** - 100 requests per IP per 15 minutes
- **Environment Variables** - Sensitive data kept in .env files
- **HTTPS Ready** - Production-ready security configuration

---

## 📝 Development Notes

- Backend uses **Express.js** for routing and middleware
- Frontend uses **React with Hooks** for state management
- **Nodemon** auto-reloads the backend during development
- **Vite** provides fast HMR (hot module replacement) for frontend
- Both projects use **npm scripts** for common tasks

---

## ❓ Troubleshooting

**Backend won't start:**
- Ensure Node.js 24.x is installed: `node --version`
- Install dependencies: `npm install`
- Check `.env` file exists in `backend/`

**Frontend won't start:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Restart Vite dev server: `npm run dev`

**API requests failing:**
- Verify backend is running on correct port (default: 5000)
- Check `CLIENT_URL` in backend `.env` matches frontend URL
- Check browser console for CORS errors

---

## 📄 License

This project is your personal portfolio. Customize and deploy as needed!

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
