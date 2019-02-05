import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import { Link } from 'react-router-dom';

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
            {(props.favoriteMovies.length === 0 && props.showFavs) && <div className='start-adding-favs-prompt'><h2>Start adding movies to your favorites by clicking the <i className='fas fa-crown'></i> above a movie</h2><Link to='/'>View Movies</Link></div>}
        </div>
    )
}

export const mapStateToProps = (state) => ({
    movies: state.movies,
    favoriteMovies: state.favoriteMovies,
});

export default connect(mapStateToProps)(MoviesContain);