import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

const stubInitialState = {
    todos: [
        {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
        {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
        {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
      ],
      selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
    let todoList, spyGetTodos;

    beforeEach(() => {
        todoList = (
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
          .mockImplementation(() => { return dispatch => {}; });
    })

    it('should render Todos', () => {
        const component = mount(todoList);
        const wrapper = component.find('.prev');
        expect(wrapper.length).toBe(1);
        for(let a = 0; a < 12; a++){
            wrapper.simulate('click');
        }
    });

    it('should render Todos', () => {
        const component = mount(todoList);
        const wrapper = component.find('.next');
        expect(wrapper.length).toBe(1);
        for(let a = 0; a < 12; a++){
            wrapper.simulate('click');
        }
    });
});