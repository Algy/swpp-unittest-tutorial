import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import Todo from "../Todo/Todo";
const stubTodo = {
    id: 0,
    title: 'title 1',
    content: 'content 1',
    year: '2020',
    month: '9',
    date: '8',
};

const stubFailTodo = {
    id: 1,
    title: 'title 2',
    content: 'content 2',
    year: '2020',
    month: '14',
    date: '08',
};

describe('<Calender/>', () => {
    it('clickDone should work', () =>
    {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar year='2020' month='10' clickDone={mockClickDone} todos={[stubTodo, stubFailTodo]} />);
        const wrapper = component.find('.calendarButton');
        console.log(component.debug());
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });
    it('should render without errors', () => {
        const component = shallow(<Calendar year='2020' month='10' todos={[stubTodo, stubFailTodo]}/>);
        const wrapper = component.find('.calendar-component');
        expect(wrapper.length).toBe(1);
    });
});
