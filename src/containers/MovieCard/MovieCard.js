import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class MovieCard extends Component {
    constructor() {
        super()
    }

    render() {
        let { id, original_title, poster_path, isFavorite, currentUser } = this.props
        return (
            
                <div className='movie-card'>
                    <i className={'fas fa-crown favorite-' + isFavorite}></i>
                    <Link to={`movies/${id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className='movie-poster' alttext={original_title}/>
                    </Link>
                </div>
            )   
        }    
    }


export const mapStateToProps = (state) => ({
    currentUser: state.currentUser   
})

export default connect(mapStateToProps)(MovieCard)