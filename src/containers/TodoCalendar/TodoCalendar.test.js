import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
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

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={TodoCalendar} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render Calendar', () => {
    const component = mount(todoCalendar);
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it(`should decrement month on 'handleClickPrev'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(0);
    wrapper.simulate('click');
    expect(component.find('.header').text()).toBe(" prev month 2019.9 next month ");
  });

  it(`should change year and month on 'handleClickPrev'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(0);
    for(let i=0; i<10; i++) wrapper.simulate('click');
    expect(component.find('.header').text()).toBe(" prev month 2018.12 next month ");
  });

  it(`should increment month on 'handleClickNext'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(1);
    wrapper.simulate('click');
    expect(component.find('.header').text()).toBe(" prev month 2019.11 next month ");
  });

  it(`should change year and month on 'handleClickNext'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(1);
    for(let i=0; i<3; i++) wrapper.simulate('click');
    expect(component.find('.header').text()).toBe(" prev month 2020.1 next month ");
  });
});

