# Backend Deployment Guide

This guide explains how to deploy the Flask backend API to different platforms while keeping the frontend on GitHub Pages.

## Backend Requirements

Your Flask backend must:

1. **Implement the required API endpoints** (see GITHUB_PAGES_SETUP.md)
2. **Enable CORS** for GitHub Pages domain
3. **Use HTTPS** (required by GitHub Pages)
4. **Handle authentication** using tokens or sessions
5. **Implement proper error handling**

## Deployment Options

### 1. Render (Recommended - Free Tier Available)

**Advantages:**
- Free tier available
- Automatic deployments from GitHub
- Built-in PostgreSQL database
- Zero-config deploys

**Steps:**

1. Go to [render.com](https://render.com)
2. Connect your GitHub account
3. New → Web Service
4. Select your repository
5. Configure:
   - **Name**: `elvebredd-api`
   - **Environment**: `Python 3`
   - **Build command**: `pip install -r install_dependencies.txt`
   - **Start command**: `gunicorn app:app`
6. Add environment variables:
   ```
   PYTHON_VERSION=3.9
   ```
7. Deploy

**Update frontend:** Add your Render URL to `docs/config.js`:
```javascript
const API_BASE_URL = 'https://elvebredd-api.onrender.com';
```

### 2. Railway

**Advantages:**
- Easy GitHub integration
- Pay-as-you-go (free tier has monthly credits)
- Nice dashboard

**Steps:**

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Select repository
4. Configure:
   - Add Python plugin
   - Set start command: `gunicorn app:app`
5. Add environment variables as needed
6. Deploy

### 3. PythonAnywhere

**Advantages:**
- Python-specific hosting
- Simple setup
- Good for small projects

**Steps:**

1. Go to [pythonanywhere.com](https://www.pythonanywhere.com)
2. Sign up (free tier available)
3. Upload your code or connect GitHub
4. Create a web app
5. Configure:
   - Python version: 3.9+
   - WSGI file
6. Reload

### 4. Heroku (Legacy)

**Note:** Free dynos are being phased out. Check current Heroku pricing.

**Steps:**

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login: `heroku login`
3. Create app: `heroku create elvebredd-api`
4. Add buildpack: `heroku buildpacks:add heroku/python`
5. Add Procfile in root:
```
web: gunicorn app:app
```
6. Deploy:
```
git push heroku main
```

## Database Setup

### Option 1: Built-in Solutions
- Render: Offers free PostgreSQL
- Railway: Offers PostgreSQL plugin
- Heroku: Offers add-ons

### Option 2: External Database
- [ElephantSQL](https://www.elephantsql.com/) - PostgreSQL
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - MongoDB
- [Firebase](https://firebase.google.com/) - NoSQL

### Example: Using PostgreSQL with Flask

```python
import os
from flask_sqlalchemy import SQLAlchemy

# Get database URL from environment
DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///local.db')

# For PostgreSQL, replace "postgres://" with "postgresql://"
if DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
db = SQLAlchemy(app)
```

## Environment Variables

Set these on your hosting platform:

```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
SECRET_KEY=your-secret-key-here
GMAIL_API_KEY=your-gmail-api-key
FLASK_ENV=production
```

## CORS Configuration

```python
from flask_cors import CORS

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://YOUR_USERNAME.github.io",
            "http://localhost:3000"  # For local testing
        ],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})
```

## SSL/HTTPS

Most platforms automatically provide SSL certificates:
- Render: Automatic
- Railway: Automatic
- PythonAnywhere: Automatic
- Heroku: Free SSL via Let's Encrypt

You **must** use HTTPS because GitHub Pages uses HTTPS.

## Testing Your API

After deployment:

```bash
# Test a simple endpoint
curl -X GET https://your-api.com/api/health

# Test login
curl -X POST https://your-api.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## Troubleshooting

### CORS Errors
- Verify your GitHub Pages URL in CORS origins
- Check backend is running (curl the API URL)
- Ensure CORS headers are being returned

### Slow Startup
- Render/Railway free tiers may have slow cold starts
- Consider upgrading to paid tier or using different service

### Database Connection Issues
- Verify DATABASE_URL environment variable
- Check database credentials
- Test connection locally first

### 500 Errors
- Check backend logs (each platform has logs section)
- Verify all required dependencies in `install_dependencies.txt`
- Test locally with `python app.py`

## Monitoring & Logging

### Render
- Logs available in dashboard
- Live logs streaming

### Railway
- Logs in deployments section
- Monitoring graphs

### PythonAnywhere
- Web app logs available
- Error log and access logs kept

## Domain Setup (Optional)

To use a custom domain instead of the default platform URL:

1. In your DNS provider (GoDaddy, Namecheap, etc.):
   - Create CNAME record pointing to your backend URL
   - Or set up root domain records per platform instructions

2. In platform settings:
   - Add custom domain
   - Verify DNS
   - Update CORS origins

## Next Steps

1. Deploy backend to chosen platform
2. Update `API_BASE_URL` in `docs/config.js`
3. Test frontend-backend communication
4. Monitor logs for any issues

## Security Checklist

- [ ] HTTPS enabled on all endpoints
- [ ] CORS properly configured
- [ ] No secrets in code (use environment variables)
- [ ] Input validation on backend
- [ ] Rate limiting implemented
- [ ] Database backups configured
- [ ] Error messages don't expose system info
- [ ] Update secret key for production

## Support

- Framework: [Flask Documentation](https://flask.palletsprojects.com/)
- CORS: [Flask-CORS](https://flask-cors.readthedocs.io/)
- Database: [SQLAlchemy](https://www.sqlalchemy.org/)

