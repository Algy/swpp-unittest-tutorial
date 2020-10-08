import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

const stubTodos = [
  {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year:2020, month:9, date:3}, 
  {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year:2020, month:9, date:11}]
;


describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.Calendar');
    expect(wrapper.length).toBe(1);
  });

  it('should render weekdays', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.sunday');
    expect(wrapper.length).toBe(1);
  });

  it('should render cell and days correctly', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2020} month={10} todos={stubTodos} clickDone={mockClickDone} />);
    const wrapper = component.find('.sunday');
    expect(wrapper.length).toBeGreaterThanOrEqual(1);
  });

  it('should handle clicks', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2020} month={10} todos={stubTodos} clickDone={mockClickDone} />);
    const wrapper = component.find('.notdone').at(0);
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });

});
