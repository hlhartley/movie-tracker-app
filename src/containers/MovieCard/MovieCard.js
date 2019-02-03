import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ id, original_title, overview, release_date, vote_average, poster_path }) => {
    return (
        <div className='movie-card'>
            <i class={'fas fa-crown favorite-false'}></i>
            <Link to={`movies/${id}`}>
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className='movie-poster' alt={original_title}/>
            </Link>
        </div>
    )
}

export default MovieCard