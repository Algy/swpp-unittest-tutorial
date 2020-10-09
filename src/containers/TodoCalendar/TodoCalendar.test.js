import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
        return (
            <div className="spyCalendar">
                <div className="todoTitle" onClick={props.clickDone}>
                    Todo Title
                </div>
            </div>
        )
    })
})

const stubInitialState = {
    todos: [
        {id: 1, title: 'TODO_TEST_TITLE_1', done: true, year: 2020, month: 10, date: 9}, 
        {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2020, month: 10, date: 9}, 
        {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2020, month: 10, date: 9}, 
    ],
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
    let todoCalendar, spyGetTodos;

    beforeEach(() => {
        todoCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact
                            render={() => <TodoCalendar />} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(() => { return dispatch => { }; });
    })
    afterEach(() => { jest.clearAllMocks() });

    it('should render TodoCalendar', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('#todo-calendar');
        expect(wrapper.length).toBe(1);
        expect(spyGetTodos).toBeCalledTimes(1);
    });

    it('should call handleClickPrev', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('#prev-button');
        wrapper.simulate('click');
        const newTodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newTodoCalendarInstance.state.year).toEqual(2019);
        expect(newTodoCalendarInstance.state.month).toEqual(9);
    });

    it('should call handleClickNext', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('#next-button');
        wrapper.simulate('click');
        const newTodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newTodoCalendarInstance.state.year).toEqual(2019);
        expect(newTodoCalendarInstance.state.month).toEqual(11);
    });

    it('should call different branch of click prev', () => {
        const component = mount(todoCalendar);
        component.find(TodoCalendar.WrappedComponent).instance().setState({ year: 2020, month: 1 });
        const wrapper = component.find('#prev-button');
        wrapper.simulate('click');
        const newTodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newTodoCalendarInstance.state.year).toEqual(2019);
        expect(newTodoCalendarInstance.state.month).toEqual(12);
    });

    it('should call different branch of click next', () => {
        const component = mount(todoCalendar);
        component.find(TodoCalendar.WrappedComponent).instance().setState({ year: 2019, month: 12 });
        const wrapper = component.find('#next-button');
        wrapper.simulate('click');
        const newTodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newTodoCalendarInstance.state.year).toEqual(2020);
        expect(newTodoCalendarInstance.state.month).toEqual(1);
    });

    it(`should call clickDone`, () => {
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(id => { return dispatch => { }; });
        const component = mount(todoCalendar);
        const wrapper = component.find('.todoTitle').at(0);
        wrapper.simulate('click');
        expect(spyToggleTodo).toBeCalledTimes(1);
    });
});

