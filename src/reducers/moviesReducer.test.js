import { moviesReducer } from './moviesReducer';
import * as actions from '../actions/index';
import { mockMovieData, mockMovies } from '../__fixtures__/mockData';

describe('moviesReducer', () => {
    it('should return the initial state', () => {
        const expected = []

        const result = moviesReducer(undefined, {})
        expect(result).toEqual(expected)
    });

    it('should return the state with movies', () => {
        const expected = mockMovies
        const currentState = []

        const result = moviesReducer(currentState, actions.addMovies(mockMovieData))
        expect(result).toEqual(expected)
    });

    it('should return the state after toggling the isFavorite property on the correct movie', () => {
        const movie1 = { id: 297802, title: "Aquaman", isFavorite: false };
        const movie2 = { id: 569834, title: 'Bumblebee', isFavorite: false };
        const initialState = [movie1, movie2];
        const favoritedMovie2 = { id: 569834, title: 'Bumblebee', isFavorite: true }
        const expected = [movie1, favoritedMovie2];
        const result = moviesReducer(initialState, actions.toggleFavorite(movie2.id));
        expect(result).toEqual(expected);
    });
})