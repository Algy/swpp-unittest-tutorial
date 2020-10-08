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
        <button className="doneButton" onClick={props.clickDone} />
      </div>);
  });
});

const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2019, month: 3, date: 10},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2019, month: 3, date: 10},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2019, month: 3, date: 10},
  ],
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos, spyToggleTodo;

  beforeEach(() => {
    todoCalendar = (
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
    spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render Calendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar');
    expect(wrapper.length).toBe(1);
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it(`should call 'clickDone'`, () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar .doneButton').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });

  it('should handle click prev', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.prev')
    wrapper.simulate('click')

    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(9)
  })

  it('should handle click prev year', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.prev')
    for (let i = 0; i < 10; i++) {
      wrapper.simulate('click')
    }

    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toEqual(2018);
    expect(todoCalendarInstance.state.month).toEqual(12)
  })

  it('should handle click next', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.next')
    wrapper.simulate('click')
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(11)
  })

  it('should handle click next year', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.next')
    wrapper.simulate('click')
    wrapper.simulate('click')
    wrapper.simulate('click')
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toEqual(2020);
    expect(todoCalendarInstance.state.month).toEqual(1)
  })
});

