import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Calendar from './Calendar'
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';
import { Item } from 'semantic-ui-react';

const stubInitialState = {
    todos: [
        {
            id: 1,
            title: 'TODO_TEST_TITLE_1',
            content: 'TODO_TEST_CONTENT_1',
            year: 2020,
            month: 10,
            date: 2,
            done: false,
        },
        {
            id: 2,
            title: 'TODO_TEST_TITLE_2',
            content: 'TODO_TEST_CONTENT_2',
            year: 2020,
            month: 9,
            date: 2,
            done: false,
        },
        {
            id: 3,
            title: 'TODO_TEST_TITLE_3',
            content: 'TODO_TEST_CONTENT_3',
            year: 2020,
            month: 9,
            date: 3,
            done: true,
        },
    ],
    selectedTodo: null,
};

describe('<Calendar />', () => {
    let mockClickDone;
    let component;

    // afterEach(() => { jest.clearAllMocks() });

    beforeEach(() => {
        mockClickDone = jest.fn(id => { return null });
        component = shallow(
                <Calendar 
                    year={2020}
                    month={10}
                    todos={stubInitialState.todos}
                    clickDone={mockClickDone}
                />
        );
    })

    it('should render Calendar', () => {
        const wrapper = component.find('Table');
        expect(wrapper.length).toBe(1);
    });

    it('should call clickDone', () => {
        const wrapper = component.find('.todoTitle');
        expect(wrapper.length).toBe(2);
        wrapper.at(0).simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
        expect(mockClickDone).toHaveBeenCalledWith(2);
        wrapper.at(1).simulate('click');
        expect(mockClickDone).toHaveBeenCalledWith(3);
    });

    it('should toggle done', () => {
        expect(mockClickDone).toHaveBeenCalledTimes(0);
        const wrapper = component.find('.todoTitle');
        const wrapper2 = component.find('.notdone');
        const wrapper3 = component.find('.done');
        expect(wrapper.length).toBe(2);
        expect(wrapper2.length).toBe(1);
        expect(wrapper3.length).toBe(1);
        wrapper.at(0).simulate('click');
        expect(wrapper.length).toBe(2);
        expect(wrapper2.length).toBe(1);
        expect(wrapper3.length).toBe(1);
    })
});