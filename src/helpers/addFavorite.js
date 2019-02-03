export const addFavorite = async (movie_id, user_id, title, poster_path, release_date, vote_average, overview) => {
  const response = await fetch('http://localhost:3000/api/users/favorites/new', {
    method: 'POST',
    body: JSON.stringify({
      movie_id, 
      user_id, 
      title, 
      poster_path, 
      release_date, 
      vote_average, 
      overview
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 300) {
    throw Error(`Error saving to favorites: ${response.statusText}`);
  } else {
    const result = await response.json();
    return result;
  }
}