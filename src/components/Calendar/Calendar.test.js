import React from 'react';
import { shallow } from 'enzyme';

import Calendar from './Calendar';
import { Item } from 'semantic-ui-react';

const stubInitialState = {
    todos: [
        {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2019, month: 9, date: 9},
        {id: 2, title: 'TODO_TEST_TITLE_2', done: true, year: 2019, month: 9, date: 27},
        {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2019, month: 9, date: 11},
    ],
    selectedTodo: null,
};

describe('<Calendar />', () => {

    it('should render calendar header without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('.sunday');
        expect(wrapper.length).toBe(1);
    })
    it('should render calendar body without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('#calendar-body');
        expect(wrapper.length).toBe(1);
    })
    it('should render calendar without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('#calendar');
        expect(wrapper.length).toBe(1);
    })

    it('should handle clicks', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar clickDone={mockClickDone} todos={stubInitialState.todos} year={2019} month={10}/>);
        const wrapper = component.find('.todoTitle').at(0);
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });
    


})

