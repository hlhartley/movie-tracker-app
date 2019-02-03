import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showPopup } from '../../actions';

export const Popup = (props) => {

  return(
    <div className='popup'>
      <i class="far fa-times-circle" onClick={() => props.showPopup(false)}></i>
      <p>Create a free account to save your favorite movies</p>
      <Link to='/create-account'>
        <button onClick={() => props.showPopup(false)}>Create Account</button>
      </Link>
      <Link to='/login'>
        <button onClick={() => props.showPopup(false)}>Already a user? Login</button>
      </Link>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => ({
  showPopup: (bool) => dispatch(showPopup(bool))
});

export default connect(null, mapDispatchToProps)(Popup)