import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showPopup } from '../../actions';

export class MovieCard extends Component {
    constructor() {
        super()
    }

    handleClick = () => {
        let { currentUser, handleShowPopup } = this.props
        if (currentUser) {
            //add to their favorites
        } else {
            handleShowPopup(true);
        }
    }

    render() {
        let { id, original_title, poster_path, isFavorite } = this.props
        
        return (
                <div className='movie-card'>
                    <i className={'fas fa-crown favorite-' + isFavorite} onClick={() => this.handleClick()}></i>
                    <Link to={`movies/${id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className='movie-poster' alttext={original_title}/>
                    </Link>
                </div>
            )   
        }    
}


export const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export const mapDispatchToProps = (dispatch) => ({
    handleShowPopup: (bool) => dispatch(showPopup(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard)