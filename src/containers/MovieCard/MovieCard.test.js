import React from 'react';
import { shallow } from 'enzyme';
import { MovieCard, mapStateToProps, mapDispatchToProps } from './MovieCard';
import * as Requests from '../../helpers/requests';
import { showPopup, toggleFavorite, addFavorite, removeFavorite } from '../../actions';

describe('MovieContain', () => {
  describe('MovieContain component', () => {
    let mockMovie = {
      vote_count: 3119,
      id: 297802,
      video: false,
      vote_average: 6.9,
      title: "Aquaman",
      popularity: 483.065,
      poster_path: "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
      original_language: "en",
      original_title: "Aquaman",
      backdrop_path: "/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg",
      adult: false,
      overview: "Once home to the most advanced civilization on Earth, the city of Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people -- and then the surface world. Standing in his way is Aquaman, Orm's half-human, half-Atlantean brother and true heir to the throne. With help from royal counselor Vulko, Aquaman must retrieve the legendary Trident of Atlan and embrace his destiny as protector of the deep.",
      release_date: "2018-12-07",
      isFavorite: false
    };
    let mockFavMovie = {
      vote_count: 1020,
      id: 424783,
      video: false,
      vote_average: 6.5,
      title: "Bumblebee",
      popularity: 263.575,
      poster_path: "/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg",
      original_language: "en",
      original_title: "Bumblebee",
      backdrop_path: "/hMANgfPHR1tRObNp2oPiOi9mMlz.jpg",
      adult: false,
      overview: "On the run in the year 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken. When Charlie revives him, she quickly learns this is no ordinary yellow VW bug.",
      release_date: "2018-12-15",
      isFavorite: true
    }

    let mockUser = { id: 2, name: 'Jill'};
    let mockNoUser = null;
    const mockHandleShowPopup = jest.fn();
    const mockToggleFavorite = jest.fn();
    const mockAddFavorite = jest.fn();
    const mockRemoveFavorite = jest.fn();

    beforeEach(() => {
      Requests.addFavoriteToDB = jest.fn(() => Promise.resolve({ message: "Movie was added to favorites" }));
      Requests.removeFavoriteFromDB = jest.fn(() => Promise.resolve({ status: "success"}));
    });

    it('should match the snapshot with all data passed in', () => {
      const wrapper = shallow(<MovieCard {...mockMovie} currentUser={mockUser} handleShowPopup={mockHandleShowPopup} toggleFavorite={mockToggleFavorite} addFavorite={mockAddFavorite} removeFavorite={mockRemoveFavorite} />)
      expect(wrapper).toMatchSnapshot();
    });

    describe('handleClick', () => {
      it('should call removeFavoriteFromDB with the correct params if a user is logged in and the movie is already favorited', async () => {
        const wrapper = shallow(<MovieCard {...mockFavMovie} currentUser={mockUser} handleShowPopup={mockHandleShowPopup} toggleFavorite={mockToggleFavorite} addFavorite={mockAddFavorite} removeFavorite={mockRemoveFavorite} />)
        const expectedUserId = mockUser.id;
        const expectedMovieId = mockFavMovie.id;

        await wrapper.instance().handleClick();
        expect(Requests.removeFavoriteFromDB).toHaveBeenCalledWith(expectedUserId, expectedMovieId)
      });

      it('should call removeFavorite with the correct id if a user is logged in and the movie is already favorited', async () => {
        const wrapper = shallow(<MovieCard {...mockFavMovie} currentUser={mockUser} handleShowPopup={mockHandleShowPopup} toggleFavorite={mockToggleFavorite} addFavorite={mockAddFavorite} removeFavorite={mockRemoveFavorite} />)
        const expectedMovieId = mockFavMovie.id;
        await wrapper.instance().handleClick();
        expect(mockRemoveFavorite).toHaveBeenCalledWith(expectedMovieId);
      });

      it('should call toggleFavorites with the correct id if a user is logged in and the movie is already favorited', async () => {
        const wrapper = shallow(<MovieCard {...mockFavMovie} currentUser={mockUser} handleShowPopup={mockHandleShowPopup} toggleFavorite={mockToggleFavorite} addFavorite={mockAddFavorite} removeFavorite={mockRemoveFavorite} />)
        const expectedMovieId = mockFavMovie.id;
        await wrapper.instance().handleClick();
        expect(mockToggleFavorite).toHaveBeenCalledWith(expectedMovieId)
      });

      it('should call addFavoriteToDB with the correct params if a user is logged in and the movie is not already favorited', async () => {
        const wrapper = shallow(<MovieCard {...mockMovie} currentUser={mockUser} handleShowPopup={mockHandleShowPopup} toggleFavorite={mockToggleFavorite} addFavorite={mockAddFavorite} removeFavorite={mockRemoveFavorite} />);        
        await wrapper.instance().handleClick();
        expect(Requests.addFavoriteToDB).toHaveBeenCalledWith(mockMovie.id, mockUser.id, mockMovie.title, mockMovie.poster_path, mockMovie.release_date, mockMovie.vote_average, mockMovie.overview)
      });

      it('should call addMovie with the corrct id to favorites if a user is logged in and the movie is not already favorited', async () => {
        const wrapper = shallow(<MovieCard {...mockMovie} currentUser={mockUser} handleShowPopup={mockHandleShowPopup} toggleFavorite={mockToggleFavorite} addFavorite={mockAddFavorite} removeFavorite={mockRemoveFavorite} />);        
        const expected = mockMovie.id
        await wrapper.instance().handleClick()
        expect(mockAddFavorite).toHaveBeenCalledWith(expected);
      });

      it('should call toggleFavorite with the correct id if a user is logged in and the movie is not already favorited', async () => {
        const wrapper = shallow(<MovieCard {...mockMovie} currentUser={mockUser} handleShowPopup={mockHandleShowPopup} toggleFavorite={mockToggleFavorite} addFavorite={mockAddFavorite} removeFavorite={mockRemoveFavorite} />);        
        const expected = mockMovie.id;
        await wrapper.instance().handleClick();
        expect(mockToggleFavorite).toHaveBeenCalledWith(expected);
      });

      it('should call handleShowPopup with the correct boolean if there is no user logged in', () => {
        const expected = true;
        const wrapper = shallow(<MovieCard {...mockMovie} currentUser={mockNoUser} handleShowPopup={mockHandleShowPopup} toggleFavorite={mockToggleFavorite} addFavorite={mockAddFavorite} removeFavorite={mockRemoveFavorite} />);
        wrapper.instance().handleClick();
        expect(mockHandleShowPopup).toHaveBeenCalledWith(expected);
      });
    })

  });

  describe('mapStateToProps', () => {
    it('should return an object with currentUser', () => {
      const mockState = {
        currentUser: { id: 4, name: 'Mary' },
        errorStatus: '',
        favoriteMovies: [],
        showPopup: false
      }
      const expected = {
        currentUser: { id: 4, name: 'Mary' }
      }
      const result = mapStateToProps(mockState);
      expect(result).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with a showPopup action whem handleShowPopup is called', () => {
      const mockDispatch = jest.fn();
      const bool = true;
      const actionToDispatch = showPopup(bool);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.handleShowPopup(bool);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a toggleFacorite action when toggleFavorite is called', () => {
      const mockDispatch = jest.fn();
      const movieId = 3467;
      const actionToDispatch = toggleFavorite(movieId);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.toggleFavorite(movieId);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a addFavorite action when addFavorite is called', () => {
      const mockDispatch = jest.fn();
      const movieId = 6982;
      const actionToDispatch = addFavorite(movieId);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.addFavorite(movieId);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a removeFavorite action when removeFavorite is called', () => {
      const mockDispatch = jest.fn();
      const movieId = 92893;
      const actionToDispatch = removeFavorite(movieId);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removeFavorite(movieId);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

})