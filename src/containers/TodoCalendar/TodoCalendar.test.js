import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar.js';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar.js', () => {
  return jest.fn(props => {
    return (
      <div className="spyCalendar">
        <div className="title" onClick={props.clickDetail}>
          {props.title}
        </div>
        <button className="done-calendar" onClick={props.clickDone} />
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
                    <Route path='/' exact component={TodoCalendar} />
                </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(id => { return dispatch => {}; });
     });

    it('should render TodoCalendar', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.TodoCalendar');
        expect(wrapper.length).toBe(1);
    }); 

    it('should decrease the month', () => {
       
        const spyPrevHandler = jest.fn();
        const component = mount(todoCalendar);
        const wrapper = component.find('.prevButton');
        wrapper.simulate('click');
        const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.month).toBe(9);
    });
    
    it('should increase the month', () => {
       
        const spyNextHandler = jest.fn();
        const component = mount(todoCalendar);
        const wrapper = component.find('.nextButton');
        wrapper.simulate('click');
        const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.month).toBe(11);
    });
    
    it('should increase the year', () => {
       
        const spyNextHandler = jest.fn();
        const component = mount(todoCalendar);
        const wrapper = component.find('.nextButton');
        wrapper.simulate('click');
        wrapper.simulate('click');
        wrapper.simulate('click');
        const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.year).toBe(2020);
    });
 
    it('should decrease the year', () => {
       
        const spyPrevHandler = jest.fn();
        const component = mount(todoCalendar);
        const wrapper = component.find('.prevButton');
        for(let i=0; i<11; i++){
            wrapper.simulate('click');
        }
        const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.year).toBe(2018);
    });
    
    it('toggle todo should be called', () => {

        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(id => { return dispatch => {}; });
        const component = mount(todoCalendar);
        const wrapper = component.find('.done-calendar');
        wrapper.simulate('click');
        expect(spyToggleTodo).toBeCalledTimes(1);
    });
    
})
