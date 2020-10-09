import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';

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

describe('<Calendar />', () => {
  it('should render without erros', () => {
    const component = shallow(
      <Calendar todos={stubtodos} year={2020} month={10} />
    );
    const wrapper = component.find('.cell');
    expect(wrapper.length).toBe(31);
  });

  it('should render notdone ', () => {
    const component = shallow(
      <Calendar year={2020} month={11} todos={stubtodos} />
    );
    console.log(component.debug());
    const wrapper = component.find('.notdone');
    expect(wrapper.length).toBe(1);
  });

  it('should render done ', () => {
    const component = shallow(
      <Calendar year={2020} month={11} todos={stubtodos} />
    );
    const wrapper = component.find('.done');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click1 ', () => {
    const mockClickDone = jest.fn();
    const component = shallow(
      <Calendar
        year={2020}
        month={11}
        todos={stubtodos}
        clickDone={mockClickDone}
      />
    );
    const wrapper = component.find('.done');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });

  it('should handle click2 ', () => {
    const mockClickDone = jest.fn();
    const component = shallow(
      <Calendar
        year={2020}
        month={11}
        todos={stubtodos}
        clickDone={mockClickDone}
      />
    );
    const wrapper = component.find('.notdone');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});
