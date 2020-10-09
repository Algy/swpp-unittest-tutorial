import React from "react";
import { shallow } from "enzyme";
import Calendar from "./Calendar";
import { Table } from "semantic-ui-react";

describe("<Calendar />", () => {
  it("should render without errors", () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(".Calendar");
    expect(wrapper.length).toBe(1);
  });

  it("should set dates proper to year and month", () => {
    const year = 2020;
    const month = 10;
    const component = shallow(<Calendar year={year} month={month} todos={[]} />);
    expect(component.find(Table.Cell).length).toBe(35);
    expect(component.find(".date").length).toBe(new Date(year, month, 0).getDate());
  });

  // it("should render title as done if done=true", () => {
  //   const component = shallow(<Calendar done={true} title={"TEST_TITLE"} />);
  //   const wrapper = component.find(".done");
  //   expect(wrapper.text()).toEqual("TEST_TITLE");
  // });

  it("should handle todo clicks", () => {
    const year = 2019;
    const month = 2;
    const stubTodo = [
      { content: "take swpp class", date: 1, done: false, id: 8, month: 1, title: "SWPP1", year: 2019 },
      { content: "take swpp practice class", date: 1, done: true, id: 8, month: 1, title: "SWPP2", year: 2019 },
    ];
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={year} month={month} todos={stubTodo} clickDone={mockClickDone} />);
    const wrapper1 = component.find(".todoTitle.notdone");
    wrapper1.simulate("click");
    expect(mockClickDone).toHaveBeenCalledTimes(1);
    const wrapper2 = component.find(".todoTitle.notdone");
    wrapper2.simulate("click");
    expect(mockClickDone).toHaveBeenCalledTimes(2);
  });
});
