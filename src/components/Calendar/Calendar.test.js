import React from 'react';
import { shallow, mount } from 'enzyme';

import { Table } from 'semantic-ui-react'
import Calendar from './Calendar';
import { bindActionCreators } from 'redux';

const stub_todos = [
    { id: "todo1", title: 'TODO_TEST_TITLE_1', content: 'content1', done: true, year: 2020, month: 1, date: 1 },
    { id: "todo2", title: 'TODO_TEST_TITLE_2', content: 'content2', done: false, year: 2020, month: 1, date: 1 },
    { id: "todo3", title: 'TODO_TEST_TITLE_3', content: 'content3', done: false, year: 2020, month: 1, date: 20 },
]

describe('<Calendar />', () => {
    it('should render Calendar', () => {
        const component = shallow(<Calendar />)
        const wrapper = component.find(Table)
        expect(wrapper.length).toBe(1);
    })

    it('should change by click', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar
            year="2020"
            month="1"
            date="1"
            todos={stub_todos}
            clickDone={mockClickDone} />
        )
        component.debug();
        const wrapper = component.find("#todoTitle".WrappedConponent).instance();
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    })
})