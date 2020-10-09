import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';

const stubTodo = {
  id: 0,
  title: 'title 1',
  content: 'content 1',
  dueDate: {
    year: 2020,
    month: 10,
    date: 6
  },
  done: false
};
const stubTodoList = [stubTodo];


describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.sunday');
    expect(wrapper.length).toBe(1);
  });

  it('clickDone should work on click', () => {
    const spyToggleTodo = jest.fn();
    const component = shallow(<Calendar year={2020} month={10} todos={stubTodoList} clickDone={spyToggleTodo}/>)
    const wrapper = component.find('.todoTitle notdone')
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1)
  });
});
  