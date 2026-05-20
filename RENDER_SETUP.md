# Render Deployment Guide

## Environment Variables Setup

Your backend is deployed on Render at: `https://covisualise-backend.onrender.com`

To fix the 401 admin authentication error, you must set these environment variables in your Render service dashboard:

### 1. Go to Render Dashboard
- Visit: https://dashboard.render.com
- Find your `covisualise-backend` service
- Click on "Environment" tab

### 2. Add These Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `PORT` | `5000` | Keep default |
| `NODE_ENV` | `production` | Required for production |
| `MONGO_URI` | Your MongoDB connection string | From `.env` file |
| `ALLOWED_ORIGINS` | `https://abc-blue-chi.vercel.app,https://visualise.co,https://www.visualise.co,http://localhost:3000` | Comma-separated, no spaces |
| `ADMIN_EMAIL` | `visualiseco@gmail.com` | Default admin account |
| `ADMIN_PASSWORD` | `ankur123456` | Default admin password |
| `ADMIN_JWT_SECRET` | `jvajsdhfofhvnjahdfhsdajksdhfja` | Must match frontend expectations |
| `SMTP_HOST` | `smtp.gmail.com` | Email notifications |
| `SMTP_PORT` | `587` | Gmail SMTP port |
| `SMTP_USER` | `hello@visualise.co` | Your sender email |
| `SMTP_PASS` | Your Gmail app password | From `.env` file |
| `NOTIFY_EMAIL` | `admin@visualise.co` | Where to send notifications |

### 3. Save and Redeploy
- Click "Save" after adding variables
- Click "Manual Deploy" to redeploy with new variables
- Wait for deployment to complete (check logs)

## Testing Admin Login

After deployment completes:

1. Navigate to: `https://abc-blue-chi.vercel.app/admin/login`
2. Login with:
   - **Email**: `visualiseco@gmail.com`
   - **Password**: `ankur123456`
3. You should be redirected to the admin dashboard

## Troubleshooting

If you still get 401 errors:

1. **Check Render logs**: Dashboard → Logs tab
   - Look for "Seeded admin account" or "Updated admin password"
   - If you see "ADMIN_EMAIL/ADMIN_PASSWORD not set", variables weren't properly saved

2. **Verify ADMIN_JWT_SECRET matches**: 
   - Frontend expects: `jvajsdhfofhvnjahdfhsdajksdhfja`
   - Render must have the same value

3. **Restart service**: 
   - Click "Manual Deploy" again if logs show issues

4. **Check MongoDB**: 
   - Ensure `MONGO_URI` is correct and database is accessible
