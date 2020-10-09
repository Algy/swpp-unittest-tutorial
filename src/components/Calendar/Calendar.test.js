import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';


const mockTodos = [
    {
        id: 1, title: 'TEST_TITLE_1', done: true,
        year: 2019,
        month: 9,
        date: 1,
    },
    {
        id: 2, title: 'TEST_TITLE_2', done: false,
        year: 2019,
        month: 9,
        date: 2,
    },
    {
        id: 3, title: 'TEST_TITLE_3', done: true,
        year: 2019,
        month: 10,
        date: 1,
    }
];

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.CalendarTable');
    expect(wrapper.length).toBe(1);
  });

  it('should render table without errors', () => {
    const component = shallow(<Calendar />);
    let wrapper = component.find("Table");
    expect(wrapper.length).toBe(1);
  });

  it('should render done for true', () => {
    const component = shallow(<Calendar year={2019} month={10} todos={mockTodos}/>);
    let wrapper = component.find('.done');
    expect(wrapper.length).toBe(1);
  });

  it('should render notdone for false', () => {
    const component = shallow(<Calendar year={2019} month={10} todos={mockTodos}/>);
    const wrapper = component.find('.notdone');
    expect(wrapper.length).toBe(1);
  });

  it('should handle clicks without errors', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2019} month={10} clickDone={mockClickDone} todos={mockTodos}/>);
    const wrapper = component.find('.done').first();
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});