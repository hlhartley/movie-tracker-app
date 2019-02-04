import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import { userReducer } from './userReducer';
import { errorReducer } from './errorReducer';
import { popupReducer } from './popupReducer';
import { favoritesReducer } from './favoritesReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  currentUser: userReducer,
  errorStatus: errorReducer,
  showPopup: popupReducer,
  favoriteMovies: favoritesReducer,
});

export default rootReducer;