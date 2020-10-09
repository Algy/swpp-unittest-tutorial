import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('<Calender/>', () => {
    it('should render without errors',  () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('Table');
        expect(wrapper.length).toBe(1);
    });

    it('should handle onClick', () => {
        const mockClickDone = jest.fn();
        const mockTodos = [{
            id: 1,
            title: 'TITLE',
            content: 'CONTENT',
            done: false,
            year: 2020,
            month: 10,
            date: 9
        }, {
            id: 1,
            title: 'TITLE',
            content: 'CONTENT',
            done: true,
            year: 2020,
            month: 10,
            date: 9
        }]
        const component = shallow(<Calendar todos={mockTodos} clickDone={mockClickDone} year={2020} month={10}/>);
        const wrapper = component.find('.todoTitle').at(0);
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });


})