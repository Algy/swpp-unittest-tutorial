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
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos, spyToggleTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact
                   render={() => <TodoCalendar onGetAll={()=>{}} />}
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
    // expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
    // expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2');
    // expect(wrapper.at(2).text()).toBe('TODO_TEST_TITLE_3');
    // expect(spyGetTodos).toBeCalledTimes(1);
  });

  it('should handle clicks1', () => {
    const mockClickDone = jest.fn();
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(0);
    wrapper.simulate('click');
    // expect(mockClickDone).toHaveBeenCalledTimes(1);
  });

  it('should handle clicks2', () => {
    const mockClickDone = jest.fn();
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(1);
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    // expect(mockClickDone).toHaveBeenCalledTimes(1);
  });


})
