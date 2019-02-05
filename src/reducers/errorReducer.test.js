import { errorReducer } from './errorReducer';
import * as actions from '../actions'

describe('errorReducer', () => {
  it('should return the initial state', () => {
    const expected = '';
    const result = errorReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return the state with an error message', () => {
    const initialState = '';
    const errorMessage = 'Error: password and email do not match';
    const result = errorReducer(initialState, actions.updateError(errorMessage));
    expect(result).toEqual(errorMessage);
  });
});