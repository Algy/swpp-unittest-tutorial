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
      <div className="spyCalendar">
        <div className="calendar">
          {/* {props.title} */}
          <div className="year">{props.year}</div>
          <div className="month">{props.month}</div>
        </div>
        <button className="doneButton" onClick={props.clickDone}>Done</button>
      </div>);
  });
});

const stubInitialState = {
  year: 2020,
  month: 9,
  date: 13,
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year:2020, month:9, date:3}, 
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year:2020, month:9, date:11},
  ],
  storedTodos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year:2020, month:9, date:3}, 
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year:2020, month:9, date:11},
  ],
  onToggleTodo: jest.fn(),
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    const mockClickDone = jest.fn();

    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact
            render={() => <TodoCalendar onToggleTodo={mockClickDone} year={stubInitialState.year} month={stubInitialState.month} storedTodos={stubInitialState.todos}/>} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render calendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar');
    expect(wrapper.length).toBe(1);
  });

  it(`should have link to todo`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.link');
    wrapper.simulate('click');
    expect(wrapper.length).toBe(1);
  });

  it(`should have prev/next buttons`, () => {
    const component = mount(todoCalendar);
    const header = component.find('.header');
    const wrapper = header.find('button')
    expect(wrapper.length).toBe(2);
  });


  it(`prev button should work`, () => {
    const component = mount(todoCalendar);
    const header = component.find('.header');
    const wrapper = header.find('button').at(0)
    for(let i=0; i<13; i++){
      wrapper.simulate('click');
    }
    expect(header.text()).toEqual(' prev month 2018.9 next month ');
    const child= component.find('.month');
    expect(child.text()).toEqual('9');
  });


  it(`next button should work`, () => {
    const component = mount(todoCalendar);
    const header = component.find('.header');
    const wrapper = header.find('button').at(1)
    for(let i=0; i<13; i++){
      wrapper.simulate('click');
    }
    expect(header.text()).toEqual(' prev month 2020.11 next month ');
  });


  it('should handle onToggleTodo', () => {
    const component = mount(todoCalendar);
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(() => { return dispatch => {}; });
    const wrapper = component.find('.doneButton').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalled();
  });



});

