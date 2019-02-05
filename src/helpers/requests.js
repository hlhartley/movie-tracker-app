import { apikey } from '../apikey';

export const fetchMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
  const response = await fetch(url);
  if (response.status >= 300) {
    throw new Error(`Error fetching: ${response.statusText}`)
  } else {
    const result = await response.json();
    return result;
  }
}

export const getUser = async (user) => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 300) {
    throw Error(`Email and Password Do Not Match: ${response.statusText}`)
  } else {
    const result = await response.json();
    return result;
  }
} 

export const getUserFavorites = async (user_id) => {
  const response = await fetch(`http://localhost:3000/api/users/${user_id}/favorites`)
  if (response.status >= 300) {
    throw Error(`Error getting favorites: ${response.statusText}`)
  } else {
    const result = response.json()
    return result
  }
}

export const createNewUser = async (user) => {

  const response = await fetch('http://localhost:3000/api/users/new', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status >= 300) {
    throw Error(`Email has already been used: ${response.statusText}`);
  } else {
    const result = await response.json();
    return result;
  }

}

export const addFavoriteToDB = async (movie_id, user_id, title, poster_path, release_date, vote_average, overview) => {
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

export const removeFavoriteFromDB = async (user_id, movie_id) => {
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