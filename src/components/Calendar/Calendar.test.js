import React from 'react';
import { shallow } from 'enzyme';

import Calender from './Calendar'

describe('<Calender />', () => {
  const stubProps = {
    year: 2020,
    month: 10,
    clickDone: true,
    todos: [{
      year: 2020,
      month: 9,
      date: 1,
      done: true
    }]
  }


  it('should render without errors', () => {
    const component = shallow(<Calender {...stubProps} />);
    const wrapper = component.find('.Calendar');
    expect(wrapper.length).toBe(1);
  });

  it('should render with click undone', () => {
    const newStubProps = {...stubProps, clickDone: false}
    const component = shallow(<Calender {...newStubProps } />);
    const wrapper = component.find('.Calendar');
    expect(wrapper.length).toBe(1);
  });
})