import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewUser } from '../../helpers/requests';
import { Redirect } from 'react-router-dom';
import { updateError, loginUser } from '../../actions';

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

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.updateError('');
        let user = this.state;
        try {
            const newUser = await createNewUser(user);
            this.props.loginUser(newUser.id, this.state.name)
            this.setState({
                name: '',
                email: '',
                password: '',
            });
        } catch(error) {
            this.props.updateError(error.message)
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
                    <label htmlFor='name'>Name</label>
                    <input name='name' value={this.state.name} id='name' onChange={this.handleChange}/>
                    <label htmlFor='email'>E-mail</label>
                    <input name='email' value={this.state.email} id='email' onChange={this.handleChange}/>
                    <label htmlFor='password'>Password</label>
                    <input name='password' value={this.state.password} id='password' onChange={this.handleChange}/>
                    { (errorStatus !== '') && <p>Email has already been used</p>}
                    <button>Create Account</button>
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
    updateError: (message) => dispatch(updateError(message)),
    loginUser: (id, name) => dispatch(loginUser(id, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);