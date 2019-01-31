import { combineReducers } from 'redux';
import { moviesReducer } from './moviesReducer';
import { userReducer } from './userReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  currentUser: userReducer,
  errorStatus: errorReducer,
});

export default rootReducer;