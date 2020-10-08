import React from 'react';
import {shallow, mount } from 'enzyme';
import Calendar from './Calendar';

describe('<Calendar /> ', () => {
    it('should be rendered without errors', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar 
            year={'2000'} 
            month={'9'} 
            todos={[{id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: '2000', month: '8', date: '13'}]}
            clickDone={mockClickDone}/>);
        const wrapper = component.find('.sunday');
        expect(wrapper.length).toBe(5);
    });

    it('should be rendered without errors', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar 
            year={'2000'} 
            month={'9'} 
            todos={[{id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: '2000', month: '8', date: '13'}]}
            clickDone={mockClickDone}/>);
        const wrapper = component.find('.Hello');
        wrapper.simulate('click');
        expect(wrapper.length).toBe(1);
    });
});