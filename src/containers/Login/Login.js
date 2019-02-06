import React, { Component } from 'react';
import { getUser, getUserFavorites } from '../../helpers/requests';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, updateError, toggleFavorite, addFavorite } from '../../actions';
import PropTypes from 'prop-types';

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        this.props.updateError('');        
        try {
            const user = await getUser(this.state)
            const favs = await getUserFavorites(user.data.id)
            this.handleFavorites(favs.data)
            this.props.loginUser(user.data.id, user.data.name)
        } catch(error) {
            this.props.updateError(error.message);
        }

    }

    handleFavorites = (favorites) => {
        if(favorites.length > 0) {
            favorites.forEach((favorite) => {
                this.props.toggleFavorite(favorite.movie_id)
                this.props.addFavorite(favorite.movie_id)
            })
        }
    }

    render() {
        let { currentUser, errorStatus } = this.props;
        if (currentUser) {
            return(
                <Redirect to='/'/>
            )
        } else {
            return(
                <form onSubmit={this.handleSubmit} className='form-container'>
                    <i className="fas fa-user-circle"></i>
                    <div className='email-container'>
                        <label htmlFor='email'><i className="far fa-envelope"></i></label>
                        <input name='email' value={this.state.email} id='email' onChange={this.handleChange} placeholder='E-mail address'/>
                    </div>
                    <div className='password-container'>
                        <label htmlFor='password'><i className="fas fa-lock"></i></label>
                        <input type='password' name='password' value={this.state.password} id='password' onChange={this.handleChange} placeholder='Password'/>
                    </div>
                    { (errorStatus !== '') && <p>Email and Password do not match</p> }
                    <button className='login-btn'>LOGIN</button>
                </form>
            )    
        }
    }
}

export const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    errorStatus: state.errorStatus
});

export const mapDispatchToProps = (dispatch) => ({
    loginUser: (id, name) => dispatch(loginUser(id, name)),
    updateError: (message) => dispatch(updateError(message)),
    toggleFavorite: (id) => dispatch(toggleFavorite(id)),
    addFavorite: (id) => dispatch(addFavorite(id))
});

Login.propTypes = {
    errorStatus: PropTypes.string,
    updateError: PropTypes.func,
    loginUser: PropTypes.func,
    toggleFavorite: PropTypes.func,
    addFavorite: PropTypes.func,
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);