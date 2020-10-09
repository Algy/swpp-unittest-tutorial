import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import * as actionCreators from '../../store/actions/todo';
import TodoCalendar from './TodoCalendar';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';


jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
      return (
        <div className="spyCalendar"
          year={props.year}
          month={props.month}
          todos={props.storedTodos}>
        </div>);
    });
  });

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
    let todoCalendar, spyGetTodos;

    beforeEach(() => {
      todoCalendar = (
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact
              render={() => <TodoCalendar />} />
          </Switch>
          </ConnectedRouter>
        </Provider>
      );
      spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
        .mockImplementation(() => { return dispatch => {}; });
    })

    it('should render TodoCalendar', () => {
      const component = mount(todoCalendar);
      const wrapper = component.find('.spyCalendar');
      expect(wrapper.length).toBe(1);
      expect(spyGetTodos).toBeCalledTimes(1);
    });

    it('should render Calendar', () =>{
      const component = mount(todoCalendar);
      const wrapper = component.find('.spyCalendar');
      const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
      expect(wrapper.length).toBe(1);
      expect(wrapper.prop('year')).toEqual(todoCalendarInstance.state.year);
      expect(wrapper.prop('month')).toEqual(todoCalendarInstance.state.month);
    })

    it(`should call 'handleClickPrev' function`, () => {
      const component = mount(todoCalendar);
      const wrapper = component.find('#prevMonthButton');
      for(let i=0; i<10; i++)
        wrapper.simulate('click');
      const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
      expect(todoCalendarInstance.state.year).toEqual(2018);
      expect(todoCalendarInstance.state.month).toEqual(12);

    });

    it(`should call 'handleClickNext' function`, () => {
      const component = mount(todoCalendar);
      const wrapper = component.find('#nextMonthButton');
      wrapper.simulate('click');
      wrapper.simulate('click');
      wrapper.simulate('click');
      const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
      expect(todoCalendarInstance.state.year).toEqual(2020);
      expect(todoCalendarInstance.state.month).toEqual(1);
    });

    it(`should call 'clickDone'`, () => {
      const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
        .mockImplementation(id => { return dispatch => {}; });
      const component = mount(todoCalendar);
      const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
      todoCalendarInstance.props.onToggleTodo(0);
      expect(spyToggleTodo).toHaveBeenCalledTimes(1);
    });
  }); 