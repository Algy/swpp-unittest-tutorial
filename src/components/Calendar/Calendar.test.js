import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react';


describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(Table);
    expect(wrapper.length).toBe(1);
  });

  it('should render at given year and month' ,() => {
    const component = shallow(<Calendar year={2020} month={10} todos={[]}/>)
    const wrapper = component.find(Table.Body).find('.date');
    expect(wrapper.length).toBe(31);
    wrapper.forEach((date, i) => {
      expect(parseInt(date.text())).toBe(i+1);
    });
  });

  it('should render at right date', () => {
    const todoTest = {id: 10, done: true, title: "TEST TITLE 1", year: 2020, month: 9, date: 9}
    const component = shallow(<Calendar year={2020} month={10} todos={[todoTest]} />)
    const wrapper = component.find('.todoTitle');
    expect(wrapper.text()).toBe("TEST TITLE 1");
  });

  it('should handle click', () => {
    const mockClickDone = jest.fn();
    const todoTest = { id: 1, done: false, title: "TEST TITLE 2", year: 2020, month: 9, date: 1}
    const component = shallow(<Calendar year={2020} month={10} todos={[todoTest]} clickDone={mockClickDone}/>)
    const wrapper = component.find('.todoTitle');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });

});
