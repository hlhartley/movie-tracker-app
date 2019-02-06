import React from 'react';
import { shallow } from 'enzyme';
import { Popup, mapDispatchToProps } from './Popup';
import { showPopup } from '../../actions';

describe('Popup', () => {
    describe('Popup component', () => {
        let wrapper;
        const mockShowPopup = jest.fn()
        const bool = false

        beforeEach(() => {
            wrapper = shallow(<Popup showPopup={mockShowPopup}/>)
        })

        it('should match the snapshot with all data passed in', () => {
            expect(wrapper).toMatchSnapshot()
        })

        it('should call showPopup with false when Create Account is clicked', () => {
            wrapper.find('button.create-account-btn').simulate('click')
            expect(mockShowPopup).toHaveBeenCalledWith(bool)
        })

        it('should call showPopup with false when Already a user? Login is clicked', () => {
            wrapper.find('button.login-btn').simulate('click')
            expect(mockShowPopup).toHaveBeenCalledWith(bool)
        })

        it('should call showPopup with false when the x button is clicked', () => {
            wrapper.find('i').simulate('click')
            expect(mockShowPopup).toHaveBeenCalledWith(bool)
        })

    })

    describe('mapDispatchToProps', () => {
        it('should call dispatch with a showPopup action when showPopup is called', () => {
            const mockDispatch = jest.fn()
            const bool = true;
            const actionToDispatch = showPopup(bool)
            const mappedProps = mapDispatchToProps(mockDispatch)
            mappedProps.showPopup(bool)
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
        })
    })
})
