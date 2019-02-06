import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showPopup, toggleFavorite, addFavorite, removeFavorite } from '../../actions';
import { addFavoriteToDB, removeFavoriteFromDB } from '../../helpers/requests';
import PropTypes from 'prop-types';

export class MovieCard extends Component {
    constructor() {
        super()
    }


    handleClick = async () => {
        let { currentUser, handleShowPopup, toggleFavorite, addFavorite, removeFavorite, id, isFavorite, title, poster_path, release_date, vote_average, overview } = this.props
        if (currentUser && isFavorite) {
            await removeFavoriteFromDB(currentUser.id, id);
            removeFavorite(id);
            toggleFavorite(id);
        } else if (currentUser && !isFavorite) {
            await addFavoriteToDB(id, currentUser.id, title, poster_path, release_date, vote_average, overview);
            addFavorite(id)
            toggleFavorite(id);
        } else {
            handleShowPopup(true);
        }
    }

    render() {
        let { id, title, poster_path, isFavorite } = this.props
        
        return (
                <div className='movie-card'>
                    <i className={'fas fa-crown favorite-' + isFavorite} onClick={() => this.handleClick()}></i>
                    <Link to={`movies/${id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className='movie-poster' alt={title}/>
                    </Link>
                </div>
            )   
        }    
}


export const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export const mapDispatchToProps = (dispatch) => ({
    handleShowPopup: (bool) => dispatch(showPopup(bool)),
    toggleFavorite: (id) => dispatch(toggleFavorite(id)),
    addFavorite: (id) => dispatch(addFavorite(id)),
    removeFavorite: (id) => dispatch(removeFavorite(id))
});

MovieCard.propTypes = {
    handleShowPopup: PropTypes.func,
    toggleFavorite: PropTypes.func,
    addFavorite: PropTypes.func,
    removeFavorite: PropTypes.func,
    id: PropTypes.number, 
    original_title: PropTypes.string, 
    poster_path: PropTypes.string, 
    isFavorite: PropTypes.bool, 
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieCard)