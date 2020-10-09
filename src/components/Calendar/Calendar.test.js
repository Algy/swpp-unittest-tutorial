import React from 'react';
import {shallow} from 'enzyme';
import Calendar from './Calendar';

const stub_todos = [
  {
    id: 1,
    title: "TODO_TEST_TITLE_1",
    year: 2020,
    month: 10,
    date: 8,
    done: true,
  },
  {
    id: 2,
    title: "TODO_TEST_TITLE_2",
    year: 2020,
    month: 10,
    date: 4,
    done: false,
  },
  {
    id: 3,
    title: "TODO_TEST_TITLE_3",
    year: 2020,
    month: 9,
    date: 21,
    done: true,
  },
];

describe('<Calendar />', () => {

    it('should render calendar without errors', () => {
        const component = shallow(<Calendar/>); //year month todos
        let wrapper = component.find('.sunday');
        expect(wrapper.length).toBe(1);
    });

    it('should render calendar with dates', () => {
        const component = shallow(<Calendar year={2020} month={4} todos={[
            {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
            {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
            {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
        ]}/>); //year month todos
        let wrapper = component.find('.date');
        expect(wrapper.length).toBe(30); //4월에는 30일까지
        // expect(wrapper.text()).toEqual(1);
    });

    it("should handle click", () => {
        const mockClickDone = jest.fn();
        const component = shallow(
            <Calendar
                year={2020}
                month={11}
                todos={stub_todos} clickDone={mockClickDone}/>);
        const wrapper = component.find("#todoTitle_id");
        expect(wrapper.length).toBe(2);
        wrapper.at(0).simulate("click");
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });

     it('should render title as done if done=true', () => {
       const component = shallow(<Calendar year={2020}
                month={11}
                todos={stub_todos} />);
       const wrapper = component.find('.done');
       expect(wrapper.length).toBe(1);
       expect(wrapper.text()).toEqual('TODO_TEST_TITLE_1');
     });
/*
     it('should handle clicks', () => {
       const mockClickDone = jest.fn();
       const component = shallow(<Todo clickDone={mockClickDone} />);
       const wrapper = component.find('.doneButton');
       wrapper.simulate('click');
       expect(mockClickDone).toHaveBeenCalledTimes(1);
     });
     */
});
