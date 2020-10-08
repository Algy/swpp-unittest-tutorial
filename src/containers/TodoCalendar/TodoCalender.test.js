import React from 'react';
import {mount, shallow} from 'enzyme';
import TodoCalendar from './TodoCalendar.js';
import {getMockStore} from "../../test-utils/mocks";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {history} from "../../store/store";
import {Route, Switch} from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";
import TodoList from "../TodoList/TodoList";


const stubTodo = {
    id: 0,
    title: 'title 1',
    content: 'content 1',
    year: '2020',
    month: '9',
    date: '8',
};

const stubFailTodo = {
    id: 1,
    title: 'title 2',
    content: 'content 2',
    year: '2020',
    month: '14',
    date: '08',
};
const stubInitialState = {
    todos: [
        stubTodo, stubFailTodo,
    ],
    selectedTodo: null,
};
const mockStore = getMockStore(stubInitialState);
let mockClickDone = jest.fn();
const cal = <Calendar year='2020' month='10' clickDone={mockClickDone} todos={[stubTodo, stubFailTodo]} />

describe('<TodoCalender />', () => {
    let newCalendar, new2, new3;
    let inCalendar;
    beforeEach(() => {
        newCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact
                            render={()=>{return <TodoCalendar
                                    year="2020"
                                    month="10"
                                    storedTodos={[stubTodo, stubFailTodo]}
                                    onToggleTodo={mockClickDone}
                                />
                            }}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        new2 = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact
                               render={()=>{return <TodoCalendar
                                   year="2020"
                                   month="01"
                                   storedTodos={[stubTodo, stubFailTodo]}
                                   onToggleTodo={mockClickDone}
                               />
                               }}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        new3 = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact
                               render={()=>{return <TodoCalendar
                                   year="2020"
                                   month="12"
                                   storedTodos={[stubTodo, stubFailTodo]}
                                   onToggleTodo={mockClickDone}
                               />
                               }}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    })

    it('should render without errors', () => {
        const component = mount(newCalendar);
        const wrapper = component.find('.TodoCalendar');
        expect(wrapper.length).toBe(1);
    });
    it('should render without errors 2', () => {
        const component = mount(new2);
        const wrapper = component.find('.TodoCalendar');
        expect(wrapper.length).toBe(1);
    });
    it('button rendering', () => {
        const mockClickDone = jest.fn();
        const component = mount(newCalendar);
        //console.log(component.debug());
        const wrapper = component.find('button');
        expect(wrapper.length).toBe(2);
    });
    it('prev button', () => {
        const component = mount(new2);
        console.log(component.debug());
        const wrapper = component.find('.prevButton');
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
        expect(wrapper.length).toBe(1);
    });
    it('prev button', () => {
        const component = mount(new3);
        //console.log(component.debug());
        const wrapper = component.find('.prevButton');
        wrapper.simulate('click');
        expect(wrapper.length).toBe(1);
    });
    it('next button', () => {
        const component = mount(new2);
        //console.log(component.debug());
        const wrapper = component.find('.nextButton');
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
        expect(wrapper.length).toBe(1);
    });
    it('next button', () => {
        const component = mount(new3);
        //console.log(component.debug());
        const wrapper = component.find('.nextButton');
        wrapper.simulate('click');
        expect(wrapper.length).toBe(1);
    });

    it('toggleTodo', () => {
        const component = mount(new2);
        console.log(component.debug());
        const wrapper = component.find('.calendarButton');
        wrapper.simulate('click');
        expect(wrapper.length).toBe(1);
    });
});
