import React, { Component } from 'react';
import { getUser } from '../../helpers/requests';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const result = await getUser(this.state)
            this.props.loginUser(result.data.id, result.data.name)
        } catch(error) {
            this.setState({ error: error.message })
        }
        
    }

    render() {
        if(!this.props.currentUser) {
            return(
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='email'>E-mail</label>
                    <input name='email' value={this.state.email} id='email' onChange={this.handleChange}/>
                    <label htmlFor='password'>Password</label>
                    <input name='password' value={this.state.password} id='password' onChange={this.handleChange}/>
                    <button>Login</button>
                </form>
            )    
        } else {
            return(
                <Redirect to='/'/>
            )
        }
    }
}

export const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export const mapDispatchToProps = (dispatch) => ({
    loginUser: (id, name) => dispatch(loginUser(id, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);