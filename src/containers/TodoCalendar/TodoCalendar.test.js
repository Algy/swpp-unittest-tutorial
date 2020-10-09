import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
        return (
            <div className="spyCalendar">
                {props.year}.{props.month}
                <button className="doneButton" onClick={props.clickDone} />
            </div>);
    });
});

const stubInitialState = {
    year: 2019,
    month: 10,
    todos: [
        {
          id: 1,
          year: 2019,
          month: 9,
          date: 1,
          done: false
        },
        {
          id: 2,
          year: 2019,
          month: 9,
          date: 1,
          done: true
        },
        {
          id: 3,
          year: 2019,
          month: 9,
          date: 2,
          done: false
        }
    ]
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
                            render={() => <TodoCalendar />} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(() => { return dispatch => { }; });
    })

    it('should render Todos', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.spyCalendar');
        expect(wrapper.length).toBe(1);
        expect(wrapper.text()).toBe('2019.10');
        expect(spyGetTodos).toBeCalledTimes(1);
    });

    it(`should call 'handleClickPrev'`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('button').at(0);
        const TodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        wrapper.simulate('click');
        expect(TodoCalendarInstance.state.year).toEqual(2019);
        expect(TodoCalendarInstance.state.month).toEqual(9);
        wrapper.simulate('click');
        wrapper.simulate('click');
        wrapper.simulate('click');
        wrapper.simulate('click');
        wrapper.simulate('click');
        wrapper.simulate('click');
        wrapper.simulate('click');
        wrapper.simulate('click');
        wrapper.simulate('click');
        expect(TodoCalendarInstance.state.year).toEqual(2018);
        expect(TodoCalendarInstance.state.month).toEqual(12);
    });

    it(`should call 'handleClickNext'`, () => {
        const component = mount(todoCalendar);
        const TodoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        const wrapper = component.find('button').at(1);
        wrapper.simulate('click');
        expect(TodoCalendarInstance.state.year).toEqual(2019);
        expect(TodoCalendarInstance.state.month).toEqual(11);
        wrapper.simulate('click');
        wrapper.simulate('click');
        expect(TodoCalendarInstance.state.year).toEqual(2020);
        expect(TodoCalendarInstance.state.month).toEqual(1);
    });

    it(`should call 'clickDone'`, () => {
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(id => { return dispatch => { }; });
        const component = mount(todoCalendar);
        const wrapper = component.find('.spyCalendar .doneButton').at(0);
        wrapper.simulate('click');
        expect(spyToggleTodo).toBeCalledTimes(1);
    });
});