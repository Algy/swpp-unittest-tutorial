import React from 'react';
import {mount, shallow} from 'enzyme';
import Calendar from './Calendar';
import Todo from '../Todo/Todo'

describe('<Calendar />', () => {
    it('should render without errors', () => {
        const component = shallow(<Calendar/>);
        const wrapper = component.find('Table');
        expect(wrapper.length).toBe(1);
    });

    it('should handle clicks', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar
            year='2019' month='3'
            todos={[{
                id: 1,
                title: "test",
                content: "test",
                year: 2019,
                month: 2,
                date: 1,
                done: true
            }]}
            clickDone={mockClickDone}/>);
        const wrapper = component.find('#todo-1');
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });

    it('should render todo as not done if Todo is not done', () => {
        const component = mount(<Calendar year='2019' month='3'
                                          todos={[{
                                              id: 1,
                                              title: "test",
                                              content: "test",
                                              year: 2019,
                                              month: 2,
                                              date: 1,
                                              done: true
                                          },
                                              {
                                                  id: 2,
                                                  title: "test",
                                                  content: "test",
                                                  year: 2019,
                                                  month: 2,
                                                  date: 1,
                                                  done: false
                                              }]}/>);
        let wrapper = component.find('.done');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('.notdone');
        expect(wrapper.length).toBe(1);
        wrapper = component.find('.todoTitle');
        expect(wrapper.length).toBe(2);
    });
});
