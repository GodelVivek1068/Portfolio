# Google Cloud Platform - Deployment Guide

Complete step-by-step guide for deploying your portfolio to Google Cloud Platform.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [GCP Setup](#gcp-setup)
3. [Backend Deployment (Cloud Run)](#backend-deployment-cloud-run)
4. [Database Setup (Cloud SQL)](#database-setup-cloud-sql)
5. [Frontend Deployment (Firebase Hosting)](#frontend-deployment-firebase-hosting)
6. [Environment Variables Configuration](#environment-variables-configuration)
7. [Testing & Monitoring](#testing--monitoring)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts & Tools
- ✅ Google Cloud Platform account (https://console.cloud.google.com)
- ✅ gcloud CLI installed (https://cloud.google.com/sdk/docs/install)
- ✅ Docker installed (https://www.docker.com/products/docker-desktop)
- ✅ Firebase CLI installed (npm install -g firebase-tools)
- ✅ Node.js and npm
- ✅ Git with project pushed to GitHub

### GCP Free Tier Includes
- Cloud Run: 2M requests/month free
- Cloud SQL: 1 instance (db-f1-micro) free
- Cloud Storage: 5GB free
- Firebase Hosting: 10GB storage, 360MB/day bandwidth

---

## GCP Setup

### Step 1: Create a Google Cloud Project

```bash
# 1. Go to https://console.cloud.google.com
# 2. Click "Select a Project" → "New Project"
# 3. Enter project name: "portfolio" (or your preferred name)
# 4. Click "Create"
# 5. Wait for project creation (1-2 minutes)
# 6. Click the project to open it
```

### Step 2: Enable Required APIs

In GCP Console:

```bash
# Enable these APIs (Google Cloud Console → APIs & Services → Enable APIs)
1. Cloud Run API
2. Cloud Build API
3. Cloud SQL Admin API
4. Compute Engine API
5. Firebase Management API
```

Or via gcloud CLI:

```bash
# Set your project ID
export PROJECT_ID="your-project-id"

# Enable APIs
gcloud services enable run.googleapis.com \
  cloudbuild.googleapis.com \
  sqladmin.googleapis.com \
  compute.googleapis.com \
  firebase.googleapis.com \
  --project=$PROJECT_ID
```

### Step 3: Create Service Account

```bash
# Create service account
gcloud iam service-accounts create portfolio-deployer \
  --display-name="Portfolio Deployment Account" \
  --project=$PROJECT_ID

# Grant necessary permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:portfolio-deployer@$PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/run.admin

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:portfolio-deployer@$PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/cloudbuild.builds.editor

# Create and download key
gcloud iam service-accounts keys create ~/gcp-key.json \
  --iam-account=portfolio-deployer@$PROJECT_ID.iam.gserviceaccount.com

# Set environment variable
export GOOGLE_APPLICATION_CREDENTIALS=~/gcp-key.json
```

---

## Backend Deployment (Cloud Run)

### Step 1: Create Dockerfile

If not already created, create `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY server.js .
COPY config/ ./config/

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
```

### Step 2: Create .dockerignore

Create `backend/.dockerignore`:

```
node_modules
npm-debug.log
.env
.env.local
.git
.gitignore
README.md
.DS_Store
```

### Step 3: Build and Push to Container Registry

```bash
# Set project ID
export PROJECT_ID="your-project-id"
export REGION="us-central1"

# Configure Docker authentication
gcloud auth configure-docker gcr.io

# Build Docker image
docker build -t gcr.io/$PROJECT_ID/portfolio-backend:latest ./backend

# Push to Container Registry
docker push gcr.io/$PROJECT_ID/portfolio-backend:latest

# Or use Cloud Build (recommended)
gcloud builds submit ./backend \
  --tag gcr.io/$PROJECT_ID/portfolio-backend:latest \
  --project=$PROJECT_ID
```

### Step 4: Deploy to Cloud Run

```bash
# Deploy backend
gcloud run deploy portfolio-backend \
  --image gcr.io/$PROJECT_ID/portfolio-backend:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --timeout 3600 \
  --set-env-vars=\
"NODE_ENV=production,\
PORT=3000,\
JWT_SECRET=YOUR_GENERATED_JWT_SECRET,\
DATABASE_URL=YOUR_CLOUD_SQL_URL,\
CLIENT_URL=YOUR_FRONTEND_URL,\
GITHUB_TOKEN=OPTIONAL" \
  --project=$PROJECT_ID

# Note your Cloud Run URL (e.g., https://portfolio-backend-abc123.run.app)
```

### Step 5: Configure Cloud Run

After deployment, configure in Cloud Run settings:
- Min instances: 1
- Max instances: 100
- Concurrency: 80
- Timeout: 3600 seconds
- Memory: 512 MB
- CPU: 1

---

## Database Setup (Cloud SQL)

### Step 1: Create Cloud SQL PostgreSQL Instance

```bash
# Create PostgreSQL instance
gcloud sql instances create portfolio-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=$REGION \
  --project=$PROJECT_ID

# Set root password
gcloud sql users set-password postgres \
  --instance=portfolio-db \
  --password=YOUR_STRONG_PASSWORD \
  --project=$PROJECT_ID
```

### Step 2: Create Database

```bash
# Create database
gcloud sql databases create portfolio \
  --instance=portfolio-db \
  --project=$PROJECT_ID

# Create app user
gcloud sql users create appuser \
  --instance=portfolio-db \
  --password=YOUR_APP_PASSWORD \
  --project=$PROJECT_ID
```

### Step 3: Get Connection Details

```bash
# Get public IP
gcloud sql instances describe portfolio-db \
  --project=$PROJECT_ID | grep ipAddresses -A 5

# Build connection string
DATABASE_URL="postgresql://appuser:YOUR_APP_PASSWORD@PUBLIC_IP:5432/portfolio"
```

### Step 4: Initialize Database Schema

```bash
# Option 1: Using Cloud Shell SQL client
gcloud sql connect portfolio-db \
  --project=$PROJECT_ID \
  -u postgres

# Then paste contents of schema.sql

# Option 2: From your machine (if IP whitelisted)
psql "postgresql://postgres:YOUR_PASSWORD@PUBLIC_IP:5432/portfolio" < backend/schema.sql
```

### Step 5: Configure Cloud SQL Proxy (for Cloud Run)

Cloud Run uses Cloud SQL proxy automatically. Just ensure:
1. Cloud SQL API is enabled
2. Service account has Cloud SQL Client role

---

## Frontend Deployment (Firebase Hosting)

### Step 1: Initialize Firebase

```bash
# Login to Firebase
firebase login

# Initialize Firebase in frontend directory
cd frontend
firebase init hosting

# When prompted:
# - Project: Select your GCP project
# - Public directory: dist
# - Configure as SPA: Yes
# - GitHub deploys: Yes (optional)
```

### Step 2: Set Environment Variables

Create `frontend/.env.production`:

```env
VITE_API_URL=https://portfolio-backend-abc123.run.app
```

### Step 3: Build Frontend

```bash
cd frontend
npm run build
```

### Step 4: Deploy to Firebase Hosting

```bash
firebase deploy --only hosting

# Get your hosting URL from Firebase Console
# Usually: https://your-project-id.web.app
```

### Step 5: Configure Domain (Optional)

```bash
# Connect custom domain in Firebase Console
# Settings → Hosting → Connect Domain
```

---

## Environment Variables Configuration

### Backend Environment Variables (Set in Cloud Run)

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `NODE_ENV` | production | Static |
| `PORT` | 3000 | Static |
| `JWT_SECRET` | Your generated secret | Generated: 55accb666655878948729fb0167f34a4133c87890dbcce93b24118e64f05c681 |
| `DATABASE_URL` | postgresql://appuser:pass@ip:5432/portfolio | Cloud SQL |
| `CLIENT_URL` | https://your-project.web.app | Firebase Hosting URL |
| `GITHUB_TOKEN` | (optional) | GitHub Settings |

### Frontend Environment Variables (Set in Firebase)

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | https://portfolio-backend-xyz.run.app |

---

## Testing & Monitoring

### Test Backend

```bash
# Health check
curl https://portfolio-backend-abc123.run.app/api/health

# Get projects
curl https://portfolio-backend-abc123.run.app/api/projects

# Login endpoint
curl -X POST https://portfolio-backend-abc123.run.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"9557b4e2bb2d94c9288580c97d6f68df"}'
```

### Test Frontend

```bash
# Visit your Firebase hosting URL
# https://your-project-id.web.app

# Check browser console for errors
# Verify API connections work
```

### View Logs

**Cloud Run Logs:**
```bash
gcloud run logs read portfolio-backend --limit 50 --region $REGION --project $PROJECT_ID
```

**Cloud SQL Logs:**
GCP Console → Cloud SQL → portfolio-db → Logs

**Firebase Hosting Logs:**
Firebase Console → Hosting → Logs

### Monitor Performance

- **Cloud Run**: GCP Console → Cloud Run → Metrics
- **Cloud SQL**: GCP Console → Cloud SQL → Metrics
- **Firebase**: Firebase Console → Performance

---

## Continuous Deployment

### From GitHub Actions

Create `.github/workflows/deploy-gcp.yml`:

```yaml
name: Deploy to GCP

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy Backend
      run: |
        gcloud auth activate-service-account --key-file=${{ secrets.GCP_KEY }}
        gcloud config set project ${{ secrets.GCP_PROJECT_ID }}
        gcloud builds submit ./backend --tag gcr.io/${{ secrets.GCP_PROJECT_ID }}/portfolio-backend
        gcloud run deploy portfolio-backend \
          --image gcr.io/${{ secrets.GCP_PROJECT_ID }}/portfolio-backend \
          --platform managed --region us-central1 --allow-unauthenticated
    
    - name: Deploy Frontend
      run: |
        cd frontend
        npm install
        npm run build
        firebase deploy --only hosting --token ${{ secrets.FIREBASE_TOKEN }}
```

---

## Cost Estimation

**Monthly Estimate (Free Tier Included):**

- Cloud Run: $0 (2M requests free)
- Cloud SQL: $0 (if using db-f1-micro)
- Cloud Storage: $0 (5GB free)
- Firebase Hosting: $0 (within free bandwidth)

**Total: $0/month** (if within free tier)

---

## Troubleshooting

### Cloud Run Deployment Issues

**"Permission denied" error**
```bash
# Add necessary IAM roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:portfolio-deployer@$PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/run.admin
```

**"Container image not found"**
```bash
# Ensure image was pushed successfully
gcloud container images list --project=$PROJECT_ID
```

**"Internal server error" on requests**
```bash
# Check logs
gcloud run logs read portfolio-backend --limit 100
```

### Cloud SQL Connection Issues

**"Cannot connect to database"**
```bash
# Check if Cloud SQL proxy is enabled (automatic for Cloud Run)
# Verify DATABASE_URL format is correct
# Check Cloud SQL instance is running
```

**"Access denied" error**
```bash
# Verify appuser has correct permissions
gcloud sql users set-password appuser \
  --instance=portfolio-db \
  --password=NEW_PASSWORD
```

### Firebase Hosting Issues

**"Build failed" error**
```bash
# Check build output
firebase deploy --debug

# Ensure dist folder exists
npm run build

# Check firebase.json configuration
```

---

## Useful Commands

```bash
# List deployments
gcloud run services list --region=$REGION

# Delete Cloud Run service
gcloud run services delete portfolio-backend --region=$REGION

# Delete Cloud SQL instance
gcloud sql instances delete portfolio-db

# View costs
# GCP Console → Billing → Reports

# Scale Cloud Run
gcloud run services update portfolio-backend \
  --min-instances=1 \
  --max-instances=100 \
  --region=$REGION
```

---

## Security Best Practices

✅ Use Cloud IAM for access control
✅ Enable VPC Service Controls
✅ Use Private IP for Cloud SQL (if possible)
✅ Enable Cloud Armor for DDoS protection
✅ Rotate secrets regularly
✅ Use Secret Manager for sensitive data
✅ Enable audit logging
✅ Use HTTPS everywhere (automatic)

---

## Support & Resources

- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud SQL Documentation](https://cloud.google.com/sql/docs)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator)

---

## Next Steps

1. ✅ Create GCP account and project
2. ✅ Enable APIs
3. ✅ Deploy backend to Cloud Run
4. ✅ Set up Cloud SQL database
5. ✅ Deploy frontend to Firebase Hosting
6. ✅ Test all endpoints
7. ✅ Monitor and optimize

**Your portfolio is now ready for Google Cloud deployment!**
