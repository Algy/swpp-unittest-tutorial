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
        <input type="button" className="spyToggleButton"
          onClick={props.clickDone} />
      </div>);
  });
});

const stubInitialState = {
  year: 2020,
  month: 10,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos, spyToggleTodo;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact
            render={() => <TodoCalendar />} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {
        new Promise((succ) => {
          return succ({ status: 200, data: [] });
        })
      }; });

    spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(() => { return dispatch => {
        new Promise((succ) => {
          return succ({ status: 200, data: []});
        })
      }; });
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getTodos()', () => {
    const component = mount(todoCalendar);
    expect(spyGetTodos).toHaveBeenCalledTimes(1);
  });

  it('should handle prev button', () => {
    const component = mount(todoCalendar);
    const instance = component.find(TodoCalendar.WrappedComponent).instance();
    instance.setState({year: 2020, month: 10});

    const wrapper = component.find('button');
    console.log(wrapper);
    expect(wrapper.length).toBe(2);

    const btnPrev = wrapper.first();
    expect(btnPrev.text().trim()).toEqual('prev month');
    btnPrev.simulate('click');

    expect(instance.state).toEqual({year: 2020, month: 9});
  });

  it('should handle next button', () => {
    const component = mount(todoCalendar);
    const instance = component.find(TodoCalendar.WrappedComponent).instance();
    instance.setState({year: 2020, month: 10});

    const wrapper = component.find('button');
    console.log(wrapper);
    expect(wrapper.length).toBe(2);

    const btnPrev = wrapper.last();
    expect(btnPrev.text().trim()).toEqual('next month');
    btnPrev.simulate('click');

    expect(instance.state).toEqual({year: 2020, month: 11});
  });

  it('should handle boundary months', () => {
    const component = mount(todoCalendar);
    const instance = component.find(TodoCalendar.WrappedComponent).instance();

    const wrapper = component.find('button');
    console.log(wrapper);
    expect(wrapper.length).toBe(2);

    const btnPrev = wrapper.first();
    const btnNext = wrapper.last();
    expect(btnPrev.text().trim()).toEqual('prev month');
    expect(btnNext.text().trim()).toEqual('next month');

    instance.setState({year: 2020, month: 1});
    btnPrev.simulate('click');
    expect(instance.state).toEqual({year: 2019, month: 12});

    instance.setState({year: 2020, month: 12});
    btnNext.simulate('click');
    expect(instance.state).toEqual({year: 2021, month: 1});

  });

  it('should call getTodos on load', () => {
    const component = mount(todoCalendar);
    expect(spyGetTodos).toHaveBeenCalledTimes(1);
  });

  it('should call toggleTodo on click', () => {
    const component = mount(todoCalendar);
    const btn = component.find('.spyToggleButton');

    expect(btn.length).toBe(1);
    btn.simulate('click');

    expect(spyToggleTodo).toHaveBeenCalledTimes(1);
  });
});

