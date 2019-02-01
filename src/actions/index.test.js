import * as actions from './index';
import { mockMovieData } from '../__fixtures__/mockData';

describe('actions', () => {
    it('should return a type of ADD_MOVIES, with movies', () => {
        const expected = {
            type: 'ADD_MOVIES',
            movies: mockMovieData
        }
        const result = actions.addMovies(mockMovieData)
        expect(result).toEqual(expected)
    });

    it.skip('should return a type of LOGIN_USER, with an id and name', () => {

    });

    it.skip('should return a type of UPDATE_ERROR, with a message', () => {

    });
});