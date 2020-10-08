import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';


describe('<Calendar />', () => {
    it('should render without errors', () => {
        const mockTodos = [{
            id: 1,
            title: 'TITLE',
            content: 'CONTENT',
            done: true,
            year: 2020,
            month: 10,
            date: 1,
        }, {
            id: 2,
            title: 'TITLE2',
            content: 'CONTENT2',
            done: false,
            year: 2020,
            month: 11,
            date: 1,
        }, {
            id: 3,
            title: 'TITLE3',
            content: 'CONTENT3',
            done: false,
            year: 2020,
            month: 9,
            date: 1,
        }, {
            id: 4,
            title: 'TITLE4',
            content: 'CONTENT4',
            done: true,
            year: 2020,
            month: 9,
            date: 1,
        }];
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar year={2020} month={10}
            todos={mockTodos} clickDone={mockClickDone} />);
        let wrapper = component.find('Table');
        let wrapper2 = wrapper.find('.date');
        let wrapper3 = component.find('.todoTitle').at(0);
        let wrapper4 = component.find('.done');
        expect(wrapper.length).toBe(1);
        expect(wrapper2.length).toBe(31);
        wrapper3.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
        expect(wrapper4.length).toBe(1);
        // expect(wrapper3.length).toBe(1);
    });
})