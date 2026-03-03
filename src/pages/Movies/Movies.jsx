import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/MoviesTVShowsNewPopular.css";
import { fallbackMovies } from "../../fallbackData";
import "../../components/Spinner.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
        headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    })
        .then(res => {
            if (!res.ok) throw new Error('TMDB down');
            return res.json();
        })
        .then(data => setMovies(data.results || []))
        .catch(() => setMovies(fallbackMovies.popular))
        .finally(() => setLoading(false));
    }, []);

    return (
    <>
    <Navbar />
    <div className="page">
        <h2>Popular Movies</h2>

        {loading ? (
            <div className="spinner"></div>
        ) : (
            <div className="grid">
            {movies.map(movie => (
                <div
                key={movie.id}
                className="card"
                onClick={() => navigate(`/player/${movie.id}`)}
                >
                <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                />
                <p>{movie.title}</p>
                </div>
            ))}
            </div>
        )}
    </div>
    <Footer />
    </>
    );
};

export default Movies;
