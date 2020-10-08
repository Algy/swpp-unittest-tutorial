import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar'
import { Table } from 'semantic-ui-react'

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(Table);
    expect(wrapper.length).toBe(1);
  });

  it('should handle clicks', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2019} month={4} todos={[{
      id: 0,
      title: "test title",
      content: "test content",
      year: 2019,
      month: 3,
      date: 10,
      done: true,
    }]} clickDone={mockClickDone} />);
    const wrapper = component.find('.todoTitle');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});
