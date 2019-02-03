export const removeFavorite = async (user_id, movie_id) => {
  const response = await fetch(`http://localhost:3000/api/users/${user_id}/favorites/${movie_id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      user_id,
      movie_id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 300) {
    throw Error(`Error removing favorite: ${response.statusText}`)
  } else {
    const result = response.json();
    return result;
  }
}