const mockFavorites = {
  data: [{movie_id: '123'}, {movie_id: '456'}]
}
export const getUserFavorites = jest.fn().mockImplementation(() => Promise.resolve(mockFavorites))