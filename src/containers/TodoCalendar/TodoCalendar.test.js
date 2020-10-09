import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar.js';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn((props) => {
      return (
        <div className="spyCalendar">
          {props.year}.{props.month}
          <button onClick={props.clickDone} />
        </div>
      );
    });
  });

const stubState = {
    todos:[
        {id: 1, title: 'Finish assignment', done: false, year: 2020, month:10, date:6},
        {id: 2, title: 'Go home', done: true, year: 2020, month:10, date:7},
        {id: 3, title: 'Sleep', done: true, year: 2020, month:10, date:8}
    ]
}

const mockStore = getMockStore(stubState);
let todoCalendar, spyGetTodos;

describe('<TodoCalendar />', () => {
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
            .mockImplementation(id => { return dispatch => {}; });
    });

    it('should render without errors', () => {
        const component = mount(todoCalendar);
        console.log(component.debug());
        const wrapper = component.find('.spyCalandar');
        expect(wrapper.length).toBe(1);
    });

    it(`should decrease month`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.prevButton');
        wrapper.simulate('click');
        const prevMonth = component.find(TodoCalendar.WrappedComponent).instance();
        expect(prevMonth.state.month).toEqual(9);
        for(let i=0; i<10; i++) wrapper.simulate('click');
        const prevYear = component.find(TodoCalendar.WrappedComponent).instance();
        expect(prevYear.state.year).toEqual(2018);
    });

    it(`should increase month`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.nextButton');
        wrapper.simulate('click');
        const nextMonth = component.find(TodoCalendar.WrappedComponent).instance();
        expect(nextMonth.state.month).toEqual(11);
        for(let i=0; i<10; i++) wrapper.simulate('click');
        const nextYear = component.find(TodoCalendar.WrappedComponent).instance();
        expect(nextYear.state.year).toEqual(2021);
    });

    it(`should call 'clickDone'`, () => {
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
          .mockImplementation(id => { return dispatch => {}; });
        const component = mount(todoCalendar);
        const wrapper = component.find('.todoTitle.notdone');
        wrapper.simulate('click');
        expect(spyToggleTodo).toBeCalledTimes(1);
    });
});