import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar'
import ReactWrapper from 'enzyme/build/ReactWrapper';
import expectExport from 'expect';

describe('<Calendar />', () => {

    it("should handle clicks", ()=> {
        const mockClickDone = jest.fn()
        const mockTodo = [{id: 1, done: true, year: 2019, month: 1, date: 10}];

        const component = mount(<Calendar clickDone={mockClickDone} todos={mockTodo} year={2019} month={2}/>)
        const wrapper = component.find('#aws')
        wrapper.simulate('click')
        expectExport(mockClickDone).toHaveBeenCalledTimes(1)

    })
})