import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

const stubTodoList = [
    {id: 0, title: 'TODO_TEST_TITLE_1', content: 'TODO_TEST_CONTENT_1', 
        done: true, year: 2020, month: 9, date: 2},
    {id: 1, title: 'TODO_TEST_TITLE_2', content: 'TODO_TEST_CONTENT_2', 
        done: false, year: 2020, month: 14, date: 10},
    {id: 2, title: 'TODO_TEST_TITLE_3', content: 'TODO_TEST_CONTENT_3', 
        done: false, year: 2020, month: 9, date: 20},
];


describe('<Calender/>', () => {

    it('should render without errors', () => {
        const component = shallow(<Calendar 
            year='2020'
            month='10' 
            todos={stubTodoList} 
        />);
        const wrapper = component.find('.render-calendar');
        expect(wrapper.length).toBe(1);
    });

    it('should handle clicks', () =>
    {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar 
            year='2020' 
            month='10' 
            clickDone={mockClickDone} 
            todos={stubTodoList} 
        />);
        const wrapper = component.find('#todo-0');
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });

    it('should render title as done if done=true', () => {
        const component = shallow(<Calendar 
            year='2020' 
            month='10' 
            todos={stubTodoList} 
        />);
        const wrapper = component.find('.done');
        expect(wrapper.text()).toEqual('TODO_TEST_TITLE_1');
    });


});