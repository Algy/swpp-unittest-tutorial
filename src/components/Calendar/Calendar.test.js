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
    const mockTodos = [{year:2020, month:11, date:30}];
    const component = mount(<Calendar year={2020} month={12} todos={mockTodos} clickDone={mockClickDone} />);
    const wrapper = component.find('.todoTitle');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});
