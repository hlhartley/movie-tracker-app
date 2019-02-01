import { fetchMovies } from './requests';
import { apikey } from '../apikey';
import { shallow } from 'enzyme';
import { mockMovieData } from '../__fixtures__/mockData';

describe('fetchMovies', () => {
  
  beforeEach(() => {
    window.fetch = jest.fn();
  });

  it('should make a fetch request when fetchMovies is invoked', () => {
    let mockUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
    
    fetchMovies();
    expect(window.fetch).toHaveBeenCalledWith(mockUrl);
  });

  it('should get movies if everything is okay', async () => {
    const expected = {
      results: mockMovieData
    }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(expected),
      status: 200
      }));

    const result = await fetchMovies();
    expect(result).toEqual(expected);
  });

  it('should return an error is everything is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 404,
      statusText: 'Not found'
    }));

    const expected = Error('Error fetching: Not found');
    await expect(fetchMovies()).rejects.toEqual(expected)
  });
});