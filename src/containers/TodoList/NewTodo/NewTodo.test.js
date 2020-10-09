import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import NewTodo from './NewTodo';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/todo';

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
  let newTodo;

  beforeEach(() => {
    newTodo = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={NewTodo} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('should render NewTodo', () => {
    const component = mount(newTodo);
    const wrapper = component.find('.NewTodo');
    expect(wrapper.length).toBe(1);
  });

  it(`should call 'postTodo'`, () => {
    const spyPostTodo = jest.spyOn(actionCreators, 'postTodo')
      .mockImplementation(td => { return dispatch => {}; });
    const component = mount(newTodo);
    const wrapper = component.find('button');
    wrapper.simulate('click');
    expect(spyPostTodo).toHaveBeenCalledTimes(1);
  });
  
  it(`should set state properly on title input`, () => {
    const title = 'TEST_TITLE';
    const component = mount(newTodo);
    const wrapper = component.find('#text_title');
    wrapper.simulate('change', { target: { value: title } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual(title);
    expect(newTodoInstance.state.content).toEqual('');
  });

  it(`should set state properly on content input`, () => {
    const content = 'TEST_CONTENT';
    const component = mount(newTodo);
    const wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: content } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual(content);
  });

  it(`should set state properly on due date year`, () => {
    const dueDate = { year : 'TEST_YEAR', month : '', date : '' };
    const component = mount(newTodo);
    const wrapper = component.find('#text_year');
    wrapper.simulate('change', { target: { value: dueDate.year } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.year).toEqual(dueDate.year);
  });

  it(`should set state properly on due date month`, () => {
    const dueDate = { year : '', month : 'TEST_MONTH', date : '' };
    const component = mount(newTodo);
    const wrapper = component.find('#text_month');
    wrapper.simulate('change', { target: { value: dueDate.month } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.month).toEqual(dueDate.month);
  });

  it(`should set state properly on due date date`, () => {
    const dueDate = { year : '', month : '', date : 'TEST_DATE' };
    const component = mount(newTodo);
    const wrapper = component.find('#text_date');
    wrapper.simulate('change', { target: { value: dueDate.date } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.date).toEqual(dueDate.date);
  });
});


