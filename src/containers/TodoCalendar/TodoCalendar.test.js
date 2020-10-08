import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn(props => {
    const spyTodos =
      props.todos
      .filter(todo =>
        (props.year === todo.year) && (props.month - 1 === todo.month))
      .map(todo => {
      return (
        <div key={todo.id} onClick={() => props.clickDone(todo.id)}
          className={`spyCalendarTodo ${todo.done ? 'done':'notdone'}`}>
          {todo.title}
        </div>
      );
    });
    return (
      <div className="spyCalendar">
        {spyTodos}
      </div>
    );
  });
});

const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2019, month: 9, date: 13},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: true, year: 2019, month: 9, date: 17},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: true, year: 2019, month: 10, date: 8},
    {id: 4, title: 'TODO_TEST_TITLE_4', done: false, year: 2019, month: 11, date: 12},
    {id: 5, title: 'TODO_TEST_TITLE_5', done: true, year: 2020, month: 0, date: 11}
  ]
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact render={() => <TodoCalendar />} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  });

  it('should render todo calendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.length).toBe(2);
    expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
    expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2');
    expect(wrapper.at(1).hasClass('done')).toBe(true);
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it('should render previous and next months', () => {
    const component = mount(todoCalendar);
    const prevBtn = component.find('#calPrevButton');
    const nextBtn = component.find('#calNextButton');
    let wrapper = null;

    nextBtn.simulate('click');
    wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.text()).toBe('TODO_TEST_TITLE_3');

    nextBtn.simulate('click');
    nextBtn.simulate('click');

    prevBtn.simulate('click');
    wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.text()).toBe('TODO_TEST_TITLE_4');
    prevBtn.simulate('click');
    wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.text()).toBe('TODO_TEST_TITLE_3');
  });

  it(`should call 'clickDone'`, () => {
    const spyToggleTodo =
      jest.spyOn(actionCreators, 'toggleTodo')
        .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendarTodo').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});
