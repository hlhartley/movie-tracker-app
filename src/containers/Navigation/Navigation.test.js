import React from 'react';
import { Navigation, mapStateToProps, mapDispatchToProps } from './Navigation';
import { shallow } from 'enzyme';
import { logoutUser, toggleFavorite, resetFavorites } from '../../actions';
import { mockMovieData } from '../../__fixtures__/mockData';

describe('Navigation', () => {

    describe('Navigation component', () => {
        let wrapper;
        const mockLogoutUser = jest.fn();
        const mockToggleFavorite = jest.fn();
        const mockResetFavorites = jest.fn();
        beforeEach(() => {
            wrapper = shallow(<Navigation 
                logoutUser={mockLogoutUser} 
                toggleFavorite={mockToggleFavorite} 
                resetFavorites={mockResetFavorites}
                favoriteMovies={mockMovieData}
            />)
        })

        it('should match the snapshot', () => {
            expect(wrapper).toMatchSnapshot()
        })

        it('should toggleFavorite and resetFavorites when handleLogout is called and there are favorite movies', () => {
            wrapper.setProps({favoriteMovies: []})
            const toggleFavoriteSpy = jest.spyOn(wrapper.instance().props, 'toggleFavorite')
            const resetFavoritesSpy = jest.spyOn(wrapper.instance().props, 'resetFavorites')
            wrapper.instance().handleLogout()
            expect(toggleFavoriteSpy).toHaveBeenCalledTimes(0)
            expect(resetFavoritesSpy).toHaveBeenCalledTimes(0)

            wrapper.setProps({favoriteMovies: mockMovieData})
            wrapper.instance().handleLogout()
            expect(toggleFavoriteSpy).toHaveBeenCalledTimes(3)
            expect(resetFavoritesSpy).toHaveBeenCalledTimes(1)
        })

        it('should handleLogout and call logoutUser', () => {
            const spy = jest.spyOn(wrapper.instance().props, 'logoutUser')
            wrapper.instance().handleLogout()
            expect(spy).toHaveBeenCalled()
        })
    });

    describe('mapStateToProps', () => {
        it('should return an object with a currentUser and favoriteMovies', () => {
            const mockState = {
                currentUser: null,
                favoriteMovies: [],
                errorStatus: '',
            }
            const expected = {
                currentUser: null,
                favoriteMovies: [],
            }

            const mappedProps = mapStateToProps(mockState);
            expect(mappedProps).toEqual(expected);
        });
    });
    
    describe('mapDispatchToProps', () => {
        it('should call dispatch with a logoutUser action when logoutUser is called', () => {
            const mockDispatch = jest.fn();
            const actionToDispatch = logoutUser();
            const mappedProps = mapDispatchToProps(mockDispatch);
            mappedProps.logoutUser();
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
        });

        it('should call dispatch with a toggleFavorite action when toggleFavorite is called', () => {
            const mockDispatch = jest.fn();
            const id =1;
            const actionToDispatch = toggleFavorite(id);
            const mappedProps = mapDispatchToProps(mockDispatch);
            mappedProps.toggleFavorite(id);
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
        });

        it('should call dispatch with a resetFavorites action when resetFavorites is called', () => {
            const mockDispatch = jest.fn();
            const actionToDispatch = resetFavorites();
            const mappedProps = mapDispatchToProps(mockDispatch);
            mappedProps.resetFavorites();
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
        });
    });
})