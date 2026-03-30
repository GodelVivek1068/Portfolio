# Google Cloud Platform Deployment Configuration

This project is configured for deployment on Google Cloud Platform:
- **Backend**: Cloud Run (serverless containers)
- **Database**: Cloud SQL (PostgreSQL)
- **Frontend**: Firebase Hosting or Cloud Storage + CDN

## Key Files

- `app.yaml` - App Engine configuration (if using App Engine instead)
- `.gcloudignore` - Files to exclude from deployment
- `cloudbuild.yaml` - Cloud Build configuration

## Prerequisites

1. Google Cloud Platform account
2. gcloud CLI installed
3. Docker (for Cloud Run)
4. Firebase CLI (for frontend)

## Quick Deployment

### Backend Deployment to Cloud Run

```bash
# 1. Set your project ID
export PROJECT_ID="your-project-id"

# 2. Build and push to Container Registry
gcloud builds submit --tag gcr.io/$PROJECT_ID/portfolio-backend --project=$PROJECT_ID

# 3. Deploy to Cloud Run
gcloud run deploy portfolio-backend \
  --image gcr.io/$PROJECT_ID/portfolio-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production,JWT_SECRET=YOUR_SECRET,DATABASE_URL=YOUR_DATABASE_URL,CLIENT_URL=YOUR_FRONTEND_URL" \
  --project=$PROJECT_ID
```

### Frontend Deployment to Firebase Hosting

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Initialize Firebase in your frontend directory
cd frontend
firebase init hosting

# 4. Build and deploy
npm run build
firebase deploy
```

## Documentation

See `GCP_DEPLOYMENT_GUIDE.md` for detailed step-by-step instructions.
