# Elvebredd - Adopt Me Traders Hub

A full-stack web application for trading Adopt Me pets and items.

## 🌐 Architecture

- **Frontend:** GitHub Pages (static site) - `/docs` folder
- **Backend:** Flask API (deploy separately)
- **Database:** PostgreSQL/SQLite (your choice)

## 🚀 Quick Links

- 📖 [**GitHub Pages Setup Guide**](GITHUB_PAGES_SETUP.md) - How to configure the frontend
- 🔧 [**Backend Deployment Guide**](BACKEND_DEPLOYMENT.md) - How to deploy the API
- 🌍 [**Frontend README**](docs/README.md) - Frontend documentation

## 📋 Setup Instructions

### 1. Frontend (Automatic with GitHub Pages)
The frontend is ready in the `/docs` folder. Just:
- Push to GitHub
- Enable GitHub Pages in Settings → Pages → Branch: main, Folder: /docs

Your site will be live at: `https://YOUR_USERNAME.github.io/REPO_NAME`

### 2. Backend (Manual Deployment Required)
Follow [BACKEND_DEPLOYMENT.md](BACKEND_DEPLOYMENT.md) to:
- Deploy Flask app to Render, Railway, Heroku, etc.
- Get your backend URL
- Update `/docs/config.js` with the API URL

### 3. Configure Frontend
Edit `/docs/config.js` and update:
```javascript
const API_BASE_URL = 'https://your-backend-url.com';
```

## 📁 Project Structure

```
elvebredd-forked/
├── docs/                          # ⭐ Frontend (GitHub Pages)
│   ├── index.html
│   ├── config.js                 # ← UPDATE THIS
│   ├── css/
│   ├── js/
│   └── images/
│
├── app.py                        # Backend Flask app
├── functions.py                  # Backend logic
├── install_dependencies.txt      # Python dependencies
├── GITHUB_PAGES_SETUP.md        # Frontend docs
├── BACKEND_DEPLOYMENT.md        # Backend docs
└── README.md                     # This file
```

## 🔑 Key Features

- ✅ User authentication (sign up/login)
- ✅ Pet listings and trades
- ✅ Search functionality
- ✅ Notifications system
- ✅ User profiles
- ✅ Responsive design

## 🛠️ Development

### Backend (Local)
```bash
pip install -r install_dependencies.txt
python app.py
# Runs on http://localhost:5000
```

### Frontend (Local)
```bash
cd docs
python -m http.server 3000
# Visit http://localhost:3000
```

## 📖 Documentation Checklist

- [ ] Read [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)
- [ ] Read [BACKEND_DEPLOYMENT.md](BACKEND_DEPLOYMENT.md)
- [ ] Read [docs/README.md](docs/README.md)
- [ ] Deploy backend
- [ ] Update `/docs/config.js`
- [ ] Test frontend and backend
- [ ] Deploy to GitHub Pages

## 🔒 Security Checklist

- [ ] Backend uses HTTPS
- [ ] CORS configured for GitHub Pages domain
- [ ] No secrets in code (use environment variables)
- [ ] Database credentials secured
- [ ] Input validation on backend
- [ ] Strong secret key in Flask

## 🌐 Live Deployment

After setup, your site will be accessible at:
```
Frontend:  https://YOUR_USERNAME.github.io/REPO_NAME
Backend:   https://your-backend-url.com
```

## 📞 Support

- 💬 [Discord Community](https://discord.gg/Byny894ZQP)
- 🎥 [YouTube Channel](https://www.youtube.com/@Elvebredd)
- 📧 Email: support@elvebredd.com (if available)

## 📝 License

See LICENSE file (if applicable)

## 🎯 Next Steps

**👉 START HERE:**
1. Read [BACKEND_DEPLOYMENT.md](BACKEND_DEPLOYMENT.md)
2. Deploy your backend
3. Update `/docs/config.js` with your API URL
4. Push to GitHub and enable Pages

Full details in the documentation files above!
