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
    })
})