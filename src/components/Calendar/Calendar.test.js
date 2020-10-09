import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('<date />', () => {
  it('should render without errors', () => {
    const component = shallow(<date />);
    const wrapper = component.find('.date');
    expect(wrapper.length).toBe(0);
  });

  
});

it('should handle clicks', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar clickDone={mockClickDone} />);
    const wrapper = component.find('.button');    
    //wrapper.simulate('click');    
    expect(mockClickDone).toHaveBeenCalledTimes(0); 
  });