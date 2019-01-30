import React, { Component } from 'react';
import '../../main.scss';
import { fetchMovies } from '../../helpers/requests';
import { addMovies } from '../../actions';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount = async () => {
    const movies = await fetchMovies();
    this.props.addMovies(movies.results);
  }

  render() {
    return (
      <div className="App">
      <header>
        Hello
      </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
});

export default connect(null, mapDispatchToProps)(App);
