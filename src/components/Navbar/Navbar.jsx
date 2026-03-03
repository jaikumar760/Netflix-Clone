import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from "../../assets/logo.png";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/search/${query}`);
      setQuery("");
    }
  };

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className='navbar-left'>
        <img src={logo} alt="Netflix" onClick={() => navigate('/')} />

        <ul>
          <li onClick={() => navigate('/')}>Home</li>

          {/* ✅ TV SHOWS */}
          <li onClick={() => navigate('/tv')}>TV Shows</li>

          {/* ✅ MOVIES */}
          <li onClick={() => navigate('/movies')}>Movies</li>

          {/* ✅ NEW & POPULAR */}
          <li onClick={() => navigate('/new-popular')}>New & Popular</li>

          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className='navbar-right'>
        {/* 🔍 SEARCH INPUT */}
        <input
          type="text"
          className="search-input"
          placeholder="Search movies or TV shows"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />

        <p>Children</p>
        <img src={bell_icon} alt="bell" />

        <div className="navbar-profile">
          <img src={profile_img} alt="profile" className="profile" />
          <img src={caret_icon} alt="caret" />
          <div className='dropdown'>
            <p onClick={handleLogout}>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
