import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';
import NewTodo from "../TodoList/NewTodo/NewTodo";


jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn(props => {
    return (
      <div className="spyCalendar">
        <button className="doneButton" onClick={props.clickDone} />
      </div>);
  });
});

const stubInitialState = {
  todos : [
  {
    id: 1,
    title: "TODO_TEST_TITLE_1",
    year: 2019,
    month: 10,
    date: 8,
    done: true,
  },
  {
    id: 2,
    title: "TODO_TEST_TITLE_2",
    year: 2019,
    month: 10,
    date: 4,
    done: false,
  },
  {
    id: 3,
    title: "TODO_TEST_TITLE_3",
    year: 2020,
    month: 9,
    date: 21,
    done: true,
  }],
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
             <Route path='/' exact component={TodoCalendar} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  });
  afterEach(() => { jest.clearAllMocks() });

  it('should render Todocalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.TodoCalendar');
    expect(wrapper.length).toBe(1);
  });
  it(`should call 'handleclickprev'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find("#click_prev");
    for(let i=0; i<11; i++) {
      wrapper.simulate('click');
    }
    const prevInstance=component.find(TodoCalendar.WrappedComponent).instance();
    expect(prevInstance.state.year).toEqual(2018);
    expect(prevInstance.state.month).toEqual(11);
  });
  it(`should call 'handleclicknext'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find("#click_next");
    for(let i =0; i<11; i++) {
      wrapper.simulate('click');
    }
    const prevInstance=component.find(TodoCalendar.WrappedComponent).instance();
    expect(prevInstance.state.year).toEqual(2020);
    expect(prevInstance.state.month).toEqual(9);
  });

  it(`should call 'toggletodo'`, () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalendar);
    const wrapper = component.find('.doneButton').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});
