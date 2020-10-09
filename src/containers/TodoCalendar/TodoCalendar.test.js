import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn(props => {
    return (
      < div className="spyCalendar"
        year={props.year}
        month={props.month}
        todos={props.storedTodos}>
        </div>
    )
  })
})

const stubInitialState = {
  todos: [
    { id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2020, month: 1, date: 1 },
    { id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2020, month: 2, date: 10 },
    { id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2020, month: 5, date: 20 },
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    todoCalendar = (
      < Provider store={mockStore} >
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact render={() => <TodoCalendar />} />
          </Switch>
        </ConnectedRouter>
      </Provider >
    )
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render TodoCalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar');
    expect(wrapper.length).toBe(1);
  });

  it('should call handleClickPrev', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('#prevMon');
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    for (let i = 0; i < 12; i++) {
      wrapper.simulate('click');
    }
    expect(todoCalendarInstance.state.year).toEqual(2018);
    expect(todoCalendarInstance.state.month).toEqual(10);
  });

  it('should call handleClickNext', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('#nextMon');
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    for (let i = 0; i < 12; i++) {
      wrapper.simulate('click');
    }
    expect(todoCalendarInstance.state.year).toEqual(2020);
    expect(todoCalendarInstance.state.month).toEqual(10);

  });
})
