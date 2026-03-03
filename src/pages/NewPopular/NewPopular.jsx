import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/MoviesTVShowsNewPopular.css";
import { fallbackMovies } from "../../fallbackData";
import "../../components/Spinner.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


const NewPopular = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/all/week", {
        headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    })
        .then(res => {
            if (!res.ok) throw new Error('TMDB down');
            return res.json();
        })
        .then(data => setItems(data.results || []))
        .catch(() => setItems(fallbackMovies.trending))
        .finally(() => setLoading(false));
    }, []);

    return (
    <>
    <Navbar />
    <div className="page">
        <h2>New & Popular</h2>
        {loading ? (
            <div className="spinner"></div>
        ) : (
            <div className="grid">
            {items.map(item => (
                <div
                key={item.id}
                className="card"
                onClick={() => navigate(`/player/${item.id}`)}
                >
                <img
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={item.title || item.name}
                />
                <p>{item.title || item.name}</p>
                </div>
            ))}
            </div>
        )}
    </div>
    <Footer />
    </>
    );
};

export default NewPopular;
