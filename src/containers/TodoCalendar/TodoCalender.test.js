import React from 'react';
import { shallow, mount } from 'enzyme';
import TodoCalendar from "./TodoCalendar";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../../store/store";
import * as actionCreators from "../../store/actions/todo";
import { Route, Redirect, Switch } from 'react-router-dom';
import {Provider} from "react-redux";
import {getMockStore} from "../../test-utils/mocks";
import Todo from "../../components/Todo/Todo";

const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', year: 2020, month: 10, date: 1, done: false},
    {id: 2, title: 'TODO_TEST_TITLE_2', year: 2020, month: 9, date: 1, done: false},
    {id: 3, title: 'TODO_TEST_TITLE_3', year: 2020, month: 11, date: 1, done: false},
  ],
  selectedTodo: null,
};

jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn(props => {
    return (
      <button className="testButton" onClick={props.clickDone} />
    );
  });
});

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos, spyToggleTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact
                   render={() => <TodoCalendar />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
    spyToggleTodos = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render TodoCalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.header');
    expect(wrapper.length).toBe(1);
  });

  it('should handle clicks1', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(0);
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
  });

  it('should handle clicks2', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(1);
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
  });


  it('should handle onToggleTodo', () => {
    const component = mount(todoCalendar);
    // console.log(component.debug())
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const wrapper = component.find('.testButton').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });

})
