import * as Requests from './requests';
import { apikey } from '../apikey';
import { shallow } from 'enzyme';
import { mockMovieData } from '../__fixtures__/mockData';

describe('requests', () => {
  describe('fetchMovies', () => {

    beforeEach(() => {
      window.fetch = jest.fn();
    });

    it('should make a fetch request when fetchMovies is invoked', () => {
      let mockUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;

      Requests.fetchMovies();
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

      const result = await Requests.fetchMovies();
      expect(result).toEqual(expected);
    });

    it('should return an error is everything is not okay', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 404,
        statusText: 'Not found'
      }));

      const expected = Error('Error fetching: Not found');
      await expect(Requests.fetchMovies()).rejects.toEqual(expected)
    });
  });

  describe('getUser', () => {
    
    const mockUser = {
      email: 'tman2272@aol.com',
      password: 'password',
    }

    beforeEach(() => {
      window.fetch = jest.fn();
    });

    it('should call fetch with the correct params', () => {
      const expectedUrl = 'http://localhost:3000/api/users';
      const expectedOptions = {
        method: 'POST',
        body: JSON.stringify(mockUser),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      Requests.getUser(mockUser);
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
    });

    it('should return data with user information if everything is okay', async () => {
      const expected = {
        data: {
          email: "tman2272@aol.com",
          id: 1,
          name: "Taylor",
          password: "password",
        }
      }

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(expected),
        status: 200,
      }));

      const result = await Requests.getUser(mockUser);
      expect(result).toEqual(expected);
    });

    it('should return an error if everything is not okay', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 404,
        statusText: 'Internal Server Error'
      }));
      const expected = Error('Email and Password Do Not Match: Internal Server Error');
      await expect(Requests.getUser(mockUser)).rejects.toEqual(expected);
    });
  });

  describe('getUserFavorites', () => {
    const mockUserId = 1;
    beforeEach(() => {
      window.fetch = jest.fn();
    });

    it('should call fetch with the correct url', () => {
      const expected = `http://localhost:3000/api/users/${mockUserId}/favorites`
      Requests.getUserFavorites(mockUserId);
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should return data with an array of the users favorites if everything is okay', async () => {
      const expected = {
        data: mockMovieData 
      }
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(expected)
      }));
      const result = await Requests.getUserFavorites(mockUserId);
      expect(result).toEqual(expected);
    });
    
    it('should return an error if everything is not okay', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 300,
        statusText: 'Internal Server Error'
      }));

      const expected = Error('Error getting favorites: Internal Server Error');
      await expect(Requests.getUserFavorites(mockUserId)).rejects.toEqual(expected);
    });
  });

  describe('createNewUser', () => {
    const mockUser = {
      name: 'Sam',
      email: 'sam@ymail.com',
      password: 'samisCool',
    }

    beforeEach(() => {
      window.fetch = jest.fn();
    });

    it('should call fetch with the correct url and params', () => {
      const expectedUrl = 'http://localhost:3000/api/users/new';
      const expectedOptions = {
        method: 'POST',
        body: JSON.stringify(mockUser),
          headers: {
        'Content-Type': 'application/json'
        }
      }
      Requests.createNewUser(mockUser);
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
    });

    it('should return data with a success message and user id if everything is okay', async () => {
      const expected = {
        id: 14,
        message: "New user created",
        status: "success",
      }

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(expected)
      }));

      const result = await Requests.createNewUser(mockUser);
      expect(result).toEqual(expected);
    });

    it('should throw an error is everything is not okay', async () => {
      const expected = Error('Email has already been used: Internal Server Error');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 300,
        statusText: 'Internal Server Error'
      }));
      await expect(Requests.createNewUser(mockUser)).rejects.toEqual(expected);
    });
  });

  describe('addFavoritesToDB', () => {
    const mockMovie_id = 297802;
    const mockUser_id = 2;
    const mockTitle = "Aquaman";
    const mockPoster_path = "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg";
    const mockRelease_date = "2018-12-07";
    const mockVote_average = 6.9;
    const mockOverview = "Once home to the most advanced civilization on Earth, the city of Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people -- and then the surface world. Standing in his way is Aquaman, Orm's half-human, half-Atlantean brother and true heir to the throne. With help from royal counselor Vulko, Aquaman must retrieve the legendary Trident of Atlan and embrace his destiny as protector of the deep.";

    beforeEach(() => {
      window.fetch = jest.fn();
    });

    it('should call fetch with the correct url and options', () => {
      const expectedUrl = 'http://localhost:3000/api/users/favorites/new';
      const expectedOptions = {
        method: 'POST',
        body: JSON.stringify({
          movie_id: mockMovie_id,
          user_id: mockUser_id,
          title: mockTitle,
          poster_path: mockPoster_path,
          release_date: mockRelease_date,
          vote_average: mockVote_average,
          overview: mockOverview
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      Requests.addFavoriteToDB(mockMovie_id, mockUser_id, mockTitle, mockPoster_path, mockRelease_date, mockVote_average, mockOverview);
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
    });

    it('shoulld return data with a success message if everything is okay', async () => {
      const expected = {
        id: 14,
        message: "Movie was added to favorites",
        status: "success",
      }

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(expected)
      }));

      const result = await Requests.addFavoriteToDB(mockMovie_id, mockUser_id, mockTitle, mockPoster_path, mockRelease_date, mockVote_average, mockOverview);
      expect(result).toEqual(expected);
    });

    it('should return an error if everything is not okay', async () => {
      const expected = Error('Error saving to favorites: Internal Server Error');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500,
        statusText: 'Internal Server Error'
      }));
      await expect(Requests.addFavoriteToDB(mockMovie_id, mockUser_id, mockTitle, mockPoster_path, mockRelease_date, mockVote_average, mockOverview)).rejects.toEqual(expected);
    });
  });

  describe('removeFavoritesFromDB', () => {
    const mockUserId = 3;
    const mockMovieId = 48574;

    beforeEach(() => {
      window.fetch = jest.fn();
    });

    it('should call fetch with the correct url and options', () => {
      const expectedUrl = `http://localhost:3000/api/users/${mockUserId}/favorites/${mockMovieId}`;
      const expectedOptions = {
        method: 'DELETE',
        body: JSON.stringify({
          user_id: mockUserId,
          movie_id: mockMovieId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      Requests.removeFavoriteFromDB(mockUserId, mockMovieId);
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
    });

    it('should return data with a success message that the favorite has been deleted', async() => {
      const expected = {
        message: "1 row was deleted.",
        status: "success"
      };
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(expected)
      }));

      const result = await Requests.removeFavoriteFromDB(mockUserId, mockMovieId);
      expect(result).toEqual(expected);
    });

    it('should return an error is everything is not okay', async() => {
      const expected = Error('Error removing favorite: Internal Server Error');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500,
        statusText: 'Internal Server Error'
      }));

      await expect(Requests.removeFavoriteFromDB(mockUserId, mockMovieId)).rejects.toEqual(expected);
    });
  });
});