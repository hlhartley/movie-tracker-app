import { Login, mapStateToProps, mapDispatchToProps } from './Login';
import { shallow } from 'enzyme';
import { updateError, loginUser, toggleFavorite, addFavorite } from '../../actions';
import React from 'react';
import { mockMovies } from '../../__fixtures__/mockData';
import * as Requests from '../../helpers/requests'


describe('Login', () => {
  
  describe('Login component', () => {
    let wrapper;
    const mockLoginUser = jest.fn();
    const mockUpdateError = jest.fn();
    const mockToggleFavorite = jest.fn();
    const mockAddFavorite = jest.fn();
    const mockUser = { data: { id: 2, name: 'John' } }
    const mockFavoritesData = { data: [{ movie_id: '123' }, { movie_id: '456' }] }

    beforeEach(() => {
      let props = {
        currentUser: null, 
        errorStatus: '',
      }

      wrapper = shallow(<Login {...props} loginUser={mockLoginUser} updateError={mockUpdateError} toggleFavorite={mockToggleFavorite} addFavorite={mockAddFavorite}/>)
      
      Requests.getUser = jest.fn(() => Promise.resolve(mockUser));
      Requests.getUserFavorites = jest.fn(() => Promise.resolve(mockFavoritesData));
    })

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    });

    it('should have a default state', () => {
      const expected = {
        email: '',
        password: ''
      }

      expect(wrapper.state()).toEqual(expected);
    });

    it('should handleChange from the email input', () => {
      const mockEvent = {
        target: {
          name: 'email',
          value: 'Lee@gmail.com'
        }
      }
      const expected = 'Lee@gmail.com'
      wrapper.find('#email').simulate('change', mockEvent)
      expect(wrapper.state('email')).toEqual(expected)
    });

    it('should handleChange from the password input', () => {
      const mockEvent = {
        target: {
          name: 'password',
          value: 'abc'
        }
      }
      const expected = 'abc'
      wrapper.find('#password').simulate('change', mockEvent)
      expect(wrapper.state('password')).toEqual(expected)
    });

    it('should handleSubmit, clearing any previous error messages', () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }
      wrapper.find('form').simulate('submit', mockEvent)
      expect(mockUpdateError.mock.calls.length).toBe(1)
      expect(mockUpdateError).toHaveBeenCalledWith('')
    });
    
    it('should should call getUser with the correct params', async () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }

      const mockState = {
        email: 'john@me.com',
        password: 'pass@word'
      }
      wrapper.setState(mockState);
      await wrapper.instance().handleSubmit(mockEvent);
      expect(Requests.getUser).toHaveBeenCalledWith(mockState);
    });

    it('should call getUserFavorites with the correct params', async () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }
      const expected = mockUser.data.id;
      await wrapper.instance().handleSubmit(mockEvent);
      expect(Requests.getUserFavorites).toHaveBeenCalledWith(expected);
    });

    it('should handlefavorites with correct params if everying is okay with getUserFavorites', async () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }
      const expected = [{ movie_id: '123' }, { movie_id: '456' }]
      const spy = jest.spyOn(wrapper.instance(), 'handleFavorites')
      wrapper.instance().forceUpdate()
      await wrapper.instance().handleSubmit(mockEvent)
      expect(spy).toHaveBeenCalledWith(expected)
    });


    it('should login user with correct params if everything is ok with getUser', async () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }
      const expectedId = 2
      const expectedName = 'John'
    
      wrapper.find('form').simulate('submit', mockEvent)
      await expect(mockLoginUser).toHaveBeenCalledWith(expectedId, expectedName)
    });

    it('should updateError if everything is not okay with getUser', async () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }

      Requests.getUser.mockImplementation(() => {
        throw Error('Email and Password Do Not Match: 500')
      })
      await wrapper.instance().handleSubmit(mockEvent)
      expect(mockUpdateError).toHaveBeenCalledWith('Email and Password Do Not Match: 500');
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with an error status and current user', () => {
      const mockState = {
        movies: mockMovies,
        currentUser: null,
        errorStatus: ''
      }
      const expected = {
        currentUser: null,
        errorStatus: '' 
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapStateToDispatch', () => {
    it('should call dispatch with a loginUser action when loginUser is called', () => {
      const mockDispatch = jest.fn();
      const id =1;
      const name = 'John';
      const actionToDispatch = loginUser(id, name);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.loginUser(id, name);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with an updateError action when updateError is called', () => {
      const mockDispatch = jest.fn();
      const message = 'An error happened';
      const actionToDispatch = updateError(message);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateError(message);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with toggleFavorite action when toggleFavorite is called', () => {
      const mockDispatch = jest.fn();
      const id = 3;
      const actionToDispatch = toggleFavorite(id);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.toggleFavorite(id);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });

    it('should call dispatch with addFavorite action when addFavorite is called', () => {
      const mockDispatch = jest.fn();
      const id = 4;
      const actionToDispatch = addFavorite(id);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addFavorite(id);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
})