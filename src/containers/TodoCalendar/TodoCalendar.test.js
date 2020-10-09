import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import TodoCalendar from "./TodoCalendar";
import * as actionCreators from '../../store/actions/todo';

jest.mock("../../components/Calendar/Calendar", () => {
  return jest.fn(props => {
    return (
      <button className="toggle" onClick={props.clickDone}></button>
    );
  });
});

const stubInitialState = {
  year: 2020,
  month: 10,
};

const mockStore = getMockStore(stubInitialState);

describe("<TodoCalendar />", () => {
  let todoCalendar;

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
  });

  it("should render without errors", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(TodoCalendar);
    expect(wrapper.length).toBe(1);
  });

  it("should properly handle clicking prev month button", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".prev");
    for (let i = 0; i < 10; i++)
      wrapper.simulate("click");
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.month).toEqual(12);
  });

  it("should properly handle clicking next month button", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".next");
    for (let i = 0; i < 3; i++)
      wrapper.simulate("click");
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.month).toEqual(1);
  });

  it("should toggle todo", () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => {
        return dispatch => { };
      });
    const component = mount(todoCalendar);
    const wrapper = component.find(".toggle");
    wrapper.simulate("click");
    expect(spyToggleTodo).toHaveBeenCalledTimes(1);
  });
});
