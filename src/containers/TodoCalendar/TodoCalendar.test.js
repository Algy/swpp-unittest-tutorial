import React from 'react';
import { shallow, mount } from 'enzyme';

import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import Calendar from '../../components/Calendar/Calendar';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';


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
  let todoCalendar;
  
  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact  render={() => <TodoCalendar />} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('should render TodoCalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.TodoCalendar');
    expect(wrapper.length).toBe(1);
  });

  it('should call getTodos on render', () => {
    const spyPostTodo = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(td => { return dispatch => {}; });
    const component = mount(todoCalendar);
    expect(spyPostTodo).toHaveBeenCalledTimes(1);
  });

  it('should render link to todos without errors', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.link');
    expect(wrapper.length).toBe(1);
  });

  it('should render header without errors', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.header');
    expect(wrapper.length).toBe(1);
  });

  it('should render prevMonth button without errors', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.prevMonth');
    expect(wrapper.length).toBe(1);
  });

  it('should render nextMonth button without errors', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.nextMonth');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click prevMonth button event without errors', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.prevMonth');
    wrapper.simulate('click');
    const newTodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(newTodoCalendarInstance.state.month).toEqual(9);
  });

  it('should handle click nextMonth button event without errors', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.nextMonth');
    wrapper.simulate('click');
    const newTodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(newTodoCalendarInstance.state.month).toEqual(11);
  });

  it('should render Calendar without errors', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(Calendar);
    expect(wrapper.length).toBe(1);
  });
});
