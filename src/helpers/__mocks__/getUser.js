const mockUser = {
    data: {
        id: 2,
        name: 'John'
    }
}

export const getUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))