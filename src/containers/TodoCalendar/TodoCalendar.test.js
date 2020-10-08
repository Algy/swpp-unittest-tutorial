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
          <div className="yearmonth">
            {props.year}.{props.month}
          </div>
          <div className="todos">
              {props.todos.length !==0 ? props.todos[0].title : '' }
          </div>
          <button className="doneButton" onClick={props.clickDone} />
        </div>);
    });
});


const stubInitialState = {
    todos: [
        {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2019, month: 9, date: 9},
        {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2019, month: 9, date: 27},
        {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2019, month: 9, date: 11},
    ],
    selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoList />', () => {
  let todoCalendar, spyGetTodos;
  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact
            component={TodoCalendar} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render TodoCalendar', ()=>{
      const component = mount(todoCalendar);
      const wrapper = component.find('.header');
      expect(wrapper.length).toBe(1);

  })

  it('should render Calendar', ()=>{
      const component = mount(todoCalendar);
      const wrapper = component.find('.Calendar');
      expect(wrapper.length).toBe(1);
      expect(wrapper.at(0).text()).toBe('2019.10TODO_TEST_TITLE_1');
  })

  it('should call clickDone', ()=>{
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
    .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar .doneButton').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  })

  it('should handle click prev', ()=>{
      const component = mount(todoCalendar);
      const wrapper = component.find('.header #prev-button').at(0);
      const wrapper2 = component.find('.header').at(0);
      wrapper.simulate('click');
      expect(wrapper2.text()).toBe(' prev month 2019.9 next month ');
      wrapper.simulate('click');
      wrapper.simulate('click');
      wrapper.simulate('click');
      wrapper.simulate('click');
      wrapper.simulate('click');
      wrapper.simulate('click');
      wrapper.simulate('click');
      wrapper.simulate('click');
      wrapper.simulate('click');
      expect(wrapper2.text()).toBe(' prev month 2018.12 next month ');
  })

  it('should handle click next', ()=>{
    const component = mount(todoCalendar);
    const wrapper = component.find('.header #next-button').at(0);
    const wrapper2 = component.find('.header').at(0);
    wrapper.simulate('click');
    expect(wrapper2.text()).toBe(' prev month 2019.11 next month ');
    wrapper.simulate('click');
    wrapper.simulate('click');
    expect(wrapper2.text()).toBe(' prev month 2020.1 next month ');
})

})
