import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    let wrapper = component.find('.sunday');
    expect(wrapper.length).toBe(1);
  });

  it('should push dates without errors', () => {
    const component = shallow(<Calendar year={2020} month={10} todos={[]} />);
    const wrapper = component.find('.date');
    expect(wrapper.length).toBe((new Date(2020,10,0)).getDate());
  });

  it('should render todo as done if done = true', () => {
    const component = shallow(<Calendar year={2020} month={10} todos={[{id: 1, year: 2020, month: 10, date: 20, title: "Um", done: true}]} />);
    let wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(1);
  });
});
