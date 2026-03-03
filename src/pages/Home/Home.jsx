import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { fallbackMovies } from '../../fallbackData';

function Home() {
  const [bannerMovie, setBannerMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setBannerMovie(fallbackMovies.popular[0]);
    
    const fetchBannerMovie = async () => {
      try {
        const res = await fetch(
          'https://api.themoviedb.org/3/movie/popular?page=1',
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        
        if (!res.ok) throw new Error('TMDB down');
        
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * data.results.length
          );
          setBannerMovie(data.results[randomIndex]);
        }
      } catch (error) {
        // Already showing fallback
      }
    };

    fetchBannerMovie();
  }, []);

  return (
    <div className="home">
      <Navbar />

      {/* 🔥 Dynamic Random Banner */}
      {bannerMovie && (
        <div className="hero">
          <img
            src={`https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`}
            alt={bannerMovie.title}
            className="banner-img"
          />

          <div className="hero-caption">
            <h1>{bannerMovie.title}</h1>
            <p>{bannerMovie.overview?.slice(0, 150)}...</p>

            <div className="hero-btns">
              <button
                className="hero-btn play"
                onClick={() => navigate(`/player/${bannerMovie.id}`)}
              >
                <img src={play_icon} alt="" />
                Play
              </button>

              <button className="hero-btn info">
                <img src={info_icon} alt="" />
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 Multiple Movie Rows */}
      <div className="more-cards">
        <TitleCards title="Trending Now" category="trending" />
        <TitleCards title="Blockbuster Movies" category="popular" />
        <TitleCards title="Upcoming" category="upcoming" />
        <TitleCards title="Top Picks for You" category="top_rated" />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
