import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import {connectRouter, ConnectedRouter} from 'connected-react-router';
import {Route, Redirect, Switch} from 'react-router-dom';
import {history} from '../../store/store';
import TodoCalendar from './TodoCalendar';
import axios from "axios"
import {getMockStore} from "../../test-utils/mocks";
import * as actionCreators from "../../store/actions/todo";

const stubInitialState = {
    todos: [
        {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2019, month: 9, date: 1},
        {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2019, month: 9, date: 1},
        {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2019, month: 9, date: 1},
    ],
    selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

const stubTodo = {
    "id": 8,
    "title": "SWPP",
    "content": "take swpp class",
    "done": true,
    "year": 2019,
    "month": 1,
    "date": 1
}

describe('<TodoCalendar />', () => {
    let todoCalendar;
    let spy;

    beforeEach(() => {
        const stubTodoList = [stubTodo];

        todoCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={TodoCalendar}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubTodoList
                    };
                    resolve(result);
                });
            })

    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it(`'TodoCalendar' render correctly`, (done) => {
        const component = mount(todoCalendar);
        const wrapper = component.find('Calendar');
        expect(wrapper.length).toBe(1);
        expect(spy).toHaveBeenCalledTimes(1);
        done()
    });

    it('push prev button', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('#prev-button');
        wrapper.simulate('click');
        const target = component.find('TodoCalendar').instance();
        expect(target.state.year).toBe(2019);
        expect(target.state.month).toBe(9);
    });

    it('push prev button different case', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('TodoCalendar').instance();
        wrapper.setState({month: 1});
        const button = component.find('#prev-button');
        button.simulate('click');
        expect(wrapper.state.year).toBe(2018);
        expect(wrapper.state.month).toBe(12);
    });

    it('push next button different case', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('TodoCalendar').instance();
        wrapper.setState({month: 12});
        const button = component.find('#next-button');
        button.simulate('click');
        expect(wrapper.state.year).toBe(2020);
        expect(wrapper.state.month).toBe(1);
    });

    it('push next button', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('#next-button');
        wrapper.simulate('click');
        const target = component.find('TodoCalendar').instance();
        expect(target.state.year).toBe(2019);
        expect(target.state.month).toBe(11);
    });

    it('trigger onTodoTrigger', () => {
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(id => {
                return dispatch => {
                };
            });
        const component = mount(todoCalendar);
        const wrapper = component.find('#todo-1');
        wrapper.simulate('click');
        expect(spyToggleTodo).toBeCalledTimes(1);
    });
});


