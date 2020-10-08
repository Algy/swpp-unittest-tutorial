import React from 'react';
import {shallow} from 'enzyme';
import Calendar from "./Calendar";

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(
      <Calendar
        year={2020}
        month={10}
        todos={[{year: 2020, month: 10, date: 1, done: false}]}
      />
    );
    // const wrapper = component.find('.header');
    // expect(wrapper.length).toBe(1);
  });
})
