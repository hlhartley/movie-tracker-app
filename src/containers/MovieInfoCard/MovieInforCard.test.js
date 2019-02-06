import React from 'react'; 
import { shallow } from 'enzyme';
import { MovieInfoCard } from './MovieInfoCard';

describe('MovieInfoCard', () => {
  it('should match the wrapper with all data passed in', () => {
    const mockMovie = {
      id: 375588,
      title: "Robin Hood",
      poster_path: "/AiRfixFcfTkNbn2A73qVJPlpkUo.jpg",
      overview: "A war-hardened Crusader and his Moorish commander mount an audacious revolt against the corrupt English crown.",
      release_date: "2018-11-20",
    }
    const wrapper = shallow(<MovieInfoCard {...mockMovie}/>);
    expect(wrapper).toMatchSnapshot();
  });
});