import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';

export const MoviesContain = (props) => {
    let displayMovies;
    if(props.showFavs) {
        displayMovies = props.favoriteMovies.map((favoriteId) => {
            let movie = props.movies.find((movie) => {
                return movie.id === favoriteId
            })
            return <MovieCard {...movie} key={movie.id}/>
        })
    } else {
        displayMovies = props.movies.map((movie) =>
            <MovieCard {...movie} key={movie.id}/>)
    }
    return (
        <div className='movies-contain'>
            {displayMovies}
        </div>
    )
}

export const mapStateToProps = (state) => ({
    movies: state.movies,
    favoriteMovies: state.favoriteMovies,
});

export default connect(mapStateToProps)(MoviesContain);