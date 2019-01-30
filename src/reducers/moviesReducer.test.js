import { moviesReducer } from './moviesReducer';
import * as actions from '../actions/index';
import { mockMovieData, mockMovies } from '../__fixtures__/mockData';

describe('moviesReducer', () => {
    it('should return the initial state', () => {
        const expected = []

        const result = moviesReducer(undefined, {})
        expect(result).toEqual(expected)
    })

    it('should return the state with movies', () => {
        const expected = mockMovies
        const currentState = []

        const result = moviesReducer(currentState, actions.addMovies(mockMovieData))
        expect(result).toEqual(expected)
    })
})