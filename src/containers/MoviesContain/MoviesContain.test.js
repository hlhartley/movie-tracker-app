import { MoviesContain, mapStateToProps } from '../MoviesContain/MoviesContain';
import { mockState, mockMovies } from '../../__fixtures__/mockData';

describe('MoviesContain', () => {
  
  describe('MoviesContain component', () => {

  });

  describe('mapStateToProps', () => {
    it('should return an object with a movies array', () => {
      const expected = {
        movies: mockMovies
      }
      const mappedProp = mapStateToProps(mockState);
      expect(mappedProp).toEqual(expected)
    });
  })
})