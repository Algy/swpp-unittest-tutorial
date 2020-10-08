import React from 'react';
import {shallow, mount} from 'enzyme';
import Calendar from "./Calendar";

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(
      <Calendar
        year={2020}
        month={10}
        todos={[{id:0,year: 2020, month: 9, date: 1, done: false},{id:1,year: 2020, month: 9, date: 1, done: true}]}
        clickDone={(e)=>{}}
      />
    );
    const wrapper = component.find('.notdone');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click without errors', () => {
    const mc = jest.fn();
    const component = shallow(
      <Calendar
        year={2020}
        month={10}
        todos={[{id:0,year: 2020, month: 9, date: 1, done: false},{id:1,year: 2020, month: 9, date: 1, done: true}]}
        clickDone={mc}
      />
    );
    const wrapper = component.find('.todoTitle').at(0);
    wrapper.simulate('click')
    expect(mc).toHaveBeenCalledTimes(1);
  });
})
