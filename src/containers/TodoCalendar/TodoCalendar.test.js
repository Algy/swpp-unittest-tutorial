import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import TodoCalendar from "./TodoCalendar";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/todo";
import Todo from "../../components/Todo/Todo";

jest.mock("../../components/Calendar/Calendar", () => {
  return jest.fn((props) => {
    return (
      <div className="spyCalendar">
        <button className="doneButton" onClick={props.clickDone} />
      </div>
    );
  });
});

const stubInitialState = {
  year: 2019,
  month: 12,
  todos: [
    {
      id: 1,
      title: "TODO_TEST_TITLE_1",
      year: 2019,
      month: 11,
      date: 21,
      done: true,
    },
    {
      id: 2,
      title: "TODO_TEST_TITLE_2",
      year: 2019,
      month: 9,
      date: 1,
      done: false,
    },
    {
      id: 3,
      title: "TODO_TEST_TITLE_3",
      year: 2019,
      month: 9,
      date: 2,
      done: true,
    },
  ],
};

const mockStore = getMockStore(stubInitialState);

describe("<TodoCalendar />", () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <TodoCalendar />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetTodos = jest
      .spyOn(actionCreators, "getTodos")
      .mockImplementation(() => {
        return (dispatch) => {};
      });
  });

  it("should render Calendar components", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".spyCalendar");
    expect(wrapper.length).toBe(1);
  });

  it("should work prev month button", () => {
    const component = mount(todoCalendar);
    const prevBtn = component.find(".prevMonth");
    for (let i = 1; i <= 12; i++) {
      prevBtn.simulate("click");
    }

    const newTodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();

    expect(newTodoCalendarInstance.state.year).toEqual(2018);
    expect(newTodoCalendarInstance.state.month).toEqual(10);
  });

  it("should work next month button", () => {
    const component = mount(todoCalendar);
    const nextBtn = component.find(".nextMonth");
    for (let i = 1; i <= 12; i++) {
      nextBtn.simulate("click");
    }

    const newTodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    expect(newTodoCalendarInstance.state.year).toEqual(2020);
    expect(newTodoCalendarInstance.state.month).toEqual(10);
  });

  it("should call 'clickDone'", () => {
    const spyToggleTodo = jest
      .spyOn(actionCreators, "toggleTodo")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
    const component = mount(todoCalendar);
    const wrapper = component.find(".doneButton").at(0);
    wrapper.simulate("click");
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});