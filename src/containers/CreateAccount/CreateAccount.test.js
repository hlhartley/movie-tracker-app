import React from 'react';
import { CreateAccount, mapStateToProps, mapDispatchToProps} from './CreateAccount';
import { shallow } from 'enzyme';
import { updateError, loginUser } from '../../actions';
import { mockMovies } from '../../__fixtures__/mockData';
import { createNewUser } from '../../helpers/createNewUser';
import { validator } from '../../helpers/validators';

jest.mock('../../helpers/createNewUser.js');

describe('CreateAccount', () => {
  describe('CreateAccount component', () => {
    let wrapper;
    const mockLoginUser = jest.fn();
    const mockUpdateError = jest.fn();

    beforeEach(() => {
      let props = {
        currentUser: null,
        errorStatus: ''
      }

      wrapper = shallow(<CreateAccount {...props} loginUser={mockLoginUser} updateError={mockUpdateError}/>)
    });

    it.skip('should match the snapshot', () => {
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

    it.skip('should handleSubmit and login user if everything is okay with createNewuser', async () => {
      const newUserName = 'Sarah'
      wrapper.setState({
        name: newUserName,
        email: 'sar3@gmail.com',
        password: 's@rat',
      });
      wrapper.instance().handleSubmit();
      await expect(mockLoginUser).toHaveBeenCalledWith(5, 'Sarah');

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

      wrapper.setState({
        name: 'Joe',
        email: 'joe5@',
        password: 'joespaSS',
      });

      wrapper.instance().validateInput(mockEvent);
      expect(mockUpdateError).toHaveBeenCalled();
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