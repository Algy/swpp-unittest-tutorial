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
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, 
      year: 2019,
      month: 9,
      date: 1,
    },
    {id: 2, title: 'TODO_TEST_TITLE_2', done: true, 
      year: 2019,
      month: 9,
      date: 2,
    },
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, 
      year: 2019,
      month: 9,
      date: 3,
    },
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
    );
  })

  it('should render TodoCalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.link');
    expect(wrapper.length).toBe(1);
    const wrapper2 = component.find('.header');
    expect(wrapper2.length).toBe(1);
  });

  it('should click prev month/next month buttons', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button');
    wrapper.at(1).simulate('click');
    const wrapper2 = component.find('.header');
    let year = wrapper2.children().at(1).text();
    let month = wrapper2.children().at(3).text();
    expect(month).toBe('11');
    wrapper.at(0).simulate('click');
    const wrapper3 = component.find('.header');
    year = wrapper3.children().at(1).text();
    month = wrapper3.children().at(3).text();
    expect(month).toBe('10');
  });

  it('should click prev month 12 times', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button');
    for (var i=0; i<12; i++) {
      wrapper.at(0).simulate('click');
    }
    const wrapper2 = component.find('.header');
    let year = wrapper2.children().at(1).text();
    expect(year).toBe('2018');
  });

it('should click next month 12 times', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button');
    for (var i=0; i<12; i++) {
      wrapper.at(1).simulate('click');
    }
    const wrapper2 = component.find('.header');
    let year = wrapper2.children().at(1).text();
    expect(year).toBe('2020');
  });

  it(`should call 'clickDone'`, () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalendar);
    const wrapper = component.find('.done').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });

});