import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react';

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    let wrapper = component.find(Table);
    expect(wrapper.length).toBe(1);
    wrapper = component.find(Table.Header);
    expect(wrapper.length).toBe(1);
    wrapper = component.find(Table.HeaderCell);
    expect(wrapper.length).toBe(7);
    wrapper = component.find(Table.Body);
    expect(wrapper.length).toBe(1);
    wrapper = component.find(Table.Body).find(Table.Row);
    expect(wrapper.length).toBe(5);
  });

  it('should render given month in props', () => {
    const component = shallow(<Calendar year={2020} month={9} todos={[]}/>);
    let wrapper = component.find(Table.Body).find('.date');
    expect(wrapper.first().text()).toBe('1');
    expect(wrapper.first().closest(Table.Cell).key()).toBe('2');
    expect(wrapper.last().text()).toBe('30');
    expect(wrapper.last().closest(Table.Cell).key()).toBe('31');
    wrapper = component.find(Table.Body).find('.date');
    wrapper.forEach((node, i) => {
      expect(node.text()).toBe((i + 1).toString());
    });
  });

  it('should render given todo at correct date', () => {
    const todo = {
      id: 1, done: true, title: 'test_title', year: 2020, month: 9, date: 11
    };
    const component = shallow(<Calendar year={2020} month={10} todos={[todo]}/>);
    let wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(1);
    expect(wrapper.hasClass('done')).toBe(true);
    expect(wrapper.text()).toBe('test_title');
    expect(wrapper.closest(Table.Cell).key()).toBe('14');
  });

  it('should handler onclick todo', () => {
    const mockClickDone = jest.fn();
    const todo = {
      id: 1, done: false, title: 'test_title', year: 2020, month: 9, date: 11
    };
    const component = shallow(
      <Calendar year={2020} month={10} todos={[todo]} clickDone={mockClickDone} />
    );
    let wrapper = component.find('.todoTitle');
    expect(wrapper.hasClass('notdone')).toBe(true);
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});
