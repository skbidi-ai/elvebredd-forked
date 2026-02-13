// API Configuration
// Update API_BASE_URL to your backend API location
const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';

// Session configuration
let sessionData = {
    loggedIn: false,
    userID: '',
    userData: {}
};

// Initialize session from localStorage
function initializeSession() {
    const stored = localStorage.getItem('sessionData');
    if (stored) {
        try {
            sessionData = JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse stored session data');
        }
    }
}

// Save session to localStorage
function saveSession() {
    localStorage.setItem('sessionData', JSON.stringify(sessionData));
}

// Clear session
function clearSession() {
    sessionData = {
        loggedIn: false,
        userID: '',
        userData: {}
    };
    localStorage.removeItem('sessionData');
}

// API Helper functions
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Navigation helper
function goTo(path) {
    // Handle relative paths for GitHub Pages subdirectory
    if (!path.startsWith('http')) {
        const basePath = window.location.pathname.split('/elvebredd-forked')[0] + '/elvebredd-forked';
        path = basePath + path;
    }
    window.location.href = path;
}

// Logout function
function logout() {
    clearSession();
    window.location.href = '/';
}

// Check if user is logged in
function isLoggedIn() {
    return sessionData.loggedIn === true;
}

// Get current user ID
function getCurrentUserID() {
    return sessionData.userID || '';
}

// Update UI based on login state
function updateUILogin() {
    const loggedInElements = document.querySelectorAll('.loggedIn');
    const loggedOutElements = document.querySelectorAll('.loggedOut');
    
    if (isLoggedIn()) {
        loggedInElements.forEach(el => el.style.display = '');
        loggedOutElements.forEach(el => el.style.display = 'none');
    } else {
        loggedInElements.forEach(el => el.style.display = 'none');
        loggedOutElements.forEach(el => el.style.display = '');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSession();
    updateUILogin();
});
