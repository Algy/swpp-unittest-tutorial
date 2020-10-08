import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar'

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';
import Calendar from '../../components/Calendar/Calendar';

const stubInitialState = {
  todos: [
    {id: 1, year: 2020, month: 9, date: 30, title: 'TODO_TEST_TITLE_1', done: false},
    {id: 2, year: 2020, month: 9, date: 31, title: 'TODO_TEST_TITLE_2', done: false},
    {id: 3, year: 2019, month: 9, date: 31, title: 'TODO_TEST_TITLE_3', done: false},
    {id: 4, year: 2018, month: 4, date: 6, title: 'TODO_TEST_TITLE_3', done: false},
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalender />', () => {
  // const stubProps = {
  //   year: 2020,
  //   month: 10,
  //   clickDone: true,
  //   todos: [{
  //     year: 2020,
  //     month: 9,
  //     date: 1,
  //     done: true
  //   }]
  // }

  let todoCalendar;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={() => <TodoCalendar/>} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('should render without errors', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.TodoCalendar');
    expect(wrapper.length).toBe(1);
  });

  it('should click prev_month button', () => {
    // const handleClickPrev = jest.fn()
    const component = mount(todoCalendar);
    const wrapper = component.find(".prev_month");
    wrapper.simulate('click')
    const newTodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(newTodoCalendarInstance.state.year).toEqual(2019);
    expect(newTodoCalendarInstance.state.month).toEqual(9);
    // expect(wrapper.length).toBe(1);
  });

  it('should click next_month button', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".next_month");
    wrapper.simulate('click')
    // expect(wrapper.length).toBe(1);
  });

  it('should click toggleTodo button', () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalendar);
    // console.log("component: ", component.debug())
    const wrapper = component.find('.notdone')
    // console.log("wrapper: ", wrapper.debug())
    wrapper.simulate('click')
    expect(spyToggleTodo).toHaveBeenCalledTimes(1);
  });

  
})