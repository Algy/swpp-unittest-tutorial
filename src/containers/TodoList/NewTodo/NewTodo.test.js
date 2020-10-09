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

		jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2019);
		jest.spyOn(Date.prototype, 'getMonth').mockReturnValue(4);
		jest.spyOn(Date.prototype, 'getDate').mockReturnValue(7);

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
    const title = 'TEST_TITLE'
    const component = mount(newTodo);
    const wrapper = component.find('input');
    wrapper.at(0).simulate('change', { target: { value: title } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual(title);
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.year).toEqual(2019);
    expect(newTodoInstance.state.dueDate.month).toEqual(5);
    expect(newTodoInstance.state.dueDate.date).toEqual(7);
  });

  it(`should set state properly on content input`, () => {
    const content = 'TEST_CONTENT'
    const component = mount(newTodo);
    const wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: content } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual(content);
    expect(newTodoInstance.state.dueDate.year).toEqual(2019);
    expect(newTodoInstance.state.dueDate.month).toEqual(5);
    expect(newTodoInstance.state.dueDate.date).toEqual(7);
  });
  it(`should set state properly on year input`, () => {
    const year = 0
    const component = mount(newTodo);
    const wrapper = component.find('input');
    wrapper.at(1).simulate('change', { target: { value: year} });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.year).toEqual(0);
    expect(newTodoInstance.state.dueDate.month).toEqual(5);
    expect(newTodoInstance.state.dueDate.date).toEqual(7);
  });
  it(`should set state properly on month input`, () => {
    const month = 0
    const component = mount(newTodo);
    const wrapper = component.find('input');
    wrapper.at(2).simulate('change', { target: { value: month} });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.year).toEqual(2019);
    expect(newTodoInstance.state.dueDate.month).toEqual(0);
    expect(newTodoInstance.state.dueDate.date).toEqual(7);
  });
  it(`should set state properly on date input`, () => {
    const date = 0
    const component = mount(newTodo);
    const wrapper = component.find('input');
    wrapper.at(3).simulate('change', { target: { value: date} });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.year).toEqual(2019);
    expect(newTodoInstance.state.dueDate.month).toEqual(5);
    expect(newTodoInstance.state.dueDate.date).toEqual(0);
  });
});


