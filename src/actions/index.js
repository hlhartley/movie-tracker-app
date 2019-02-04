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

export const addFavorite = (id) => ({
  type: 'ADD_FAVORITE',
  id
});

export const removeFavorite = (id) => ({
  type: 'REMOVE_FAVORITE',
  id
})

export const resetFavorites = () => ({
  type: 'RESET_FAVORITES'
})
