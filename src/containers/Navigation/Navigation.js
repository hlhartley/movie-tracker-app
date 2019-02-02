import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../actions';

export const Navigation = (props) => {
    let { currentUser, logoutUser } = props
    if (currentUser) {
        return( 
        <header>
            <NavLink to ='/favorites' className='nav'>Favorites </NavLink>
            <button onClick={() => logoutUser()}>Log out</button>
        </header>
        )
    } else {
        return(
            <header>
                <NavLink to ='/login' className='nav'>Login </NavLink> 
                <NavLink to ='/create-account' className='nav'>Create Account </NavLink> 
            </header>
        )
    }
}

export const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

