import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { NavLink } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Calendar from '../../components/Calendar/Calendar';

import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/todo';
import TodoCalendar from './TodoCalendar'
import { Table } from 'semantic-ui-react'


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
            <Route path='/' exact component={TodoCalendar} />
          </Switch>
          </ConnectedRouter>
        </Provider>
      )
    })

    it('should render TodoCalendar', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.TodoCalendar');
        expect(wrapper.length).toBe(0);
      });

    it(`should call 'handleClickPrev'`, () => {
      const year = 2019
      const component = mount(todoCalendar);
      const wrapper = component.find('button').at(0)
      wrapper.simulate('click')
      const TodoInstance = component.find(TodoCalendar.WrappedComponent).instance();
      expect(TodoInstance.state.year).toEqual(year);
    });

    it(`should call 'handleClickNext'`, () => {
      const year = 2019
      const component = mount(todoCalendar);
      const wrapper = component.find('button').at(1)
      wrapper.simulate('click')
      const TodoInstance = component.find(TodoCalendar.WrappedComponent).instance();
      expect(TodoInstance.state.year).toEqual(year);
    });

    it(`should call 'clickDone'`, () => {
      const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
        .mockImplementation(id => { return dispatch => {}; });
      const component = mount(todoCalendar);
      const wrapper = component.find('.todoTitle notdone');
      wrapper.simulate('click');
      expect(spyToggleTodo).toBeCalledTimes(1);
    });
});
