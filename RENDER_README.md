# Render.com Deployment - Quick Start

Simple overview of deploying to Render.

## What is Render?

Render is a modern cloud platform with:
- Simple GitHub integration (push to deploy)
- Free tier (no credit card needed)
- Built-in PostgreSQL database
- Automatic SSL/HTTPS
- Great for Node.js + React apps

## Quick Deployment Flow

```
Your Portfolio Code (GitHub)
          ↓
    Render.com
          ↓
   ┌──────┴──────┐
   ↓             ↓
Backend       Frontend
(Web Service) (Static Site)
   ↓             ↓
   └──────┬──────┘
          ↓
    PostgreSQL
    (Database)
```

## Pre-Requisites

✅ Code pushed to GitHub
✅ Render account (free)
✅ Your JWT Secret (already generated)
✅ Your Admin Password (already generated)

## Three Simple Deployments

### 1. Deploy Backend (5 min)
```
Render Dashboard → New → Web Service
├─ Select Your Repository
├─ Name: portfolio-backend
├─ Build: npm install
├─ Start: node server.js
├─ Add Env Variables: JWT_SECRET, NODE_ENV, etc.
└─ Create
```

### 2. Create Database (3 min)
```
Render Dashboard → New → PostgreSQL
├─ Name: portfolio-db
├─ Region: Same as backend
├─ Free Plan
└─ Create
```

### 3. Deploy Frontend (5 min)
```
Render Dashboard → New → Static Site
├─ Select Your Repository
├─ Name: portfolio-frontend
├─ Region: Same as backend
├─ Build Command: cd frontend && npm install && npm run build
├─ Publish Directory: frontend/dist
└─ Create
```

## Environment Variables Needed

### Backend (Web Service)
```
NODE_ENV=production
PORT=3000
JWT_SECRET=55accb666655878948729fb0167f34a4133c87890dbcce93b24118e64f05c681
DATABASE_URL=<provided by Render PostgreSQL>
CLIENT_URL=https://your-frontend.onrender.com
```

### Frontend
Update `frontend/.env.production`:
```
VITE_API_URL=https://your-backend.onrender.com
```

## What You Get

✅ Backend: https://your-backend-name.onrender.com
✅ Frontend: https://your-frontend-name.onrender.com
✅ Database: PostgreSQL with 1GB free storage
✅ SSL/HTTPS: Automatic
✅ Domain: Free onrender.com domain
✅ Updates: Automatic on git push

## Continuous Deployment

After first deployment, it's automatic:
1. Make local changes
2. `git commit && git push`
3. Render auto-builds and deploys
4. Done!

## Free Tier Benefits

✅ No Credit Card Required
✅ 750 hours/month for Web Services
✅ 1 GB PostgreSQL storage
✅ Unlimited Static Site deployments
✅ Free SSL certificates
✅ Automatic deployments from GitHub

## Costs

**Free Tier: $0/month** (perfect for getting started)

Paid tiers available if you outgrow free tier.

## Next Steps

1. Go to https://render.com
2. Sign up with GitHub
3. Follow **RENDER_DEPLOYMENT_GUIDE.md** for detailed steps
4. Deploy backend → database → frontend
5. Visit your live site!

## Tips

- Use "Internal Database URL" for backend ↔ database connections
- Use "External Database URL" for local testing
- Render auto-redeploys when you push to GitHub
- Free tier services sleep after 15 minutes (upgradable)
- SSL certificate auto-renews (you don't need to do anything)

---

**For complete step-by-step instructions, see: RENDER_DEPLOYMENT_GUIDE.md**
