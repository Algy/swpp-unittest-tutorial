import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter,ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

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
          className={`spyCalendarTodo ${todo.done ? 'done':'undone'}`}>
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
    {id: 1, title: 'TODOCALENDER_TEST_TITLE_1', done: false, year: 2019, month: 8, date: 8},
    {id: 2, title: 'TODOCALENDER_TEST_TITLE_2', done: true, year: 2019, month: 9, date: 10},
    {id: 3, title: 'TODOCALENDER_TEST_TITLE_3', done: true, year: 2019, month: 10, date: 11},
    {id: 4, title: 'TODOCALENDER_TEST_TITLE_4', done: false, year: 2019, month: 11, date: 12},
    {id: 5, title: 'TODOCALENDER_TEST_TITLE_5', done: true, year: 2020, month: 0, date: 1},
    {id: 6, title: "TODOCALENDER_TEST_TITLE_6", done: false, year: 2020, month: 1, date: 2}
  ]
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalender, spyGetTodos;

  beforeEach(() => {
    todoCalender = (
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
    const component = mount(todoCalender);
    const wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('TODOCALENDER_TEST_TITLE_2');
    expect(wrapper.hasClass('done')).toBe(true);
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it('should render previous and next months', () => {
    const component = mount(todoCalender);
    let wrapper = null; 
    const wrapperPrevButton = component.find('.handleClickPrev');
    const wrapperNextButton = component.find('.handleClickNext');

    wrapperNextButton.simulate('click');
    wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.text()).toBe('TODOCALENDER_TEST_TITLE_3');

    
    wrapperNextButton.simulate('click');
    wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.text()).toBe('TODOCALENDER_TEST_TITLE_4');

    wrapperNextButton.simulate('click');
    wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.text()).toBe('TODOCALENDER_TEST_TITLE_5');

    wrapperNextButton.simulate('click');
    wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.text()).toBe('TODOCALENDER_TEST_TITLE_6')

    wrapperPrevButton.simulate('click');
    wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.text()).toBe('TODOCALENDER_TEST_TITLE_5');

    wrapperPrevButton.simulate('click');
    wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.text()).toBe('TODOCALENDER_TEST_TITLE_4');
    
    wrapperPrevButton.simulate('click');
    wrapper = component.find('.spyCalendarTodo');
    expect(wrapper.text()).toBe('TODOCALENDER_TEST_TITLE_3');

  });

  it(`should call 'clickDone'`, () => {
    const spyToggleTodo =
      jest.spyOn(actionCreators, 'toggleTodo')
        .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalender);
    const wrapper = component.find('.spyCalendarTodo').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});