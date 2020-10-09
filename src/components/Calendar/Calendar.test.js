import React from "react";
import { mount } from "enzyme";

import Calendar from "./Calendar";

describe("<Calendar />", () => {
  let calendar;
  const mockClickDone = jest.fn();

  beforeEach(() => {
    calendar = <Calendar
      year={2020}
      month={11}
      todos={[
        {
          id: 1,
          title: "title 1",
          content: "content 1",
          year: 2020,
          month: 10,
          date: 9,
          done: true,
        },
        {
          id: 2,
          title: "title 2",
          content: "content 2",
          year: 2020,
          month: 10,
          date: 9,
          done: false,
        }
      ]}
      clickDone={mockClickDone} />
  });

  afterEach(jest.clearAllMocks);

  it("should render without errors", () => {
    const component = mount(calendar);
    const wrapper = component.find(Calendar);
    expect(wrapper.length).toBe(1);
  });

  it("should click todos properly", () => {
    const component = mount(calendar);
    const wrapper = component.find(".todoTitle.done");
    wrapper.simulate("click");
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});
