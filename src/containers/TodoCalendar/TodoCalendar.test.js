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
      </div>);
  });
});

const stubTodos = [
  {id: 0, title: 'TODO_TEST_TITLE_1', content: 'TODO_TEST_CONTENT_1', 
      done: false, year: 2020, month: 11, date: 3},
  {id: 1, title: 'TODO_TEST_TITLE_3', content: 'TODO_TEST_CONTENT_3', 
      done: false, year: 2020, month: 9, date: 20},
];

const stubInitialState = {
    todos: [
      {id: 0, title: 'TODO_TEST_TITLE_1', content: 'TODO_TEST_CONTENT_1', 
        done: false, year: 2020, month: 11, date: 3},
      {id: 1, title: 'TODO_TEST_TITLE_3', content: 'TODO_TEST_CONTENT_3', 
        done: false, year: 2020, month: 9, date: 20},
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
            render={() => <TodoCalendar 
                year="2020"
                month="10"
                storedTodos={stubTodos}
              />} 
          />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  })

  afterEach(() => jest.clearAllMocks())

  it('should render TodoCalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar');
    expect(wrapper.length).toBe(1);
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it('should handle Click Previous Button', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(0);
    wrapper.simulate('click');
    const wrapper2 = component.find('div.header');
    expect(wrapper2.text()).toBe(' prev month 2019.9 next month ');
  });

  it('should handle Click Next Button', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(1);
    wrapper.simulate('click');
    const wrapper2 = component.find('div.header');
    expect(wrapper2.text()).toBe(' prev month 2019.11 next month ');
  });

  it('should go to next year when it is December', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(1); //Next Button
    wrapper.simulate('click');
    wrapper.simulate('click');
    const wrapper2 = component.find('div.header');
    expect(wrapper2.text()).toBe(' prev month 2019.12 next month ');
    wrapper.simulate('click');

    // Access to the state.year & state.month
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toBe(2020);
    expect(todoCalendarInstance.state.month).toBe(1);
  });

  it('should go to previous year when it is January', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(1); //Next Button
    wrapper.simulate('click');
    wrapper.simulate('click');
    const wrapper2 = component.find('div.header');
    expect(wrapper2.text()).toBe(' prev month 2019.12 next month ');
    wrapper.simulate('click');

    // Now it is 2020/01

    const wrapper3 = component.find('button').at(0); //Previous Button
    wrapper3.simulate('click');
    expect(wrapper2.text()).toBe(' prev month 2019.12 next month ');
  });




});

