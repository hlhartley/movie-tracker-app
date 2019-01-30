import { apikey } from '../apikey';

export const fetchMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
  const response= await fetch(url);
  if (response.status >= 300) {
    throw new Error(`Error fetching', code: ${response.status}`)
  } else {
    return response.json();
  }
}