import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewUser } from '../../helpers/requests';
import { Redirect } from 'react-router-dom';
import { updateError, loginUser } from '../../actions';
import { validator } from '../../helpers/validators';

export class CreateAccount extends Component {
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

    handleSubmit = async () => {
        let user = {...this.state};
        user.email = user.email.toLowerCase();
        try {
            const newUser = await createNewUser(user);
            this.props.loginUser(newUser.id, this.state.name)
        } catch(error) {
            this.props.updateError(error.message)
        }
    }

    validateInput = (e) => {
        e.preventDefault();
        this.props.updateError('');
        const { name, email, password } = this.state;
        if (!validator('name', name) || !validator('email', email) || !validator('password', password)) {
            this.props.updateError('Input not successful');
        } else {
            this.handleSubmit();
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
                <form onSubmit={this.validateInput} className='form-container'>
                    <p className='main-text'>SIGN UP FOR FREE</p>
                    <p className='sub-text'>Start tracking your favorite movies today!</p>
                    <div className='name-container'>
                        <label htmlFor='name'><i className="fas fa-user"></i></label>
                        <input name='name' value={this.state.name} id='name' onChange={this.handleChange} placeholder='Full name'/>
                    </div>    
                    <div className='email-container'>
                        <label htmlFor='email'><i className="far fa-envelope"></i></label>
                        <input name='email' value={this.state.email} id='email' onChange={this.handleChange} placeholder='E-mail address'/>
                    </div>
                    <div className='password-container'>   
                        <label htmlFor='password'><i className="fas fa-lock"></i></label>
                        <input name='password' value={this.state.password} id='password' onChange={this.handleChange} placeholder='Password (between 5-10 characters)'/>
                    </div>    
                        { (errorStatus !== '' && errorStatus !== 'Input not successful') && <p>Email has already been used</p>}
                        { (errorStatus === 'Input not successful') && <p>All fields must be filled in to create an account</p>}
                    <button className='create-account-btn'>Create Account</button>
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