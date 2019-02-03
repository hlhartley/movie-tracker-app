const mockReturnedUser = {
  id: 5
}
export const createNewUser = jest.fn().mockImplementation(() => Promise.resolve(mockReturnedUser));