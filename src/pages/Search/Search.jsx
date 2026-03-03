import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const { query } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
    fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false`,
        {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
        }
    )
        .then(res => res.json())
        .then(data => setResults(data.results || []));
    }, [query]);

    return (
    <div className="search-page">
        <h2>Search results for: "{query}"</h2>

        <div className="search-grid">
        {results.map(item => (
            item.poster_path && (
            <Link
                key={item.id}
                to={`/player/${item.id}`}
                className="search-card"
            >
                <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                />
                <p>{item.title || item.name}</p>
            </Link>
            )
        ))}
        </div>
    </div>
    );
};

export default Search;
