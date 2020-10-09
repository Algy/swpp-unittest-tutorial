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
  return jest.fn((props) => {
    return (
      <div className="spyCalendar">
        {props.year}.{props.month}
        <button className="toggleButton" onClick={props.clickDone} />
      </div>
    );
  });
});

const stubtodos = [
  {
    id: 1,
    title: 'TODO_TEST_TITLE_1',
    done: false,
    content: 'TODO_TEST_CONTENT_1',
    year: 2020,
    month: 10,
    date: 8,
  },
  {
    id: 2,
    title: 'TODO_TEST_TITLE_2',
    done: true,
    content: 'TODO_TEST_CONTENT_2',
    year: 2020,
    month: 10,
    date: 5,
  },
];

const stubInitialState = {
  todos: stubtodos,
  selectedTodo: null,
};
const mockClickDone = jest.fn();

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <TodoCalendar
                  year="2020"
                  month="10"
                  storedTodos={stubtodos}
                  onToggleTodo={mockClickDone}
                />
              )}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetTodos = jest
      .spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
  });

  it('should render TodoCalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.TodoCalendar');
    expect(wrapper.length).toBe(1);
  });

  it(`should handle Click Prev`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.prev');

    const TodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(9);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(8);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(7);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(6);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(5);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(4);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(3);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(2);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(1);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2018);
    expect(TodoCalendarInstance.state.month).toEqual(12);
  });

  it(`should handle Click Next`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.next');

    const TodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(11);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2019);
    expect(TodoCalendarInstance.state.month).toEqual(12);
    wrapper.simulate('click');
    expect(TodoCalendarInstance.state.year).toEqual(2020);
    expect(TodoCalendarInstance.state.month).toEqual(1);
    wrapper.simulate('click');
  });

  it(`should have good 'clickDone'`, () => {
    const spyToggleTodo = jest
      .spyOn(actionCreators, 'toggleTodo')
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar .toggleButton').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});
