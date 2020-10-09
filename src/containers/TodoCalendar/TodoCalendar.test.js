import React from 'react';
import {mount, shallow} from 'enzyme';
import TodoCalendar from './TodoCalendar';
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../../store/store";
import {Route, Switch} from "react-router-dom";
import NewTodo from "../TodoList/NewTodo/NewTodo";
import {getMockStore} from "../../test-utils/mocks";
import * as actionTypes from "../../store/actions/actionTypes";
import axios from 'axios';
import * as actionCreators from '../../store/actions/todo';

const stubInitialState = {
    todos: [{id: 0,
    title: 'TITLE',
        done: true,
        year: 2020,
        month: 10,
        date: 9,
        dueDate: {
            year: 2020,
            month: 10,
            date: 10,
        }
    }],
    selectedTodo: null
}

const mockStore = getMockStore(stubInitialState);

describe('<NewTodo />', () => {
    let todoCalendar;

    beforeEach(() => {
        todoCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={TodoCalendar}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    })

    it('should render TodoCalendar', ()=>{
        const component = mount(todoCalendar);
        const wrapper = component.find('.header');
        expect(wrapper.length).toBe(1);
    })

    it('should render link', ()=>{
        const component = mount(todoCalendar);
        const wrapper = component.find('.link');
        expect(wrapper.length).toBe(1);
    })

    it('should call handleClickPrev', ()=>{
        const component = mount(todoCalendar);
        const wrapper = component.find('#prev-month-button');
        wrapper.simulate('click');
        const todoCalendarInstance=component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.month).toBe(9);
        expect(todoCalendarInstance.state.year).toBe(2019);
    })

    it('should call handleClickNext', ()=>{
        const mockClickDone = jest.fn();
        const component = mount(todoCalendar);
        const wrapper = component.find('#next-month-button');
        wrapper.simulate('click');
        wrapper.simulate('click');
        wrapper.simulate('click');
        const todoCalendarInstance=component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.month).toBe(1);
        expect(todoCalendarInstance.state.year).toBe(2020);
    })

    it('should handle toggle', ()=>{
        const spy = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(id => { return dispatch => {}; });
        const component = mount(todoCalendar);
        const todoCalendarInstance=component.find(TodoCalendar.WrappedComponent).instance();
        todoCalendarInstance.props.onToggleTodo(0);
        expect(spy).toHaveBeenCalledTimes(1);
    })
})