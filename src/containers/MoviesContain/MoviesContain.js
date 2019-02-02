import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';

export const MoviesContain = (props) => {

    const displayMovies = props.movies.map((movie) =>
        <MovieCard {...movie} key={movie.id}/>
    )

    return (
        <div className='movies-contain'>
            {displayMovies}
        </div>
    )
}

export const mapStateToProps = (state) => ({
    movies: state.movies
});

export default connect(mapStateToProps)(MoviesContain);