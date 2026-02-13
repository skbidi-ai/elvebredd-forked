# Elvebredd - GitHub Pages Deployment

This repository has been configured to work with **GitHub Pages** for the frontend and a separate **backend API** for server-side operations.

## Quick Start

### For End Users
1. Visit your GitHub Pages site at: `https://YOUR_USERNAME.github.io/REPO_NAME`
2. Create an account or sign in
3. Start trading!

### For Developers

#### 1. Frontend Setup (GitHub Pages - Automatic)
The frontend files are in the `/docs` folder. When you push to GitHub:
- GitHub automatically deploys the site
- No additional configuration needed
- Available at `https://YOUR_USERNAME.github.io/REPO_NAME`

#### 2. Backend Setup (Required)
You must deploy the Flask backend separately. See [**BACKEND_DEPLOYMENT.md**](BACKEND_DEPLOYMENT.md) for detailed instructions.

Recommended platforms:
- **Render** (Free tier available) - [Most recommended]
- **Railway** (Pay-as-you-go)
- **PythonAnywhere** (Python-specific)
- **Heroku** (Free dynos discontinued)

#### 3. Configure API URL
After deploying your backend, update the frontend API configuration:

Edit `/docs/config.js`:
```javascript
const API_BASE_URL = 'https://your-deployed-backend.com';
```

## Project Structure

```
elvebredd-forked/
├── docs/                          # Frontend (GitHub Pages)
│   ├── index.html                # Home page
│   ├── signin.html               # Sign in page
│   ├── signup.html               # Sign up page
│   ├── search.html               # Search/browse page
│   ├── notifications.html        # Notifications page
│   ├── resetPassword.html        # Password reset
│   ├── tos.html                  # Terms of service
│   ├── support.html              # Support/help
│   ├── config.js                 # API configuration (EDIT THIS)
│   ├── css/                      # Stylesheets
│   ├── js/                       # Client-side JavaScript
│   ├── images/                   # Images and assets
│   ├── .nojekyll                 # GitHub Pages config
│   └── 404.html                  # 404 error page
│
├── app.py                        # Flask backend (deploy separately)
├── functions.py                  # Backend functions
├── install_dependencies.txt      # Python dependencies
├── GITHUB_PAGES_SETUP.md        # GitHub Pages documentation
├── BACKEND_DEPLOYMENT.md        # Backend deployment guide
└── README.md                     # This file
```

## API Integration

The frontend communicates with your backend via REST API calls. Required endpoints:

### Authentication
- `POST /api/login` - User login
- `POST /api/signup` - Account creation
- `POST /api/logout` - Logout
- `POST /api/reset-password` - Password reset

### Data
- `GET /api/trades` - Get trade listings
- `POST /api/trades` - Create new trade
- `GET /api/search?q=query` - Search
- `GET /api/notifications` - Get notifications

See [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) for full API documentation.

## Deployment Checklist

- [ ] Backend deployed to hosting platform
- [ ] Backend API endpoints working
- [ ] CORS configured on backend
- [ ] Environment variables set on backend
- [ ] Database set up and connected
- [ ] `API_BASE_URL` updated in `/docs/config.js`
- [ ] Frontend pushed to GitHub
- [ ] GitHub Pages enabled in repository settings
- [ ] Test login/signup flows
- [ ] Test API communication

## Development

### Local Backend Testing
```bash
pip install -r install_dependencies.txt
python app.py
```

Backend runs at: `http://localhost:5000`

### Local Frontend Testing
```bash
cd docs
python -m http.server 3000
```

Frontend runs at: `http://localhost:3000`

### Update API URL for Local Testing
Edit `/docs/config.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000';
```

## Troubleshooting

### Site not showing up
- Check GitHub Pages is enabled in Settings → Pages
- Verify branch is set to `main` or `develop`
- Wait 1-2 minutes for deployment

### Login fails
- Check backend is running
- Verify API URL in `/docs/config.js`
- Check CORS configuration on backend
- Look at browser console for error messages

### Changes not showing
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
- GitHub Pages may take 1-2 minutes to update
- Verify files were committed: `git log --oneline docs/`

### CORS errors
- Backend must have CORS enabled
- Check browser console for error details
- Verify correct API URL

## Security

⚠️ **IMPORTANT:**

1. **Never commit secrets or API keys** to the repository
2. Use **environment variables** for sensitive data
3. **Always use HTTPS** (GitHub Pages automatic, configure on backend)
4. **Validate all input** on the backend
5. **Enable CORS only for trusted origins**
6. **Use strong passwords** for database and admin accounts

## Adding New Pages

To add a new page:

1. Create `docs/newpage.html`
2. Include the header and footer sections
3. Link to CSS files in `/css`
4. Link to JavaScript in `/js`
5. Use the `config.js` helper functions for API calls
6. Test locally before pushing

Example:
```html
<!DOCTYPE html>
<html>
<head>
    <script src="/config.js"></script>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <script>
        // Check if logged in
        if (!isLoggedIn()) {
            window.location.href = '/signin.html';
        }
    </script>
</body>
</html>
```

## Updating the Backend

After making changes to the backend:

1. Test locally: `python app.py`
2. Push to GitHub (if using automatic deployments)
3. Backend platform should auto-deploy
4. Verify endpoints work with updated frontend

## Support

For issues or questions:
- 📖 Read [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)
- 🚀 Read [BACKEND_DEPLOYMENT.md](BACKEND_DEPLOYMENT.md)
- 💬 Join our [Discord community](https://discord.gg/Byny894ZQP)
- 🎥 Check [YouTube tutorials](https://www.youtube.com/@Elvebredd)

## Common Commands

```bash
# Push frontend changes
git add docs/
git commit -m "Update frontend"
git push origin main

# Test backend locally
python app.py

# View backend logs (depends on platform)
# Render: Dashboard → Service → Logs
# Railway: Dashboard → Deployments → Logs
# etc.

# Update backend variables
# Set in your hosting platform's environment settings
```

## Next Steps

1. ✅ Read [BACKEND_DEPLOYMENT.md](BACKEND_DEPLOYMENT.md)
2. ✅ Deploy your backend
3. ✅ Update API URL in `/docs/config.js`
4. ✅ Test the full application
5. ✅ Customize pages as needed
6. ✅ Monitor logs and fix any issues

---

**Last Updated:** February 2026  
**GitHub Pages Version:** 1.0  
**Frontend Location:** `/docs` folder  
**Backend Location:** Separate deployment required
