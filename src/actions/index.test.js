import * as actions from './index';
import { mockMovieData } from '../__fixtures__/mockData';

describe('actions', () => {
    it('should return a type of ADD_MOVIES, with movies', () => {
        const expected = {
            type: 'ADD_MOVIES',
            movies: mockMovieData
        }
        const result = actions.addMovies(mockMovieData);
        expect(result).toEqual(expected);
    });

    it('should return a type of LOGIN_USER, with an id and name', () => {
        const id = 2;
        const name = 'Lee';
        const expected = {
            type: 'LOGIN_USER',
            id,
            name
        }
        const result = actions.loginUser(id, name);
        expect(result).toEqual(expected);
    });

    it('should return a type of UPDATE_ERROR, with a message', () => {
        const message = 'Error: email has already been used';
        const expected = {
            type: 'UPDATE_ERROR',
            message
        }
        const result = actions.updateError(message);
        expect(result).toEqual(expected);
    });

    it('should return a type of LOGOUT_USER', () => {
        const expected = {
            type: 'LOGOUT_USER'
        }
        const result = actions.logoutUser();
        expect(result).toEqual(expected)
    });

    it('should return a type of SHOW_POPUP with a boolean', () => {
        const bool = true;
        const expected = {
            type: 'SHOW_POPUP',
            showPopup: bool
        }
        const result = actions.showPopup(bool);
        expect(result).toEqual(expected);
    });

    it('should return a type of TOGGLE_FAVORITE with a id', () => {
        const id = 2;
        const expected = {
            type: 'TOGGLE_FAVORITE',
            id
        }
        const result = actions.toggleFavorite(id);
        expect(result).toEqual(expected);
    });

    it('should return a type of ADD_FAVORITE with an id', () => {
        const id = 7;
        const expected = {
            type: 'ADD_FAVORITE',
            id
        }
        const result = actions.addFavorite(id);
        expect(result).toEqual(expected);
    });

    it('should return a type of REMOVE_FAVORITE with an id', () => {
        const id = 6;
        const expected = {
            type: 'REMOVE_FAVORITE',
            id
        }
        const result = actions.removeFavorite(id);
        expect(result).toEqual(expected);
    });

    it('should return type of RESET_FAVORITES', () => {
        const expected = {
            type: 'RESET_FAVORITES'
        }
        const result = actions.resetFavorites()
        expect(result).toEqual(expected);
    });
});