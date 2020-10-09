import React from 'react';
import { shallow, mount } from 'enzyme';

import Calendar from './Calendar';

describe('<Calendar />', () => {
  it('should display a single todo with good contents', () => {
    const year = 2020, month = 10;
    const stubTodos = [
      {year: year, month: month-1,
        id: 0, date: 8, done: false, title: 'todoA'},
    ];

    const component = mount(<Calendar
      todos={stubTodos} year={year} month={month} clickDone={()=>{}} />);

    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toEqual('todoA');
  });

  it('should display multiple todos', () => {
    const year = 2020, month = 10;
    const stubTodos = [
      {year: year, month: month-1,
        id: 0, date: 8, done: false, title: 'todoA'},
      {year: year, month: month-1,
        id: 1, date: 9, done: true, title: 'todoB'},
      {year: year, month: month-1,
        id: 2, date: 10, done: false, title: 'todoC'},
    ];

    const component = shallow(<Calendar
      todos={stubTodos} year={year} month={month} clickDone={()=>{}} />);

    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(stubTodos.length);
  });

  it('should display boundary days well (for shorter months)', () => {
    const year = 2020, month = 9;
    const stubTodos = [
      {year: year, month: month-1,
        id: 0, date: 30, done: false, title: 'todoA'},
    ];

    const component = shallow(<Calendar
      todos={stubTodos} year={year} month={month} clickDone={()=>{}} />);

    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(stubTodos.length);
  });

  it('should display boundary days well (for longer months)', () => {
    const year = 2020, month = 10;
    const stubTodos = [
      {year: year, month: month-1,
        id: 0, date: 31, done: false, title: 'todoA'},
    ];

    const component = shallow(<Calendar
      todos={stubTodos} year={year} month={month} clickDone={()=>{}} />);

    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(stubTodos.length);
  });

});

