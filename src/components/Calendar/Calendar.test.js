import React from "react";
import { shallow } from "enzyme";
import Calendar from "./Calendar";

const stubTodos = [
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
];

describe("<Calendar />", () => {
  it("should render calender", () => {
    const component = shallow(<Calendar />);
    const table = component.find("Table");
    expect(table.length).toBe(1);
  });

  it("should render sunday", () => {
    const component = shallow(
      <Calendar year={2019} month={10} todos={stubTodos} />
    );
    const sunday = component.find(".sunday");
    expect(sunday.length).toBe(5);
  });

  it("should call 'clickDone'", () => {
    const mockClickDone = jest.fn();
    const component = shallow(
      <Calendar
        year={2019}
        month={10}
        todos={stubTodos}
        clickDone={mockClickDone}
      />
    );
    const wrapper = component.find(".todoTitle").at(0);
    wrapper.simulate("click");
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });

  it("should render done if done=true", () => {
    const component = shallow(
      <Calendar year={2019} month={10} todos={stubTodos} />
    );
    const doneWrapper = component.find(".done");
    expect(doneWrapper.length).toBe(1);
    expect(doneWrapper.text()).toEqual("TODO_TEST_TITLE_3");
  });

  it("should render notdone if done=false", () => {
    const component = shallow(
      <Calendar year={2019} month={10} todos={stubTodos} />
    );
    const notdoneWrapper = component.find(".notdone");
    expect(notdoneWrapper.length).toBe(1);
    expect(notdoneWrapper.text()).toEqual("TODO_TEST_TITLE_2");
  });
});