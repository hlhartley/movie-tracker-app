import { userReducer } from './userReducer';
import * as actions from '../actions';

describe('userReducer', () => {
  it('should return the initial state', () => {
    const expected = null;
    const result = userReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return the state with a name and id', () => {
    const id = 6;
    const name = 'Grace';
    const initialState = null;
    const expected = { id, name };
    const result = userReducer(initialState, actions.loginUser(id, name));
    expect(result).toEqual(expected);
  });

  it('should return the state with null', () => {
    const expected = null;
    const initialState = { id: 5, name: 'George'};
    const result = userReducer(initialState, actions.logoutUser());
    expect(result).toEqual(expected);
  });
});