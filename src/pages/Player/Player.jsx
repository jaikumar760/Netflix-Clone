import React, { useEffect, useState } from 'react';
import './Player.css';
import '../../components/Spinner.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';
import { fallbackTrailers } from '../../fallbackTrailers';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoKey, setVideoKey] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 TMDB options
  const tmdbOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      const movieId = parseInt(id);
      const fallback = fallbackTrailers[movieId] || fallbackTrailers.default;
      
      const timeout = setTimeout(() => {
        setVideoKey(fallback.key);
        setVideoDetails({
          title: fallback.title,
          channelTitle: 'Netflix',
          publishedAt: '2024-01-01'
        });
        setLoading(false);
      }, 2000);

      try {
        setLoading(true);

        const tmdbRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          tmdbOptions
        );
        
        if (!tmdbRes.ok) throw new Error('TMDB down');
        
        const tmdbData = await tmdbRes.json();

        if (!tmdbData.results || tmdbData.results.length === 0) {
          throw new Error('No trailer');
        }

        const trailer =
          tmdbData.results.find(
            (vid) =>
              vid.site === 'YouTube' &&
              vid.type === 'Trailer' &&
              vid.official === true
          ) ||
          tmdbData.results.find(
            (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
          );

        if (!trailer) {
          throw new Error('No YouTube trailer');
        }

        clearTimeout(timeout);

        const ytRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${trailer.key}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        const ytData = await ytRes.json();

        setVideoKey(trailer.key);
        setVideoDetails(ytData.items?.[0]?.snippet || null);
        setLoading(false);
      } catch (err) {
        clearTimeout(timeout);
        setVideoKey(fallback.key);
        setVideoDetails({
          title: fallback.title,
          channelTitle: 'Netflix',
          publishedAt: '2024-01-01'
        });
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-btn"
        onClick={() => navigate(-1)}
      />

      {loading ? (
        <div className="spinner"></div>
      ) : videoKey ? (
        <>
          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
            title="Movie Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>

          {videoDetails && (
            <div className="player-info">
              <p>
                <strong>Title:</strong> {videoDetails.title}
              </p>
              <p>
                <strong>Channel:</strong> {videoDetails.channelTitle}
              </p>
              <p>
                <strong>Published:</strong>{' '}
                {videoDetails.publishedAt?.slice(0, 10)}
              </p>
            </div>
          )}
        </>
      ) : (
        <p style={{ color: 'white' }}>{error}</p>
      )}
    </div>
  );
};

export default Player;
