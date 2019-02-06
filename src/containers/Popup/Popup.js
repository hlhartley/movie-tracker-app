import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showPopup } from '../../actions';
import PropTypes from 'prop-types';

export const Popup = (props) => {

  return(
    <div className='popup'>
      <i className="far fa-times-circle" onClick={() => props.showPopup(false)}></i>
      
      <div className='popup-message'>
        <p>Create a free account to save your favorite movies</p>
        <Link to='/create-account'>
          <button onClick={() => props.showPopup(false)} className='create-account-btn'>Create Account</button>
        </Link>
        <Link to='/login'>
          <button onClick={() => props.showPopup(false)} className='login-btn'>Already a user? Login</button>
        </Link>
      </div>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  showPopup: (bool) => dispatch(showPopup(bool))
});

Popup.propTypes = {
  showPopup: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(Popup)