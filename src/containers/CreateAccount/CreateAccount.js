import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateAccount extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    handleChange = (e) => {
        let { name, value} = e.target
        this.setState({ [name]: value })
    }

    render() {
        return(
            <form>
                <label for='name'>Name</label>
                <input name='name' value={this.state.name} id='name' onChange={this.handleChange}/>
                <label for='email'>E-mail</label>
                <input name='email' value={this.state.email} id='email' onChange={this.handleChange}/>
                <label for='password'>Password</label>
                <input name='password' value={this.state.password} id='password' onChange={this.handleChange}/>
                <button>Create Account</button>
            </form>
        )
    }
}

export default CreateAccount;