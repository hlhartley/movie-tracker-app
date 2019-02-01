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

export const createNewUser = async (user) => {
  
  const response =  await fetch('http://localhost:3000/api/users/new', {
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