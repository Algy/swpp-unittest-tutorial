import React from 'react';
import { shallow, mount } from 'enzyme';
import TodoCalendar from './TodoCalendar';
import {getMockStore} from "../../test-utils/mocks";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../../store/store";
import {Route, Switch} from "react-router-dom";
import Todo from "../../components/Todo/Todo";

const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2020, month: 1, date: 1,},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2020, month: 1, date: 2,},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2020, month: 1, date: 3,},
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
  });

  it('should render without errors', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('Calendar');
    expect(wrapper.length).toBe(1);
  });

  it(`should move on to the previous month on clicking the Prev button`, () => {
    const component = mount(todoCalendar)
    //const component = mount(todoCalendar);
    const wrapper = component.find('#prev-button');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    //expect(mockClickDone).toHaveBeenCalledTimes(1);
  })

  it(`should move on to the previous month on clicking the Prev button`, () => {
    const component = mount(todoCalendar)
    //const component = mount(todoCalendar);
    const wrapper = component.find('#prev-button');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    //expect(mockClickDone).toHaveBeenCalledTimes(1);
  })

  it(`should move on to the next month on clicking the Next button`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('#next-button');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
  })
});