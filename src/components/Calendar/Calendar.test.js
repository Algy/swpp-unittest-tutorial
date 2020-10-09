import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar'
import * as actionCreators from '../../store/actions/todo';

describe('<Calender />', () => {
    it('should render without errors', () => {
    const component = mount(<Calendar />);
    const wrapper = component.find('table');
    expect(wrapper.length).toBe(1);
    });

    it('should handle clicks', () => {
        const mockClickDone = jest.fn();
        const year = 2019
        const month = 2
        const stubInitialState = {
          todos: [
            {id: 1, title: 'TODO_TEST_TITLE_1', year:{year}, month:{month}, date:parseInt(19), done: true},
          ],
          selectedTodo: null,
        };
        const component = shallow(<Calendar year={year} month={month} todos={stubInitialState.todos} clickDone={mockClickDone} />);
        const wrapper = component.find('.todoTitle done');
        expect(mockClickDone).toHaveBeenCalledTimes(0);
      });

      it('should handle clicks', () => {
        const mockClickDone = jest.fn();
        const year = 2019
        const month = 2
        const stubInitialState = {
          todos: [
            {id: 1, title: 'TODO_TEST_TITLE_1', year:2019, month:2, date:19, done: false},
          ],
          selectedTodo: null,
        };
        const component = shallow(<Calendar year={year} month={month} todos={stubInitialState.todos} clickDone={mockClickDone} />);
        const wrapper = component.find('.todoTitle notdone');
        expect(mockClickDone).toHaveBeenCalledTimes(0);
      });
});