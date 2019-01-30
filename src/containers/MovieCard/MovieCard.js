import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const MovieCard = ({ id, original_title, overview, release_date, vote_average, poster_path }) => {
    return (
        <Link to={`movies/${id}`}>
            <h2>{original_title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`}/>
        </Link>
    )
}

export default MovieCard