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
        {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year:2019, month:10, date: 20},
        {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year:2019, month:10, date: 30},
        {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year:2019, month:11, date: 2},
        {id: 3, title: 'TODO_TEST_TITLE_4', done: false, year:2019, month:9, date: 2}
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
            render={() => <TodoCalendar title="TODOCALENDAR_TEST_TITLE" />} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render todos', () => {
    const component = mount(todoList);
    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(2);
    expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
    expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2');
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it('should handle prevClick', () => {
    const component = mount(todoList);
    let wrapper = component.find('.header .clickPrev');
    wrapper.simulate('click');
    wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(1);

    expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_4');
    expect(spyGetTodos).toBeCalledTimes(2);
  });

  it('should handle nextClick', () => {
    const component = mount(todoList);
    let wrapper = component.find('.header .clickNext');
    wrapper.simulate('click');
    wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(1);

    expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_3');
    expect(spyGetTodos).toBeCalledTimes(3);
  });
});

