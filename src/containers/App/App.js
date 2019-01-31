import React, { Component } from 'react';
import '../../main.scss';
import { fetchMovies } from '../../helpers/requests';
import { addMovies } from '../../actions';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import MovieContain from '../MoviesContain/MoviesContain';
import CreateAccount from '../CreateAccount/CreateAccount';

export class App extends Component {

  componentDidMount = async () => {
    const movies = await fetchMovies();
    this.props.addMovies(movies.results);
  }

  render() {
    return (
      <div className="App">
      <header>
        <NavLink to ='/favorites' className='nav'>Favorites </NavLink>
      </header>
      <Route exact path='/create-account' component={CreateAccount}/>
      <MovieContain />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
});

export default connect(null, mapDispatchToProps)(App);
