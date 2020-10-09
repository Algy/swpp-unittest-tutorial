import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

const stubTodos = [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: true, year: 2020, month: 10, date: 9}, 
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2020, month: 10, date: 9}, 
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2020, month: 10, date: 9}, 
];

describe('<Calendar />', () => {
    it('should render without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('.calendar');
        expect(wrapper.length).toBe(1);
    });

    it('should render todos in correct cells', () => {
        const component = shallow(<Calendar year={2020} month={11} todos={stubTodos} />);
        const wrapper = component.find('.todoTitle');
        expect(wrapper.length).toBe(3);
    });

    it('should render className done correclty', () => {
        const component = shallow(<Calendar year={2020} month={11} todos={stubTodos} />);
        let wrapper_true = component.find('.done');
        let wrapper_false = component.find('.notdone');
        expect(wrapper_true.length).toBe(1);
        expect(wrapper_false.length).toBe(2);
    });

    it('should call clickTodoHandler', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar year={2020} month={11} todos={stubTodos} clickDone={mockClickDone} />);
        const wrapper = component.find('.todoTitle').at(0);
        wrapper.simulate('click')
        expect(mockClickDone).toHaveBeenCalledTimes(1)
    });
});

