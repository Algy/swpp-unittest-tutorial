import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

const stubInitialState={
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
  ],
  selectedTodo: null,
};

const mockStore=getMockStore(stubInitialState);

describe('<TodoCalendar />',()=>{
  let todoCalendar;

  beforeEach(()=>{
    todoCalendar=(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={TodoCalendar} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('should render without error',()=>{
    const component=mount(todoCalendar);
    const wrapper=component.find('Calendar');
    expect(wrapper.length).toBe(1);
  });

  it('month buttons should correctly operate',()=>{
    const component=mount(todoCalendar);
    const wrapper=component.find('button');
    wrapper.at(1).simulate('click');
    wrapper.at(1).simulate('click');
    wrapper.at(1).simulate('click');
    const todoCalendarInstance=component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toBe(2020);
    expect(todoCalendarInstance.state.month).toBe(1);
    wrapper.at(0).simulate('click');
    wrapper.at(0).simulate('click');
    expect(todoCalendarInstance.state.year).toBe(2019);
    expect(todoCalendarInstance.state.month).toBe(11);
  });

  it(`should call 'onToggleTodo`,()=>{
    const spyOnToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(td => { return dispatch => {}; });
    const component=mount(todoCalendar);
    const todoCalendarInstance=component.find(TodoCalendar.WrappedComponent).instance();
    todoCalendarInstance.props.onToggleTodo(0);
    expect(spyOnToggleTodo).toHaveBeenCalledTimes(1);
  });
})