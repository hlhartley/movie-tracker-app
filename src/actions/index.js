export const addMovies = (movies) => ({
  type: 'ADD_MOVIES',
  movies
});

export const loginUser = (id, name) => ({
  type: 'LOGIN_USER',
  id,
  name
});

export const updateError = (message) => ({
  type: 'UPDATE_ERROR',
  message
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});

export const showPopup = (bool) => ({
  type: 'SHOW_POPUP',
  showPopup: bool
});

export const toggleFavorite = (id) => ({
  type: 'TOGGLE_FAVORITE',
  id
});
