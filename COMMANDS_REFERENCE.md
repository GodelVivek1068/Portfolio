# 🚀 Railway Deployment - Command Reference

Quick command reference for deploying to Railway.

## Prerequisites Installation

```bash
# Install Node.js (if not already installed)
# Download from: https://nodejs.org

# Verify Node.js
node --version      # Should be v14 or higher
npm --version       # Comes with Node.js

# Install Git (if not already installed)
# Download from: https://git-scm.com

# Create GitHub account
# https://github.com/signup
```

## Project Preparation

```bash
# Navigate to project
cd c:\Users\Dell\portfolio

# (Windows) OR - cd /Users/Dell/portfolio (Mac/Linux)

# Install dependencies
npm install
cd frontend && npm install && cd ..

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for Railway deployment"
```

## GitHub Setup

```bash
# Create new repository on GitHub at https://github.com/new
# Then add remote and push:

git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main

# Verify push succeeded
git log --oneline origin/main
```

## Generate JWT Secret

```bash
# Generate a strong 32-character secret key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Output will look like:
# a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6

# Copy this and save it for later
```

## Update Environment Files

```bash
# Edit backend/.env.production
# Add your values:

DATABASE_URL=postgresql://user:password@host:5432/database_name
JWT_SECRET=<PASTE_YOUR_GENERATED_SECRET_HERE>
NODE_ENV=production
PORT=3000
CLIENT_URL=https://your-frontend-url.com

# Edit frontend/.env.production
# Add:

VITE_API_URL=https://your-backend-railway.railway.app
```

## Deploy Backend to Railway

```bash
# Visit: https://railway.app
# 1. Sign up or login with GitHub
# 2. Click "New Project"
# 3. Select "Deploy from GitHub"
# 4. Authorize GitHub access
# 5. Select your portfolio repository
# 6. Select root directory (leave blank or /)
# 7. Confirm deployment

# In Railway Dashboard, add environment variables:
# - DATABASE_URL (Railway PostgreSQL will provide)
# - JWT_SECRET (from generated secret)
# - NODE_ENV=production
# - PORT=3000
# - CLIENT_URL=https://your-frontend-url.com

# Railway auto-deploys from GitHub
```

## Deploy Frontend to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts:
# Project name: portfolio-frontend
# Framework: Vite
# Root directory: ./ (or leave default)
# Output directory: dist

# After deployment, add environment variable in Vercel dashboard:
# VITE_API_URL=https://your-backend-railway.railway.app

# Redeploy after env var change
vercel --prod
```

## Alternative: Deploy Frontend to Railway

```bash
# In Railway Dashboard:
# 1. Create new service
# 2. Select frontend directory
# 3. Set build command: npm run build
# 4. Set start command: npm run preview
# 5. Add VITE_API_URL environment variable
```

## Verify Deployment

```bash
# Test backend health
curl https://your-backend-railway.railway.app/api/health

# Test projects endpoint
curl https://your-backend-railway.railway.app/api/projects

# Visit frontend in browser
# https://your-frontend-vercel.vercel.app

# Or
# https://your-frontend-railway.railway.app
```

## Database Setup (First Time)

```bash
# After first deployment, initialize database schema:

# Option 1: In Railway Console
psql $DATABASE_URL
\i schema.sql

# Option 2: Via psql command
psql "your-full-database-url" -f schema.sql

# Verify tables created
psql "your-full-database-url" -c "\dt"
```

## Update After Deployment

```bash
# After making code changes:

# 1. Commit changes
git add .
git commit -m "Your commit message"

# 2. Push to GitHub
git push origin main

# 3. Railway auto-deploys
# 4. Vercel auto-deploys
# 5. Check deployment progress in their dashboards
```

## Common Tasks

### View Backend Logs
```bash
# Railway Dashboard → Your Backend Service → Logs
# Or view in Railway CLI if installed
```

### Connect to Database
```bash
# Get DATABASE_URL from Railway environment variables
# Then:
psql "DATABASE_URL_VALUE_HERE"

# Inside psql:
\dt                    # List tables
SELECT * FROM admins;  # View admin users
\q                     # Quit
```

### Restart Backend Service
```bash
# In Railway Dashboard:
# Service → More → Restart
```

### Update Environment Variables
```bash
# In Railway Dashboard:
# 1. Click your service
# 2. Variables tab
# 3. Edit values
# 4. Service auto-restarts
```

### Change Frontend API URL
```bash
# In Vercel Dashboard:
# 1. Select project
# 2. Settings → Environment Variables
# 3. Update VITE_API_URL
# 4. Redeploy with: vercel --prod
```

## Troubleshooting Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check Git status
git status

# View recent commits
git log --oneline -10

# Check package.json
cat package.json

# View environment variables (don't commit!)
cat backend/.env.production

# Test database connection
psql "your-database-url" -c "SELECT 1;"

# View build output size
du -sh frontend/dist/

# Rebuild frontend
cd frontend && npm run build && cd ..
```

## Git Useful Commands

```bash
# Check remote URL
git remote -v

# Add all files
git add .

# Add specific file
git add backend/.env.production

# Check status
git status

# View recent commits
git log --oneline

# View file history
git log --oneline -- filename.js

# Undo last commit (before push)
git reset --soft HEAD~1

# Switch to different branch
git checkout -b new-branch-name

# Push to specific branch
git push origin branch-name
```

## Useful Links

- **Railway Dashboard:** https://railway.app/dashboard
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub:** https://github.com/login
- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **PostgreSQL Online:** https://www.postgresql.org/docs

## Security Reminders

```bash
# NEVER do these:
# ❌ git add .env               (use .gitignore)
# ❌ commit DATABASE_URL        (never!)
# ❌ push sensitive keys        (use env vars)
# ❌ use default passwords      (generate strong ones)

# ALWAYS:
# ✅ Keep .env files in .gitignore
# ✅ Use environment variables for secrets
# ✅ Generate strong JWT secrets
# ✅ Use HTTPS everywhere
# ✅ Keep dependencies updated
```

---

**Questions?** See the full guides:
- 📚 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed step-by-step
- 📋 [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) - Overview
- ✅ [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) - Checklist
