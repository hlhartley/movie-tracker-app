import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';

const MoviesContain = (props) => {

    const displayMovies = props.movies.map((movie) =>
        <MovieCard {...movie} key={movie.id}/>
    )

    return (
        <div>
            <p>Movie Contain</p>
            {displayMovies}
        </div>
    )
}

const mapStateToProps = (state) => ({
    movies: state.movies
});

export default connect(mapStateToProps)(MoviesContain);