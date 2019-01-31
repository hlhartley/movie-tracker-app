import { apikey } from '../apikey';
import { createCipher } from 'crypto';

export const fetchMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
  const response = await fetch(url);
  if (response.status >= 300) {
    throw new Error(`Error fetching, code: ${response.status}`)
  } else {
    return response.json();
  }
}
export const createNewUser = async (user) => {
  try {
    await fetch('http://localhost:3000/api/users/new', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch(error) {
    console.log(error.message, error.status)  
  }
}
export const loginUser = async (user) => {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch(error) {
    console.log(error.message, error.status)
  }
} 