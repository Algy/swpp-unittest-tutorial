import React from "react";
import { shallow, mount } from "enzyme";
import TodoCalendar from "./TodoCalendar";
import Calendar from "../../components/Calendar/Calendar";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import { Table } from "semantic-ui-react";

import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/todo";

jest.mock("../../components/Calendar/Calendar", () => {
  return jest.fn((props) => {
    return (
      <div className="spyCalendar">
        <div className="yearmonth">
          {props.year}.{props.month}
        </div>
        <div className="todos">{props.todos.length !== 0 ? props.todos[0].title : ""}</div>
        <button className="doneButton" onClick={props.clickDone} />
      </div>
    );
  });
});

const stubInitialState = {
  todos: [{ content: "Watch Movie", date: 1, done: false, id: 9, month: 10, title: "Movie", year: 2019 }],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe("<TodoCalendar />", () => {
  let todoCalendar;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            {/* add props? */}
            <Route path="/" exact render={() => <TodoCalendar todos={stubInitialState.todos} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it("should render TodoCalendar", () => {
    const component = mount(todoCalendar);
    expect(component.find(TodoCalendar).length).toBe(1);
    expect(component.find("div.link").length).toBe(1);
    expect(component.find("div.header").length).toBe(1);
  });

  it("should handle click next - and carry up", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".header #next-button").at(0);
    const wrapper2 = component.find(".header").at(0);
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    expect(wrapper2.text()).toBe(" prev month 2020.1 next month ");
  });

  it("should handle click prev - and carry down", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".header #prev-button").at(0);
    const wrapper2 = component.find(".header").at(0);
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    expect(wrapper2.text()).toBe(" prev month 2018.12 next month ");
  });

  it("should call 'clickDone'", () => {
    const spyToggleTodo = jest.spyOn(actionCreators, "toggleTodo").mockImplementation((id) => {
      return (dispatch) => {};
    });
    const component = mount(todoCalendar);
    const wrapper = component.find(".doneButton");
    wrapper.simulate("click");
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});
