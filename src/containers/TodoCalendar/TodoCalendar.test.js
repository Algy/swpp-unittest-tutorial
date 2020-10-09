import React from 'react';
import { shallow, mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';
import { Item } from 'semantic-ui-react';

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

const stubInitialState = {
todos: [
    {
        id: 8,
        title: 'SWPP',
        content: 'take swpp class',
        done: true,
        year: 2019,
        month: 1,
        date: 1
        },
        {
        id: 9,
        title: 'Movie',
        content: 'Watch Movie',
        done: false,
        year: 2019,
        month: 1,
        date: 1
        },
        {
        id: 12,
        title: 'Dinner',
        content: 'eat dinner',
        done: false,
        year: 2019,
        month: 1,
        date: 1
        },
        {
        id: 13,
        title: 'tests',
        content: 'stset',
        done: false,
        year: 2020,
        month: 9,
        date: 8
        },
        {
        id: 14,
        title: 'test',
        content: 'go',
        done: false,
        year: 2020,
        month: 9,
        date: 8
        }
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
                <Route path='/' exact
                  render={() => <TodoCalendar title="TODOLIST_TEST_TITLE" />} />
              </Switch>
              </ConnectedRouter>
            </Provider>
        );
    });

    it("should render without errors", () => {
        const component = mount(todoCalendar);
        const wrapper = component.find(TodoCalendar);
        expect(wrapper.length).toBe(1);
    });

    it(`should handle click properly`, () => {
      const component = mount(todoCalendar);
      const wrapper = component.find("button");
      expect(wrapper.length).toBe(2);

      const todoCalendarInstnace = component.find(TodoCalendar.WrappedComponent).instance();

      wrapper.at(0).simulate('click');
      expect(todoCalendarInstnace.state.month).toBe(9);

      wrapper.at(1).simulate('click');
      expect(todoCalendarInstnace.state.month).toBe(10);
    });
});