export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIES':
      const movies = action.movies.map((movie) => {
        return {...movie, isFavorite: false }
      })
      return [...state, ...movies];
    default:
      return state;
  }
}