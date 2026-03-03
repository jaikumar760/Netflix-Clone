import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import Search from './pages/Search/Search';

/* ✅ NEW PAGES IMPORT */
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";
import NewPopular from "./pages/NewPopular/NewPopular";

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthChecked(true);
      const from = location.state?.from || '/';

      if (user) {
        if (location.pathname === '/login') {
          navigate(from, { replace: true });
        }
      } else {
        if (location.pathname !== '/login') {
          navigate('/login', {
            state: { from: location.pathname },
            replace: true
          });
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  if (!authChecked) return null;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* 🎬 PLAYER */}
      <Route path="/player/:id" element={<Player />} />

      {/* 🔍 SEARCH */}
      <Route path="/search/:query" element={<Search />} />

      {/* ✅ NEW ROUTES */}
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TVShows />} />
      <Route path="/new-popular" element={<NewPopular />} />
    </Routes>
  );
};

export default App;
