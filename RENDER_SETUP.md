## Fixing the 401 Admin Login Error

If you see **"Unauthorized"** error (401) when trying to login:

### The Problem
Render doesn't have your environment variables set, so:
1. Admin account is NOT being seeded
2. JWT secret doesn't match
3. Database connection may be missing

### The Solution (Required - DO THIS FIRST)

**CRITICAL: You MUST set these environment variables on Render:**

1. Go to: https://dashboard.render.com/services/covisualise-backend
2. Click the **"Environment"** tab
3. Add each variable below (copy-paste exactly):

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `MONGO_URI` | `mongodb+srv://riteshyvns2005_db_user:uilHgsJiZf7y1JWt@cluster0.pmyo1hw.mongodb.net/visualise_co?retryWrites=true&w=majority&appName=Cluster0` |
| `ADMIN_EMAIL` | `visualiseco@gmail.com` |
| `ADMIN_PASSWORD` | `ankur123456` |
| `ADMIN_JWT_SECRET` | `jvajsdhfofhvnjahdfhsdajksdhfja` |
| `ALLOWED_ORIGINS` | `https://abc-blue-chi.vercel.app,https://visualise.co,https://www.visualise.co,http://localhost:3000` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `hello@visualise.co` |
| `SMTP_PASS` | `kymj wfof oacu gwvx` |
| `NOTIFY_EMAIL` | `admin@visualise.co` |

4. Click **"Save"** button
5. Click **"Manual Deploy"** (or wait for auto-redeployment)
6. Check the **Logs** tab - you should see: `✓ Seeded admin account for visualiseco@gmail.com`

### Test the Login

Once deployment completes:
1. Open: https://abc-blue-chi.vercel.app/admin/login
2. Enter credentials:
   - **Email**: `visualiseco@gmail.com`
   - **Password**: `ankur123456`
3. Click Sign In → Should redirect to `/admin` dashboard

### Still Getting 401?

Check Render logs for these signs of failure:
- `ADMIN_EMAIL/ADMIN_PASSWORD not set` → Variables not saved correctly
- `ADMIN_JWT_SECRET missing` → JWT secret not in environment
- Connection errors → MongoDB URI issue

If you see these, repeat the environment variable setup above.

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
