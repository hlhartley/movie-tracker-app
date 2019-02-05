import React, { Component } from 'react';
import { getUser, getUserFavorites } from '../../helpers/requests';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, updateError, toggleFavorite, addFavorite } from '../../actions';

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
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='email'>E-mail</label>
                    <input name='email' value={this.state.email} id='email' onChange={this.handleChange}/>
                    <label htmlFor='password'>Password</label>
                    <input name='password' value={this.state.password} id='password' onChange={this.handleChange}/>
                    { (errorStatus !== '') && <p>Email and Password do not match</p> }
                    <button>Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);