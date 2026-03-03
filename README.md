# 🎬 Netflix Clone

A pixel-perfect Netflix clone built with React, featuring real-time movie data, user authentication, and a fully responsive design.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://netflix-clone-roan-eta.vercel.app)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.5-purple)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.5.0-orange)](https://firebase.google.com/)

## ✨ Features

- 🎥 **Real-time Movie Data** - Integration with TMDB API for latest movies and TV shows
- 🔐 **User Authentication** - Secure login/signup with Firebase Authentication
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎨 **Netflix-Inspired UI** - Pixel-perfect design matching Netflix's interface
- 🎬 **Video Trailers** - Watch movie trailers with YouTube integration
- 🔍 **Search Functionality** - Search for movies and TV shows
- 💾 **Fallback System** - Works even when TMDB API is down
- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times

## 🚀 Live Demo

**[View Live Demo](https://netflix-clone-roan-eta.vercel.app)**

### 🔐 Demo Account

For quick evaluation, use the credentials below:

```
Email:    demo@netflixclone.app
Password: Demo@2025!
```

> **Note:** This account is provided for demonstration purposes only.

## 🛠️ Tech Stack

- **Frontend:** React 19, React Router DOM
- **Styling:** CSS3, Custom Animations
- **Backend:** Firebase (Authentication & Firestore)
- **API:** TMDB API, YouTube Data API
- **Build Tool:** Vite
- **Deployment:** Vercel

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/jaikumar760/Netflix-Clone.git
cd Netflix-Clone
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
VITE_TMDB_TOKEN=your_tmdb_api_token
VITE_YOUTUBE_API_KEY=your_youtube_api_key
```

4. **Configure Firebase**

Update `src/firebase.js` with your Firebase config.

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔑 API Keys

### TMDB API
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account
3. Go to Settings → API → Request API Key
4. Copy your API Read Access Token

### YouTube Data API
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create credentials (API Key)

## 📁 Project Structure

```
Netflix-Clone/
├── public/
├── src/
│   ├── assets/          # Images and icons
│   ├── components/      # Reusable components
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── TitleCards/
│   ├── pages/           # Page components
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Movies/
│   │   ├── TVShows/
│   │   └── Player/
│   ├── firebase.js      # Firebase configuration
│   ├── fallbackData.js  # Fallback movie data
│   └── App.jsx          # Main app component
├── .env
└── package.json
```

## 🎨 Features Breakdown

### Authentication
- Email/Password login and signup
- Secure session management with Firebase
- Protected routes

### Movie Browsing
- Trending movies and TV shows
- Popular, Top Rated, and Upcoming sections
- Smooth horizontal scrolling
- Hover effects with movie details

### Video Player
- YouTube trailer integration
- Fallback trailers when API is unavailable
- Full-screen support

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1200px
- Touch-friendly navigation

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

## 📝 License

This project is for educational purposes only. Netflix is a registered trademark of Netflix, Inc.

## 👨‍💻 Author

**Jai Kumar**

- GitHub: [@jaikumar760](https://github.com/jaikumar760)
- Portfolio: [Your Portfolio Link]

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the movie database API
- [Netflix](https://www.netflix.com/) for design inspiration
- [Firebase](https://firebase.google.com/) for backend services

---

© 2025 Jai Kumar. All rights reserved.
