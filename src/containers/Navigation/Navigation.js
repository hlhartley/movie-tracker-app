import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser, resetFavorites, toggleFavorite } from '../../actions';

export class Navigation extends Component {
    constructor() {
        super()
    }

    handleLogout = () => {
        let { favoriteMovies, toggleFavorite, resetFavorites, logoutUser } = this.props
        if (favoriteMovies.length > 0) {
            favoriteMovies.forEach((favorite) => {
                toggleFavorite(favorite);
            })
            resetFavorites();
        }
        logoutUser();
    }

    render() {
        let { currentUser } = this.props
        if (currentUser) {
            return( 
            <nav>
                <NavLink to ='/favorites' className='nav'>Favorites </NavLink>
                <button onClick={this.handleLogout}>Log out</button>
            </nav>
            )
        } else {
            return(
                <nav>
                    <NavLink to ='/login' className='nav'>Login</NavLink> 
                    <NavLink to ='/create-account' className='nav'>Create Account</NavLink> 
                </nav>
            )
        }
    }
}

export const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    favoriteMovies: state.favoriteMovies,
});

export const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
    toggleFavorite: (id) => dispatch(toggleFavorite(id)),
    resetFavorites: () => dispatch(resetFavorites()) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

