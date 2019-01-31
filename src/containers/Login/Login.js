import React, { Component } from 'react';
import { getUser } from '../../helpers/requests';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, updateError } from '../../actions';

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
        this.props.updateError('');        
        try {
            const result = await getUser(this.state)
            this.props.loginUser(result.data.id, result.data.name)
        } catch(error) {
            this.props.updateError(error.message);
        }
        
    }

    render() {
        let { currentUser, errorStatus } = this.props;
        if(!currentUser) {
            return(
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='email'>E-mail</label>
                    <input name='email' value={this.state.email} id='email' onChange={this.handleChange}/>
                    <label htmlFor='password'>Password</label>
                    <input name='password' value={this.state.password} id='password' onChange={this.handleChange}/>
                    { (errorStatus !== '') && <p>{errorStatus}</p> }
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
    currentUser: state.currentUser,
    errorStatus: state.errorStatus
});

export const mapDispatchToProps = (dispatch) => ({
    loginUser: (id, name) => dispatch(loginUser(id, name)),
    updateError: (message) => dispatch(updateError(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);