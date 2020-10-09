import React from 'react';
import { shallow, mount } from 'enzyme';
import { Table } from 'semantic-ui-react'
import Calendar from './Calendar';

const todos= [
      {id: 1, title: 'TODO_TEST_TITLE_1', content: 'test1', year: 2020, month: 10, date: 9, done: true},
      {id: 2, title: 'TODO_TEST_TITLE_2', content: 'test2', year: 2020, month: 10, date: 9, done: false},
      {id: 3, title: 'TODO_TEST_TITLE_3', content: 'test3', year: 2020, month: 9, date: 9, done: false},
];


const year = 2020;
const month = 11;
const date = 9;

describe('<Calendar />', () => {
    it('should render Calendar', () => {
      const component = shallow(<Calendar />);
      const wrapper = component.find(Table);
      expect(wrapper.length).toBe(1);
    });

    it('should render title as done if done', () => {
        const mockClickDone = jest.fn();
        const component = mount(<Calendar year={year} month={month} todos={todos} clickDone={mockClickDone} />);
        const wrapper = component.find('.done');
        expect(wrapper.length).toBe(1);
    });

    it('should change title to done if clicked done', () => {
        const mockClickDone = jest.fn();
        const component = mount(<Calendar year={year} month={month} todos={todos} clickDone={mockClickDone} />);
        const wrapper = component.find('.notdone');
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });

})