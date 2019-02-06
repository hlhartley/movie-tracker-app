import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapDispatchToProps, mapStateToProps } from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { shallow } from 'enzyme';
import * as actions from '../../actions';
import { mockMovieData, mockMovies } from '../../__fixtures__/mockData';
import * as Requests from '../../helpers/requests';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = createStore(rootReducer)
    ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('App component', () => {
    let wrapper;
    let mockAddMovies = jest.fn()
    let mockUpdateError = jest.fn()
    let initialMovies = []
    let mockShowPopup = false;

    beforeEach(() => {
      wrapper = shallow(<App addMovies={mockAddMovies} updateError={mockUpdateError} movies={initialMovies} showPopup={mockShowPopup}/>)
    })

    it('should call fetchMovies when componentDidMount', () => {
      Requests.fetchMovies = jest.fn()
      wrapper.instance().componentDidMount()
      expect(Requests.fetchMovies).toHaveBeenCalled()
    })

    it('should addMovies if everything is ok with the fetchMovies data', async () => {
      Requests.fetchMovies = jest.fn().mockImplementation(() => Promise.resolve({
        results: mockMovieData
      }))
      await wrapper.instance().componentDidMount()
      expect(mockAddMovies).toHaveBeenCalledWith(mockMovieData)
    })

    it('should updateError if everything is not ok with the fetchMovies data', async () => {
      const mockError = 'Error fetching movies'
      Requests.fetchMovies = jest.fn().mockImplementation(() => {
        throw Error(mockError)
      })
      await wrapper.instance().componentDidMount()
      expect(mockUpdateError).toHaveBeenCalledWith(mockError)
    })
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using the addMovies function from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = actions.addMovies(mockMovieData);
      
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addMovies(mockMovieData)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });

    it('should call dispatch when using the updateError function from mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const mockMessage = 'Error getting movies'
      const actionToDispatch = actions.updateError(mockMessage);
      
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateError(mockMessage)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });
  });

  describe('mapStateToProps', () => {
    it('should return a props object with movies and showPopup', () => {
      const mockState = {
        movies: mockMovies,
        showPopup: false,
        currentUser: null
      }

      const expected = {
        movies: mockMovies,
        showPopup: false,
      }

      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    });
  });
})

