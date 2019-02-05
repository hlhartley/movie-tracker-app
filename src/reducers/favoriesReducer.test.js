import { favoritesReducer } from './favoritesReducer';
import * as actions from '../actions';

describe('favoritesReducer', () => {
  it('should return the initial state', () => {
    const expected = [];
    const result = favoritesReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return the state with a new favorite', () => {
    const movieId = 4586;
    const initialState = [];
    const expected = [movieId];
    const result = favoritesReducer(initialState, actions.addFavorite(movieId));
    expect(result).toEqual(expected);
  });

  it('should return the state with the correct favorite removed', () => {
    const movieId = 342;
    const initialState = [564, movieId];
    const expected = [564];
    const result = favoritesReducer(initialState, actions.removeFavorite(movieId));
    expect(result).toEqual(expected);
  });

  it('should return the state with an empty array', () => {
    const expected = [];
    const initialState = [345, 678, 987];
    const result = favoritesReducer(initialState, actions.resetFavorites());
    expect(result).toEqual(expected);
  });
})