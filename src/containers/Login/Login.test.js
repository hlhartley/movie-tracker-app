import { Login, mapStateToProps, mapDispatchToProps } from './Login';
import { shallow } from 'enzyme';
import { updateError, loginUser } from '../../actions';
import React from 'react';
import { getUser } from '../../helpers/getUser';
import { mockMovies } from '../../__fixtures__/mockData';

jest.mock('../../helpers/getUser.js')

describe('Login', () => {
  
  describe('Login component', () => {
    let wrapper;
    const mockLoginUser = jest.fn();
    const mockUpdateError = jest.fn()
    
    beforeEach(() => {
      let props = {
        currentUser: null, 
        errorStatus: '',
      }


      wrapper = shallow(<Login {...props} loginUser={mockLoginUser} updateError={mockUpdateError}/>)
    })

    it.skip('should match the snapshot', () => {
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

    it('should login user with correct params if everything is ok with getUser', async () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }

      const expectedId = 2
      const expectedName = 'John'
    
      wrapper.find('form').simulate('submit', mockEvent)
      await expect(mockLoginUser).toHaveBeenCalledWith(expectedId, expectedName)
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
  });
})