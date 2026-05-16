# Render Deployment Guide

## 🚀 Quick Deploy Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Setup for Render deployment"
git push origin main
```

### 2. Deploy on Render

**Option A: Using render.yaml (Recommended)**
1. Go to https://render.com
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository: `bajaranglalkumawat/developer-tech`
4. Render will automatically read `render.yaml`
5. Fill in the required environment variables
6. Click "Apply"

**Option B: Manual Setup**
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your repository
4. Configure:
   - **Build Command**: `pnpm install && pnpm run build`
   - **Start Command**: `node dist/server/node-build.mjs`
   - **Health Check Path**: `/health`
   - **Node Version**: 22
5. Add environment variables (see below)

### 3. Required Environment Variables

Go to Render Dashboard → Your Service → Environment tab and add:

```
NODE_ENV=production
PORT=8080
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-admin-password>
SITE_URL=https://developertech.in
PING_MESSAGE=pong
BREVO_API_KEY=<your-brevo-api-key>
BREVO_SENDER_EMAIL=<your-sender-email>
BREVO_SENDER_NAME=Developer Tech Support
GOOGLE_SHEETS_WEBHOOK_URL=<your-google-sheets-webhook-url>
```

### 4. Verify Deployment

After deployment completes:
1. Check logs in Render dashboard
2. Visit your app URL
3. Test health check: `https://your-app.onrender.com/health`
4. Test API: `https://your-app.onrender.com/api/ping`

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version is 22+

### App Crashes on Start
- Verify all environment variables are set
- Check MongoDB connection string
- Review application logs

### Health Check Fails
- Ensure `/health` endpoint is accessible
- Check if server is listening on correct PORT

## 📝 Notes
- Never commit `.env` file (it's in `.gitignore`)
- Use Render's environment variable UI for secrets
- The `render.yaml` file auto-configures deployment
- Free tier instances spin down after 15 minutes of inactivity
