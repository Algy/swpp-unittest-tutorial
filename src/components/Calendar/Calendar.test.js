import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

const stubTodos = [{
    id: 0,
    title: 'title 1',
    content: 'content 1',
    year: 2019,
    month: 11,
    date: 8,
  },
  {
    id: 1,
    title: 'title 2',
    content: 'content 2',
    year: 2019,
    month: 11,
    date: 10
  },
];

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('Table');
    expect(wrapper.length).toBe(1);
  });

  it('should render header without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('Table');
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('TableHeaderCell').length).toBe(7);
  });

  it('should render date as given', () => {
    const component = shallow(<Calendar year={2019} month={12} todos={stubTodos} />);
    let wrapper = component.find('TableBody');
    expect(wrapper.find('TableRow').length).toBe(5);
  });

  it('should handle clicks', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2019} month={12} todos={stubTodos} clickDone={mockClickDone} />);
    const wrapper = component.find('div.todoTitle');
    expect(wrapper.length).toBe(2);
    wrapper.first().simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});
