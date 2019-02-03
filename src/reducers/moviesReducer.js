export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIES':
      const movies = action.movies.map((movie) => {
        return {...movie, isFavorite: false }
      })
      return [...state, ...movies];
    case 'TOGGLE_FAVORITE':
      let updatedMovies = state.map(movie => {
        if (movie.id === action.id) {
          movie.isFavorite = !movie.isFavorite
        }
        return movie;
      });
      return updatedMovies;
    
    default:
      return state;
  }
}