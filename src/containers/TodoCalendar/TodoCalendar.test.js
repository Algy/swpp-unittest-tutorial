import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<NewTodo />', () => {
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
    const wrapper = component.find('TodoCalendar');

    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
    });

    it('should button click good', () => {
        const component = mount(todoCalendar);

        const wrapper = component.find('button#prev-month');
        wrapper.simulate('click');
        const instance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(instance.state.year).toEqual(2019);
    });

    it('should button click good2', () => {
        const component = mount(todoCalendar);
    
        const wrapper = component.find('button#next-month');
        wrapper.simulate('click');
        const instance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(instance.state.year).toEqual(2019);
    });
});


