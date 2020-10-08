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
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2019,
    month: 9,
    date: 1, dueDate: {
        year: 2020,
        month: 9,
        date: 1
    }},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2019,
    month: 9,
    date: 1, dueDate: {
        year: 2020,
        month: 9,
        date: 1
    }},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2019,
    month: 9,
    date: 1, dueDate: {
        year: 2020,
        month: 9,
        date: 1
    }},
  ],
  selectedTodo: null,
};

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
      return (
        <div className="spyCalendar" year={2020} month={10}>
          <button className="toggleButton" onClick={props.clickDone} />
        </div>);
    });
  });

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar;

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
  })

  it('should render todoCalendar', () => {
    const spytoggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
    .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalendar);
    const wrapperLink = component.find('.link');
    const wrapperHeader = component.find('.header');
    const wrapperCalendar = component.find('.spyCalendar');
    const wrapperButtons = component.find('button');
    const prevButton = wrapperButtons.at(0);
    const nextButton = wrapperButtons.at(1);
    const toggleButton = wrapperButtons.at(2);
    expect(wrapperLink.length).toBe(1);
    expect(wrapperHeader.length).toBe(1);
    expect(wrapperCalendar.length).toBe(1);
    expect(wrapperButtons.length).toBe(3);
    prevButton.simulate('click');
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(9);
    nextButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(10);
    toggleButton.simulate('click');
    expect(spytoggleTodo).toHaveBeenCalledTimes(1);
  });

  it('should render month extreme', () => {
    const component = mount(todoCalendar);
    const wrapperButtons = component.find('button');
    const prevButton = wrapperButtons.at(0);
    const nextButton = wrapperButtons.at(1);
    prevButton.simulate('click');
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(9);
    prevButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(8);
    prevButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(7);
    prevButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(6);
    prevButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(5);
    prevButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(4);
    prevButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(3);
    prevButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(2);
    prevButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(1);
    prevButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2018);
    expect(todoCalendarInstance.state.month).toEqual(12);
    nextButton.simulate('click');
    expect(todoCalendarInstance.state.year).toEqual(2019);
    expect(todoCalendarInstance.state.month).toEqual(1);
  })
});


