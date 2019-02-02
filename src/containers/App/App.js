import React, { Component } from 'react';
import '../../main.scss';
import { fetchMovies } from '../../helpers/requests';
import { addMovies, updateError } from '../../actions';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import MovieContain from '../MoviesContain/MoviesContain';
import CreateAccount from '../CreateAccount/CreateAccount';
import Login from '../Login/Login';
import { withRouter } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export class App extends Component {

  componentDidMount = async () => {
    try {
      const movies = await fetchMovies();
      this.props.addMovies(movies.results);
    } catch(error) {
      this.props.updateError(error.message);
    }
  }

  render() {
    return (
      <div className="App">
      <div className='banner'>
          MOVIE
            <br />TRACKER
            <img src={require('../../images/bestfilmaward.png')} className='golden-leaves' altText='golden leaves'/>
      </div>
      <Navigation />
      <Switch>
        <Route exact path='/movies' component={MovieContain} />
        <Route exact path='/'>
          <Redirect to='/movies'/>
        </Route>
        <Route exact path='/create-account' component={CreateAccount} />
        <Route exact path='/login' component={Login} />
      </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies)),
  updateError: (message) => dispatch(updateError(message)) 
});

export default withRouter(connect(null, mapDispatchToProps)(App));
