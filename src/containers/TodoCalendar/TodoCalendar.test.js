import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Todo/Todo', () => {
  return jest.fn(props => {
    return (
      <div className="spyTodo">
        <div className="title" onClick={props.clickDetail}>
          {props.title}
        </div>
        <button className="doneButton" onClick={props.clickDone} />
        <button className="deleteButton" onClick={props.clickDelete} />
      </div>);
  });
});

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
      return (
        <div className="spyCalendar">
            <div></div>
        </div>);
    });
});

const stubTodos = [{
    id: 0,
    title: 'title 1',
    content: 'content 1',
    year: 2019,
    month: 10,
    date: 8,
    done: false,
  },
  {
    id: 1,
    title: 'title 2',
    content: 'content 2',
    year: 2019,
    month: 10,
    date: 10,
    done: false,
  },
];

const stubInitialState = {
  todos: stubTodos,
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
            render={() => <TodoCalendar storedTodos={stubTodos} />} />
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
    let wrapper = component.find('.spyCalendar');
    expect(wrapper.length).toBe(1);
    wrapper = component.find('div#root');
    expect(wrapper.find('NavLink').length).toBe(1);
    wrapper = wrapper.find('.header');
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it(`should call 'handleClickPrev'`, () => {
    const component = mount(todoCalendar);
    let wrapper = component.find('div#root').find('button').at(0);
    wrapper.simulate('click');
    wrapper = component.find('div.header');
    expect(wrapper.text()).toBe(' prev month 2019.9 next month ');
  });

  it(`should call 'handleClickNext'`, () => {
    const component = mount(todoCalendar);
    let wrapper = component.find('div#root').find('button').at(1);
    wrapper.simulate('click');
    wrapper = component.find('div.header');
    expect(wrapper.text()).toBe(' prev month 2019.11 next month ');
  });

  it(`should update year when 'handleClickNext/Prev' is called with month = 12/1`, () => {
    const component = mount(todoCalendar);
    let wrapper = component.find('div#root').find('button').at(1);
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toBe(2020);
    expect(todoCalendarInstance.state.month).toBe(1);

    wrapper = component.find('div#root').find('button').at(0);
    wrapper.simulate('click');
    expect(todoCalendarInstance.state.year).toBe(2019);
    expect(todoCalendarInstance.state.month).toBe(12);
  });
});