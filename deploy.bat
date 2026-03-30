@echo off
REM Railway Deployment Quick Start Script (Windows)

echo 🚀 Portfolio Deployment Setup
echo ================================
echo.

REM Check dependencies
echo ✓ Checking Node.js...
node --version

echo ✓ Checking npm...
npm --version

echo.
echo 📦 Installing dependencies...
call npm install
cd backend
call npm install
cd ..
cd frontend
call npm install
cd ..

echo.
echo 🔐 Security Setup
echo ================================
echo.
echo ⚠️  IMPORTANT - Before deploying:
echo.
echo 1. Generate a strong JWT secret:
echo    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
echo.
echo 2. Update in backend/.env.production:
echo    JWT_SECRET=^<paste-generated-secret^>
echo.
echo 3. Change default admin password in server.js
echo.
echo 4. Update production URLs in both .env.production files
echo.

echo ✓ Setup complete!
echo.
echo 📚 Next steps:
echo 1. Push code to GitHub: git push -u origin main
echo 2. Visit https://railway.app
echo 3. Connect your GitHub repository
echo 4. Configure environment variables per DEPLOYMENT_GUIDE.md
echo.
echo For detailed instructions, see DEPLOYMENT_GUIDE.md
pause
