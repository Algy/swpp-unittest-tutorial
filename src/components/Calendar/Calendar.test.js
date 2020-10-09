import React from 'react';
import { mount, shallow } from 'enzyme';
import Calendar from './Calendar';
import { getMockStore } from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/todo';

const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: true, year: 2020, month: 1, date: 1},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2020, month: 1, date: 31},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2020, month: 1, date: 27},
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<Calendar />', () => {
  let calendar, spyToggleTodo, spyGetTodos;

  beforeEach(() => {
    spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    calendar = (
      <Calendar
            year={2020}
            month={1}
            todos={stubInitialState.todos}
            clickDone={spyToggleTodo}
          />
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.Calendar');
  });

  it('should render Calendar', () => {
    const component = mount(calendar);
    let wrapper = component.find('.sun').at(0);
    expect(wrapper.text()).toBe('Sun')
    wrapper = component.find('.mon').at(0);
    expect(wrapper.text()).toBe('Mon')
    wrapper = component.find('.tue').at(0);
    expect(wrapper.text()).toBe('Tue')
    wrapper = component.find('.wed').at(0);
    expect(wrapper.text()).toBe('Wed')
    wrapper = component.find('.thu').at(0);
    expect(wrapper.text()).toBe('Thu')
    wrapper = component.find('.fri').at(0);
    expect(wrapper.text()).toBe('Fri')
    wrapper = component.find('.sat').at(0);
    expect(wrapper.text()).toBe('Sat')
  });
});
