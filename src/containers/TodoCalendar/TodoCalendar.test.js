import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';
import { className } from 'postcss-selector-parser';
import { tsDeclareFunction } from '@babel/types';

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
        const dates=props.todos.map(todo=>{
                return(
                    <div className="date" key={todo.date}>
                        <div
                        key={todo.id}
                        className={`todoTitle ${todo.done ? 'done':'notdone'}`}
                        onClick={() => props.clickDone(todo.id)}>
                        {todo.title}
                        </div>
                    </div>
                )
            })
      return (
        <div className="spyCalender">
            {dates}
        </div>);
    });
  });
const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2019, month:9, date:1},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2019, month:9, date:2},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: true, year: 2019, month:9, date:3},,
  ],
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todocalendar, spyGetTodos;

  beforeEach(() => {
    todocalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact
            render={() => <TodoCalendar title="TODOCALENDER_TEST_TITLE" />} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render TodoCalendar', () => {
    const component = mount(todocalendar);
    let wrapper = component.find('.date');
    expect(wrapper.length).toBe(3);
    wrapper = component.find('div.todoTitle.notdone')
    expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
    expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2');
    wrapper = component.find('div.todoTitle.done')
    expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_3');
    expect(spyGetTodos).toBeCalledTimes(1);
  });
  it(`should call 'handleClickPrev'`, () => {
    const component = mount(todocalendar);
    const wrapper = component.find('.header button').at(0);
    wrapper.simulate('click');
    const newcal = component.find(TodoCalendar.WrappedComponent).instance();
    expect(newcal.state.month).toEqual(9);
    expect(newcal.state.year).toEqual(2019);
    for(let i=0; i<9; i++)
        wrapper.simulate('click');
    const changyear = component.find(TodoCalendar.WrappedComponent).instance();
    expect(changyear.state.month).toEqual(12);
    expect(changyear.state.year).toEqual(2018);
  });
  it(`should call 'handleClickNext'`, () => {
    const component = mount(todocalendar);
    const wrapper = component.find('.header button').at(1);
    wrapper.simulate('click');
    const newcal = component.find(TodoCalendar.WrappedComponent).instance();
    expect(newcal.state.month).toEqual(11);
    expect(newcal.state.year).toEqual(2019);
    for(let i=0; i<2; i++)
        wrapper.simulate('click');
    const changyear = component.find(TodoCalendar.WrappedComponent).instance();
    expect(changyear.state.month).toEqual(1);
    expect(changyear.state.year).toEqual(2020);
  });
  it(`should call 'clickDone'`, () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todocalendar);
    const wrapper = component.find('.todoTitle.notdone').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});

