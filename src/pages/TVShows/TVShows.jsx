import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/MoviesTVShowsNewPopular.css";
import { fallbackMovies } from "../../fallbackData";
import "../../components/Spinner.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


const TVShows = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
    fetch("https://api.themoviedb.org/3/tv/popular", {
        headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    })
        .then(res => {
            if (!res.ok) throw new Error('TMDB down');
            return res.json();
        })
        .then(data => setShows(data.results || []))
        .catch(() => setShows(fallbackMovies.popular))
        .finally(() => setLoading(false));
    }, []);

    return (
    <>
    <Navbar />
    <div className="page">
        <h2>Popular TV Shows</h2>
        {loading ? (
            <div className="spinner"></div>
        ) : (
            <div className="grid">
            {shows.map(show => (
                <div
                key={show.id}
                className="card"
                onClick={() => navigate(`/player/${show.id}`)}
                >
                <img
                    src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                    alt={show.name}
                />
                <p>{show.name}</p>
                </div>
            ))}
            </div>
        )}
    </div>
    <Footer />
    </>
    );
};

export default TVShows;
