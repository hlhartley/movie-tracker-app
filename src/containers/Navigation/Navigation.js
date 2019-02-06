import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser, resetFavorites, toggleFavorite } from '../../actions';
import PropTypes from 'prop-types';

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
            <nav className='user-nav'>
                <div className='left-side-nav'>
                    <NavLink to='/' className='nav'><i className="fas fa-home"></i> Home </NavLink>
                    <NavLink to='/favorites' className='nav'><i className='fas fa-crown'></i> Favorites </NavLink>
                </div>
                <div>
                    <button onClick={this.handleLogout} className='logout-btn'>Log out</button>
                </div>
            </nav>
            )
        } else {
            return(
                <nav className='guest-nav'>
                    <div>
                        <NavLink to='/' className='nav'><i className="fas fa-home"></i> Home </NavLink>
                    </div>
                    <div>
                        <NavLink to='/login' className='nav'>Login</NavLink> 
                        <NavLink to='/create-account' className='nav'>Create Account</NavLink> 
                    </div>
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


Navigation.propTypes = {
    favoriteMovies: PropTypes.array,
    logoutUser: PropTypes.func,
    toggleFavorites: PropTypes.func,
    resetFavorites: PropTypes.func, 
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

