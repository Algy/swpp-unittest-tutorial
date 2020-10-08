import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react';


describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(Table);
    expect(wrapper.length).toBe(1);
  });

  it('should handle clicks', () => {
    const mockClickDone = jest.fn();
    const mockTodos = [
      {id:1, year:2020, month:11, date:30, done:true}];
    const component = mount(<Calendar year={2020} month={12} todos={mockTodos} clickDone={mockClickDone} />);
    const wrapper = component.find('.todoTitle');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });

  it('should display done/notdone', () => {
    const mockClickDone = jest.fn();
    const mockTodos = [
      {id:1, year:2020, month:11, date:30, done:true},
      {id:2, year:2020, month:11, date:30, done:false}];
    const component = mount(<Calendar year={2020} month={12} todos={mockTodos} clickDone={mockClickDone} />);
    const done = component.find('.done');
    expect(done.length).toBe(1);
    const notdone = component.find('.notdone');
    expect(notdone.length).toBe(1);
    
  });
});
