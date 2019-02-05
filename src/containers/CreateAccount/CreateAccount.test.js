import React from 'react';
import { CreateAccount, mapStateToProps, mapDispatchToProps} from './CreateAccount';
import { shallow } from 'enzyme';
import { updateError, loginUser } from '../../actions';
import { mockMovies } from '../../__fixtures__/mockData';
import * as Requests from '../../helpers/requests';
import { validator } from '../../helpers/validators';

describe('CreateAccount', () => {
  describe('CreateAccount component', () => {
    let wrapper;
    const mockLoginUser = jest.fn();
    const mockUpdateError = jest.fn();
    const mockReturnedUser = { id: 5 }
    
    beforeEach(() => {
      let props = {
        currentUser: null,
        errorStatus: ''
      }
      
      wrapper = shallow(<CreateAccount {...props} loginUser={mockLoginUser} updateError={mockUpdateError}/>)
      Requests.createNewUser = jest.fn().mockImplementation(() => Promise.resolve(mockReturnedUser));
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    });

    it('should have a default state', () => {
      const expected = {
        name: '',
        email: '',
        password: '',
      }
      expect(wrapper.state()).toEqual(expected);
    });

    it('should handleChange from the name input', () => {
      const mockEvent = {
        target: {
          name: 'name',
          value: 'Lee'
        }
      }
      const expected = 'Lee'
      wrapper.find('#name').simulate('change', mockEvent)
      expect(wrapper.state('name')).toEqual(expected)
    });

    it('should handleChange from the email input', () => {
      const mockEvent = {
        target: {
          name: 'email',
          value: 'lee@turing.com'
        }
      }
      const expected = 'lee@turing.com'
      wrapper.find('#email').simulate('change', mockEvent)
      expect(wrapper.state('email')).toEqual(expected)
    });

    it('should handleChange from the password input', () => {
      const mockEvent = {
        target: {
          name: 'password',
          value: 'passW@rd'
        }
      }
      const expected = 'passW@rd'
      wrapper.find('#password').simulate('change', mockEvent)
      expect(wrapper.state('password')).toEqual(expected)
    });

    it('should call createNewUser with the correct params', async () => {
      const mockUser = {
        name: 'Sarah',
        email: 'sar3@gmail.com',
        password: 's@rat',
      }
      wrapper.setState(mockUser);
      await wrapper.instance().handleSubmit();
      expect(Requests.createNewUser).toHaveBeenCalledWith(mockUser);

    });

    it('should handleSubmit and login user if everything is okay with createNewUser', async () => {
      const newUserName = 'Sarah'
      wrapper.setState({
        name: newUserName,
        email: 'sar3@gmail.com',
        password: 's@rat',
      });
      await wrapper.instance().handleSubmit();
      expect(mockLoginUser).toHaveBeenCalledWith(5, 'Sarah');
    });

    it('should call updateError with an error message if everything is not okay with createNewUser', async () => {
      Requests.createNewUser = jest.fn(() => {
        throw Error('Email has already been used')
      });

      await wrapper.instance().handleSubmit();
      expect(mockUpdateError).toHaveBeenCalledWith('Email has already been used');
    });

    it('should validateInput and if there are no issues with name email or password will call handleSubmit', () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }

      wrapper.setState({
        name: 'Joe',
        email: 'joe5@gmail.com',
        password: 'joespaSS',
      });
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleSubmit');
      wrapper.instance().validateInput(mockEvent);
      expect(instance.handleSubmit).toHaveBeenCalled();
    });

    it('should validateInput and if anything is wrong with name email or password will call updateError', () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }
      const expected = 'Input not successful';

      wrapper.setState({
        name: 'Joe',
        email: 'joe5@',
        password: 'joespaSS',
      });

      wrapper.instance().validateInput(mockEvent);
      expect(mockUpdateError).toHaveBeenCalledWith(expected);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with an error status', () => {
      const mockState = {
        movie: mockMovies,
        currentUser: {
          id: 2,
          name: 'Sarah'
        },
        errorStatus: ''
      }

      const expected = {
        currentUser: {
          id: 2,
          name: 'Sarah'
        },
        errorStatus: ''
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with a loginUser action when loginUser is called', () => {
      const mockDispatch = jest.fn();
      const id = 3;
      const name = 'Sarah'
      const actionToDispatch = loginUser(id, name);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.loginUser(id, name);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with an updateError action when updateError is called', () => {
      const mockDispatch = jest.fn();
      const message = 'Error creating account';
      const actionToDispatch = updateError(message);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.updateError(message);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });
});