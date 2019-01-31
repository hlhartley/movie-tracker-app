import React from 'react';
import ReactDOM from 'react-dom';
import App, { mapDispatchToProps } from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { shallow } from 'enzyme';
import * as actions from '../../actions';
import { mockMovieData } from '../../__fixtures__/mockData';

describe('App', () => {

  describe('App component', () => {
    it.skip('renders without crashing', () => {
      const div = document.createElement('div');
      const store = createStore(rootReducer)
      ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using a function from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = actions.addMovies(mockMovieData);
      
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addMovies(mockMovieData)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });
  });
})

