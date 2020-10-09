import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react'

describe('<Calendar />', () => {
    const mockTodos_done = [{
        id: 1,
        title: 'TITLE',
        content: 'CONTENT',
        done: true,
        year: 2020,
        month: 10,
        date: 8
    }];

    const mockTodos_undone = [{
        id: 1,
        title: 'TITLE',
        content: 'CONTENT',
        done: false,
        year: 2020,
        month: 10,
        date: 8
    }];

    it('should render without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find(Table);
        expect(wrapper.length).toBe(1);
    });

    it('should handle clicks done-todos if done=true', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar year={2020} month={11} todos={mockTodos_done} clickDone={mockClickDone} />);
        const wrapper = component.find('.done');
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });
     
    it('should handle clicks if done=false', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar year={2020} month={11} todos={mockTodos_undone} clickDone={mockClickDone} />);
        const wrapper = component.find('.notdone');
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });
});

