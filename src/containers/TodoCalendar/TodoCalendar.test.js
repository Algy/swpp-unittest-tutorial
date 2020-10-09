import React from 'react';
import { shallow, mount } from 'enzyme';

import { Table } from 'semantic-ui-react'
import { getMockStore } from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/todo';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import TodoList from '../../containers/TodoList/TodoList';
import { history } from '../../store/store';
import TodoCalendar from './TodoCalendar'

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
        return (
            <div className="spyCalendar">
                <button className="doneButton" onClick={props.clickDone} />
            </div>
        )
    })
})

const stubInitialState = {
    todos: [],
    selectedTodo: null,
}

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
    let todoCalendar, spyGetTodos;

    beforeEach(() => {
        todoCalendar = (
            <Provider store = {mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact render={() => <TodoCalendar/>} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
    })
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
        .mockImplementation(() => {return dispatch => {}})


it('should render without erros', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar');
    expect(wrapper.length).toBe(1);
});

it('should call clickDone', () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
        .mockImplementation(id => {return dispatch => {}; });
    const component = mount(todoCalendar);
    const wrapper = component.find('.doneButton');
    wrapper.simulate('click')
    expect(spyToggleTodo).toBeCalledTimes(1)
})


})
