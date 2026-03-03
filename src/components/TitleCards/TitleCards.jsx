import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link, useLocation } from 'react-router-dom';
import { fallbackMovies } from '../../fallbackData';
import '../Spinner.css';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const BASE_URL = 'https://api.themoviedb.org/3';
    let endpoint = '';

    switch (category) {
      case 'trending':
        endpoint = `${BASE_URL}/trending/all/week`;
        break;
      case 'popular':
      case 'now_playing':
      case 'top_rated':
      case 'upcoming':
        endpoint = `${BASE_URL}/movie/${category}`;
        break;
      default:
        endpoint = `${BASE_URL}/movie/now_playing`;
    }

    const fetchMovies = async () => {
      const timeout = setTimeout(() => {
        setApiData(fallbackMovies[category] || fallbackMovies.trending);
        setLoading(false);
      }, 3000);

      try {
        const res = await fetch(`${endpoint}?page=1`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        });
        
        clearTimeout(timeout);
        
        if (!res.ok) throw new Error('TMDB down');
        
        const data = await res.json();
        setApiData(data.results || fallbackMovies[category] || fallbackMovies.trending);
        setLoading(false);
      } catch (error) {
        clearTimeout(timeout);
        setApiData(fallbackMovies[category] || fallbackMovies.trending);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const scrollLeft = () => {
    cardsRef.current.scrollBy({ left: -800, behavior: 'smooth' });
  };

  const scrollRight = () => {
    cardsRef.current.scrollBy({ left: 800, behavior: 'smooth' });
  };

  return (
    <div className="title-cards">
      <h2>{title}</h2>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <button className="scroll-btn left" onClick={scrollLeft}>❮</button>
          <button className="scroll-btn right" onClick={scrollRight}>❯</button>
          <div className="card-list" ref={cardsRef}>
          {apiData.map((movie, index) => {
            const imgPath = movie.backdrop_path || movie.poster_path;
            if (!imgPath) return null;

            return (
              <Link
                to={`/player/${movie.id}`}
                state={{ from: location.pathname }}
                className="card"
                key={index}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${imgPath}`}
                  alt={movie.title || movie.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="card-overlay">
                  <div className="card-title">{movie.title || movie.name}</div>
                  <div className="card-info">
                    <span className="card-match">{Math.floor(Math.random() * 20 + 80)}% Match</span>
                    <span className="card-rating">13+</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        </>
      )}
    </div>
  );
};

export default TitleCards;
