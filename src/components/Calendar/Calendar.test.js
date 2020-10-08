import React from 'react';
import { mount, shallow } from 'enzyme';
import Calendar from './Calendar';

let todoList = [
    {content: "take swpp class",    date: 1,    done: true,    id: 8,    month: 1,    title: "SWPP",    year: 2019},
    {content: "Watch Movie",
    date: 1,
    done: false,
    id: 9,
    month: 1,
    title: "Movie",
    year: 2019},
    {content: "eat dinner",
    date: 1,
    done: false,
    id: 12,
    month: 1,
    title: "Dinner",
    year: 2019}
]

describe('Calendar', () => {
    it('should render Calender', () => {
        const component = shallow(<Calendar />)
        const wrapper = component.find('.calendar')
        expect(wrapper.length).toBe(1)
    })

    it('should render todos', () => {
        const component = shallow(<Calendar todos={todoList} year={2019} month={2}/>)
        const wrapper = component.find(".todoTitle")
        expect(wrapper.length).toBe(3)
    })

    it('should handle clickDone', () => {
        todoList = [todoList[0]]
        const mockfct = jest.fn();
        const component = shallow(<Calendar todos={todoList} year={2019} month={2} clickDone={mockfct}/>)
        const wrapper = component.find(".todoTitle")
        expect(wrapper.length).toBe(1)
        wrapper.simulate('click')
        expect(mockfct).toHaveBeenCalledTimes(1)
        
    })
})