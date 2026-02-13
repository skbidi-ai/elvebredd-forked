# Elvebredd - GitHub Pages Setup Guide

## Architecture Overview

This project uses a **Frontend-Backend separation** architecture:

- **Frontend**: Static website hosted on GitHub Pages (this `docs` folder)
- **Backend**: Flask API server (elsewhere - Render, Railway, Heroku, etc.)

## Frontend (GitHub Pages)

The frontend is located in the `/docs` folder and contains:
- Static HTML pages
- CSS stylesheets
- Client-side JavaScript
- Configuration for API endpoints

### GitHub Pages Configuration

To enable GitHub Pages:

1. Go to your GitHub repository Settings → Pages
2. Under "Source", select:
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/ (root)` or `/docs`
3. Save

Your site will be published at: `https://YOUR_USERNAME.github.io/REPO_NAME`

### Environment Variables

Create a `.env` file in the `docs` folder or set the `API_URL` environment variable:

```bash
API_URL=https://your-backend-api.com
```

Or modify the `config.js` file:

```javascript
const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';
```

## Backend API

The backend Flask application needs to be deployed separately. Here are recommended platforms:

### Option 1: Render (Recommended)
- Free tier available
- Automatic deployments from GitHub
- Built-in PostgreSQL
- [Render.com](https://render.com)

### Option 2: Railway
- Pay-as-you-go model
- Easy GitHub integration
- [Railway.app](https://railway.app)

### Option 3: Heroku
- Free dynos are being phased out
- Alternative: use [Heroku deployment guide](https://devcenter.heroku.com/articles/getting-started-with-python)

### Option 4: PythonAnywhere
- Python-specific hosting
- [PythonAnywhere.com](https://www.pythonanywhere.com)

## Required API Endpoints

Your Flask backend needs to implement the following endpoints:

### Authentication

**POST /api/login**
- Request: `{ email, password }`
- Response: `{ success: boolean, userID: string, userData: object, message: string }`

**POST /api/signup**
- Request: `{ username, email, password, robloxUsername }`
- Response: `{ success: boolean, userID: string, userData: object, message: string }`

**POST /api/logout**
- Request: (empty)
- Response: `{ success: boolean }`

**POST /api/reset-password**
- Request: `{ email }`
- Response: `{ success: boolean, message: string }`

### Trades

**GET /api/trades**
- Query params: `?userID=xxx&page=1&limit=10`
- Response: `{ trades: array, total: number, success: boolean }`

**POST /api/trades**
- Request: `{ title, description, items }`
- Response: `{ success: boolean, tradeID: string, message: string }`

### Notifications

**GET /api/notifications**
- Query params: `?userID=xxx&unread=true`
- Response: `{ notifications: array, unreadCount: number, success: boolean }`

**POST /api/notifications/read**
- Request: `{ notificationID }`
- Response: `{ success: boolean }`

### Search

**GET /api/search**
- Query params: `?q=xxx&type=pet`
- Response: `{ results: array, success: boolean }`

## CORS Configuration

Your backend needs to enable CORS for the GitHub Pages domain:

```python
from flask_cors import CORS

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://YOUR_USERNAME.github.io"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type"]
    }
})
```

## Development Setup

### Local Development

1. Install dependencies:
```bash
pip install -r install_dependencies.txt
```

2. Start the Flask backend:
```bash
python app.py
```

3. Configure frontend API URL in `config.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000';
```

4. Serve the frontend (optional):
```bash
cd docs
python -m http.server 3000
```

Visit `http://localhost:3000` to test

### Deployment to GitHub Pages

1. Push changes to your GitHub repository:
```bash
git add .
git commit -m "Update frontend"
git push origin main
```

2. GitHub will automatically build and deploy the `/docs` folder

3. Your site will be available at the GitHub Pages URL

## File Structure

```
docs/
├── index.html              # Home page
├── signin.html            # Sign in page
├── signup.html            # Sign up page
├── search.html            # Search/explore page
├── 404.html               # 404 error page
├── .nojekyll              # Disable Jekyll processing
├── config.js              # API configuration
├── css/                   # Stylesheets
│   ├── header.css
│   ├── footer.css
│   └── ...
├── js/                    # JavaScript files
│   ├── header.js
│   ├── index.js
│   └── ...
└── images/                # Images and assets
    ├── misc/
    ├── pets/
    ├── profile/
    └── ...
```

## Troubleshooting

### CORS Errors
- Ensure backend has CORS enabled
- Check that API_BASE_URL is correct in `config.js`
- Verify backend is running and accessible

### Assets not loading
- Check that asset paths start with `/` (e.g., `/css/style.css`)
- Ensure all assets are in the `docs` folder

### Page not found on direct link
- GitHub Pages uses client-side routing
- Direct links to non-index pages will show 404
- Use hash-based routing (#/page) or single-page app approach

## Security Notes

1. **Never commit secrets**: Store API keys in environment variables
2. **HTTPS only**: GitHub Pages uses HTTPS by default
3. **CORS sensitivity**: Only allow trusted origins
4. **Input validation**: Always validate user input on the backend
5. **Authentication**: Implement proper session/token-based authentication

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Render Deployment Guide](https://docs.render.com/)

