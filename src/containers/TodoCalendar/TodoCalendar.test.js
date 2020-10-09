import axios from 'axios';

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import Calendar  from '../../components/Calendar/Calendar'
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
  todos: [],
  selectedTodo: null,
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
      .mockImplementation(() => { return dispatch => {}; });
  });

  it('should render without errors', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar');
    expect(wrapper.length).toBe(1);
  });

  it(`should call handleClickPrev`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('#prevMonth');
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    wrapper.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(9);

    for(let m = 9; m >= 1; m--) wrapper.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2018);
    expect(todoCalendarInstance.state.month).toEqual(12);
  });

  it(`should call handleClickNext`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('#nextMonth');
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    wrapper.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(11);

    for(let m = 11; m <= 12; m++) wrapper.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2020);
    expect(todoCalendarInstance.state.month).toEqual(1);
  });

  it(`should call clickDone`, () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalendar);
    const wrapper = component.find('.doneButton');
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });

});
