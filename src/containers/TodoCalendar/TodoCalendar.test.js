import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import Calendar from '../../components/Calendar/Calendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';


jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn(props => {
    return(
      <div className="spyCalendar"
        year={props.year}
        month={props.month}
        todos={props.todos}>
      </div>
    );
  });
});

const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
  ],
  selectedTodo: null,
  year: 2019, month: 10,
};
const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos;
  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch> 
            <Route path='/' exact render={() => <TodoCalendar/>}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
  .mockImplementation(() => {return dispatch=>{}; });
  })
 
  it('should render TodoCalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.TodoCalendar');
    expect(wrapper.length).toBe(1);
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it('should be clicked when the handleClickPrev button clicked', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.prevButton');
    for(let i=1; i<12; i++) wrapper.simulate('click');
    const TodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(TodoCalendarInstance.state.month).toBe(stubInitialState.month+1);
    expect(TodoCalendarInstance.state.year).toBe(stubInitialState.year-1);
  });

  it('should be clicked when the handleClickNext button clicked', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.nextButton');
    for(let i=1; i<12; i++) wrapper.simulate('click');
    const TodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(TodoCalendarInstance.state.month).toBe(stubInitialState.month-1);
    expect(TodoCalendarInstance.state.year).toBe(stubInitialState.year+1);
  });

  it('should be called ToggleTodo action when the Calendar-todo is clicked', () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
    .mockImplementation((id) => {return dispatch=>{}; });
    const component = mount(todoCalendar);
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    todoCalendarInstance.props.onToggleTodo(1);
    expect(spyToggleTodo).toHaveBeenCalledTimes(1);
  });
});