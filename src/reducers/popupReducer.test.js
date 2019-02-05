import * as actions from '../actions';
import { popupReducer } from './popupReducer';

describe('popupReducer', () => {
  it('should return the initial state', () => {
    const expected = false;
    const result = popupReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return the state with the correct boolean', () => {
    const bool = true;
    const expected = bool;
    const initialState = false;
    const result = popupReducer(initialState, actions.showPopup(bool));
    expect(result).toEqual(expected);
  });
});