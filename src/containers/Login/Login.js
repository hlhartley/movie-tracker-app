import React, { Component } from 'react';
import { loginUser } from '../../helpers/requests';
import { Redirect } from 'react-router-dom';

class Login extends Component {
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
            const result = await loginUser(this.state)
            console.log(result)
        } catch(error) {
            this.setState({ error: error.message })
        }
        
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='email'>E-mail</label>
                <input name='email' value={this.state.email} id='email' onChange={this.handleChange}/>
                <label htmlFor='password'>Password</label>
                <input name='password' value={this.state.password} id='password' onChange={this.handleChange}/>
                <button>Login</button>
            </form>
        )
    }
}

export default Login;