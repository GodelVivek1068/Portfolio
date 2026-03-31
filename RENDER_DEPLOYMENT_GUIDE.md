# Render Deployment Guide

Complete step-by-step guide for deploying your portfolio to Render.

## Table of Contents
1. [What is Render?](#what-is-render)
2. [Prerequisites](#prerequisites)
3. [Backend Deployment](#backend-deployment)
4. [Database Setup](#database-setup)
5. [Frontend Deployment](#frontend-deployment)
6. [Environment Variables](#environment-variables)
7. [Testing & Monitoring](#testing--monitoring)
8. [Troubleshooting](#troubleshooting)

---

## What is Render?

Render is a modern cloud platform that makes it easy to deploy:
- **Web Services** (Node.js, Python, etc.)
- **Static Sites** (HTML, React, Vue, etc.)
- **PostgreSQL Databases**
- **Background Workers**
- **Cron Jobs**

### Render Advantages
✅ Simple, intuitive UI
✅ Free tier with automatic deployments
✅ Built-in PostgreSQL
✅ GitHub integration (push to deploy)
✅ SSL/HTTPS by default
✅ Easy environment variables
✅ No credit card required for free tier

---

## Prerequisites

### Required
- Render account (free): https://render.com
- GitHub account with code pushed
- Node.js and npm (for local testing)
- Git

### What You Already Have
✅ Your JWT Secret: `55accb666655878948729fb0167f34a4133c87890dbcce93b24118e64f05c681`
✅ Admin Password: `9557b4e2bb2d94c9288580c97d6f68df`
✅ Code ready for deployment
✅ Environment configuration done

---

## Backend Deployment

### Step 1: Sign Up for Render

1. Go to https://render.com
2. Click "Sign up"
3. Use GitHub account for signup (easiest)
4. Authorize Render to access your repositories

### Step 2: Create Backend Service

1. In Render dashboard, click "New +", select "Web Service"
2. Select "Deploy an existing repository"
3. Search for and select your `portfolio` repository
4. Configure:
   - **Name:** `portfolio-backend`
   - **Region:** `Oregon (US West)` or closest to you
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** `Free` (or paid if you want more resources)

### Step 3: Add Backend Environment Variables

In the Web Service settings, add environment variables:

```env
NODE_ENV=production
PORT=3000
JWT_SECRET=55accb666655878948729fb0167f34a4133c87890dbcce93b24118e64f05c681
CLIENT_URL=https://your-frontend-on-render.onrender.com
```

**Note:** `DATABASE_URL` will be added after database setup.

### Step 4: Deploy Backend

1. Click "Create Web Service"
2. Render starts building automatically
3. Monitor logs in the "Logs" tab
4. Wait for "Deployed successfully" message
5. Your backend URL will be: `https://portfolio-backend-xxxxx.onrender.com`

### Step 5: Note Your Backend URL

After successful deployment:
- Backend URL: `https://portfolio-backend-xxxxx.onrender.com`
- Health check: `curl https://portfolio-backend-xxxxx.onrender.com/api/health`
- Save this for next steps!

---

## Database Setup

### Step 1: Create PostgreSQL Database

1. In Render dashboard, click "New +", select "PostgreSQL"
2. Configure:
   - **Name:** `portfolio-db`
   - **Region:** Same as your backend service
   - **Database:** `portfolio`
   - **User:** `postgres`
   - **Plan:** `Free` (great for testing)

### Step 2: Wait for Database Creation

Database creation takes 2-5 minutes. Watch the logs.

### Step 3: Copy Connection Information

Once created, navigate to the database page and note:
- **Internal Database URL:** (for services on Render)
- **External Database URL:** (for external connections)

Render automatically provides these.

### Step 4: Connect Backend to Database

1. Go back to your backend Web Service
2. Go to "Environment"
3. Add new variable:
   - **Key:** `DATABASE_URL`
   - **Value:** Copy the "Internal Database URL" from your PostgreSQL instance

4. Click "Save Changes"
5. Render automatically redeploys your backend

### Step 5: Initialize Database Schema

After backend redeploys with DATABASE_URL:

**Option A: Using Render Shell (Recommended)**

1. Go to your PostgreSQL instance page
2. Click "Connect"
3. Click "Connect using psql"
4. Copy the command and run in your terminal
5. Once connected to psql, paste contents of `backend/schema.sql`:
   
   ```sql
   \i backend/schema.sql
   ```

**Option B: Using External Connection**

```bash
# From your local machine
psql "YOUR_EXTERNAL_DATABASE_URL" < backend/schema.sql
```

### Step 6: Verify Database

```bash
psql "YOUR_EXTERNAL_DATABASE_URL"

# Inside psql:
\dt          # List tables
\du          # List users
SELECT * FROM admins;  # Check admin table
\q           # Quit
```

---

## Frontend Deployment

### Step 1: Update API URL in Frontend

Create `frontend/.env.production`:

```env
VITE_API_URL=https://portfolio-backend-xxxxx.onrender.com
```

Replace with your actual backend URL from Step 1.5 above.

### Step 2: Commit Changes to GitHub

```bash
git add frontend/.env.production
git commit -m "Add production API URL for Render deployment"
git push origin main
```

### Step 3: Create Static Site on Render

1. In Render dashboard, click "New +", select "Static Site"
2. Select "Deploy an existing repository"
3. Search for and select your `portfolio` repository
4. Configure:
   - **Name:** `portfolio-frontend`
   - **Region:** Same as backend
   - **Branch:** `main`
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist`

### Step 4: Deploy Frontend

1. Click "Create Static Site"
2. Render starts building
3. Monitor build progress in logs
4. Once deployed, your site URL: `https://portfolio-frontend-xxxxx.onrender.com`

### Step 5: Access Your Application

Your deployed portfolio:
- **Frontend:** https://portfolio-frontend-xxxxx.onrender.com
- **Backend API:** https://portfolio-backend-xxxxx.onrender.com
- **Health Check:** https://portfolio-backend-xxxxx.onrender.com/api/health

---

## Environment Variables

### Backend Environment Variables (in Render Web Service)

| Variable | Value | Example |
|----------|-------|---------|
| `NODE_ENV` | production | `production` |
| `PORT` | 3000 | `3000` |
| `JWT_SECRET` | Your JWT secret | `55accb666655878948729fb0167f34a4133c87890dbcce93b24118e64f05c681` |
| `DATABASE_URL` | Render provided | `postgres://user:pass@localhost:5432/portfolio` |
| `CLIENT_URL` | Frontend URL | `https://portfolio-frontend-xxxxx.onrender.com` |
| `GITHUB_TOKEN` | (optional) | GitHub token for API rate limiting |

### Frontend Environment Variables

Frontend is static, so configure build-time:

Create `frontend/.env.production`:
```env
VITE_API_URL=https://portfolio-backend-xxxxx.onrender.com
```

---

## Testing & Monitoring

### Test Backend Endpoints

```bash
# Health check
curl https://portfolio-backend-xxxxx.onrender.com/api/health

# Get projects
curl https://portfolio-backend-xxxxx.onrender.com/api/projects

# Get skills
curl https://portfolio-backend-xxxxx.onrender.com/api/skills

# Login (returns JWT token)
curl -X POST https://portfolio-backend-xxxxx.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"9557b4e2bb2d94c9288580c97d6f68df"}'
```

### Test Frontend

1. Open https://portfolio-frontend-xxxxx.onrender.com
2. Check browser console for errors
3. Try logging in
4. Test API connections

### View Logs

**Backend Logs:**
- Render Dashboard → Web Service → Logs
- Shows all server output and errors

**Database Logs:**
- Render Dashboard → PostgreSQL → Logs (if available)

---

## Continuous Deployment

With Render, deployment is automatic:

1. **Make code changes** on your local machine
2. **Commit to git:** `git add . && git commit -m "message"`
3. **Push to GitHub:** `git push origin main`
4. **Render automatically deploys:**
   - Rebuilds backend service
   - Rebuilds frontend
   - No manual deployment needed

### Disable Auto-Deploy (Optional)

In service settings, you can:
- Enable/disable auto-deploy on push
- Manually trigger deployments
- Run custom build commands

---

## Free Tier Limits

Render's free tier includes:

✅ Web Services: 750 hours/month (enough for always-on)
✅ PostgreSQL: 1 GB storage, 2 concurrent connections
✅ Static Sites: Unlimited
✅ SSL certificates: Free
✅ Auto-scheduled shutdown: Services stop after 15 minutes of inactivity (can be disabled with paid plan)

**For active development:**
- Free tier works great
- No credit card required
- Can upgrade anytime

---

## Custom Domain (Optional)

### Connect Custom Domain

1. Get a domain from GoDaddy, Namecheap, etc.
2. In Render dashboard → Service → Settings → Custom Domain
3. Add your domain
4. Update DNS records at your registrar:
   - Point to Render's nameservers
   - Or add CNAME record

### Automatic SSL

Render automatically provisions SSL certificate for:
- `render.com` subdomain (free)
- Custom domain (free)

---

## Troubleshooting

### Backend Won't Deploy

**Error: "Build failed"**
```bash
# Check error in logs
# Common issues:
# - Missing dependencies in package.json
# - Syntax errors in code
# - Missing build command

# Solution: Check Render logs, fix error, push to GitHub
```

**Error: "Port already in use"**
```bash
# PORT variable must be 3000 in environment variables
# Render assigns a port automatically, configure with PORT env var
```

### Can't Connect to Database

**Error: "Cannot connect to database"**
```bash
# Check if DATABASE_URL is set in Web Service
# Verify PostgreSQL instance is running
# Check URL format: postgres://user:pass@host:5432/database
```

**Error: "Access denied"**
```bash
# Check database user and password are correct
# Verify Internal Database URL is used (not External for internal connections)
```

### Frontend Can't Reach Backend

**Browser console error: "CORS error" or "Cannot reach API"**
```
Solutions:
1. Verify backend is running: curl https://your-backend.onrender.com/api/health
2. Check VITE_API_URL in frontend/.env.production matches backend URL
3. Rebuild frontend after changing VITE_API_URL
4. Check backend CLIENT_URL environment variable matches frontend URL
```

### Functions Not Working

**Error: "API endpoint returning 500"**
```bash
# Check backend logs in Render dashboard
# Look for error messages
# Common issues:
# - DATABASE_URL not set
# - Schema not initialized
# - JWT_SECRET not set
```

### Performance Issues

**Site is slow**
```
Free tier considerations:
- Services spin down after 15 minutes of inactivity
- First request takes 10-30 seconds (cold start)
- Upgrade to paid plan for always-on performance
```

---

## Useful Render CLI Commands

### Install Render CLI (Optional)

```bash
npm install -g render-cli
```

### Deploy from Command Line

```bash
# View services
render services

# View logs
render logs <service-id>

# Trigger deployment
render deploy <service-id>
```

---

## Monitoring & Optimization

### Check Resource Usage

In Render dashboard:
- Monitor CPU, memory, disk usage
- Scale up if needed (paid plans)
- Check database connections

### Set Up Alerts (Paid Plans)

- Monitor uptime
- Get notified of failures
- Track performance metrics

---

## Cost Breakdown

### Free Tier (Perfect for Getting Started)

- Web Service: $0 (750 hours/month)
- PostgreSQL: $0 (1 GB storage)
- Static Site: $0 (unlimited)
- **Total: $0/month**

### Paid Plans (if you need more)

- Web Service: $7+/month (always-on)
- PostgreSQL: $15+/month (more storage, connections)
- Static Site: $20+/month (custom domain, priority)

---

## Next Steps

1. ✅ **Create Render account** at https://render.com
2. ✅ **Deploy backend** (Web Service)
3. ✅ **Create database** (PostgreSQL)
4. ✅ **Connect backend to database**
5. ✅ **Initialize database schema**
6. ✅ **Deploy frontend** (Static Site)
7. ✅ **Update API URL** in frontend
8. ✅ **Test everything**
9. ✅ **Monitor logs and performance**

---

## Success Indicators

✅ Backend service deployed and running
✅ Database created and schema initialized
✅ Frontend deployed successfully
✅ Health check endpoint responding
✅ Frontend loads without errors
✅ Login functionality works
✅ API endpoints return data

---

## Useful Links

- [Render Dashboard](https://dashboard.render.com)
- [Render Documentation](https://render.com/docs)
- [Render Pricing](https://render.com/pricing)
- [Render Status Page](https://status.render.com)

---

## Support

- **Render Docs:** https://render.com/docs
- **Email Support:** support@render.com
- **Discord Community:** https://discord.gg/render

---

**Your portfolio is ready to deploy on Render!**

Follow steps 1-9 above for a smooth deployment. You should be live in 10-15 minutes!
