import React from 'react';
import { shallow } from 'enzyme';
import { MoviesContain, mapStateToProps } from '../MoviesContain/MoviesContain';
import { mockMovies, mockMoviesWithFavs } from '../../__fixtures__/mockData';

describe('MoviesContain', () => {
  
  describe('MoviesContain component', () => {
    let wrapper;
    const mockFavoriteMovies = [480530, 297802];
    beforeEach(() => {
      wrapper = shallow(<MoviesContain movies={mockMovies} favoriteMovies={mockFavoriteMovies} showFav={false}/>);
    });

    it('should match the snapshot showing all of the movies passed in when showFavs is false',() => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot showing only the favorite movies when showFavs is true', () => {
      wrapper.setProps({showFavs: true});
      wrapper.setProps({ movies: mockMoviesWithFavs });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with a movies array and favorites array', () => {
      const mockState = {
        movies: mockMovies,
        favoriteMovies: [480530, 297802],
        errorStatus: '', 
        showPopup: false
      }

      const expected = {
        movies: mockMovies,
        favoriteMovies: [480530, 297802],
      }
      const mappedProp = mapStateToProps(mockState);
      expect(mappedProp).toEqual(expected)
    });
  });

})