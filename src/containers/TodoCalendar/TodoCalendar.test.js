import React from 'react';
import { mount } from 'enzyme';
import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import * as actionCreators from '../../store/actions/todo';

const stubInitialState = {
    todos: [
        {
            id: 1, title: 'TEST_TITLE_1', done: true,
            year: 2019,
            month: 9,
            date: 1,
        },
        {
            id: 2, title: 'TEST_TITLE_2', done: false,
            year: 2019,
            month: 9,
            date: 2,
        },
        {
            id: 3, title: 'TEST_TITLE_3', done: true,
            year: 2019,
            month: 10,
            date: 1,
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
                        <Route path='/' exact component={TodoCalendar} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    })

    it('should render without errors', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.link');
        expect(wrapper.length).toBe(1);
        const wrapper2 = component.find('.header');
        expect(wrapper2.length).toBe(1);
        const wrapper3 = component.find('Calendar')
        expect(wrapper3.length).toBe(1);
    });

    it('should click prev/next buttons', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('button');
        wrapper.at(0).simulate('click');
        const wrapper2 = component.find('.header');
        let month = wrapper2.children().at(3).text();
        expect(month).toBe('9');
        wrapper.at(1).simulate('click');
        const wrapper3 = component.find('.header');
        month = wrapper3.children().at(3).text();
        expect(month).toBe('10');
    });

    it('should clickDone work', () => {
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(id => { return dispatch => {}; });
        const component = mount(todoCalendar);
        const wrapper = component.find('.done').at(0);
        wrapper.simulate('click');
        expect(spyToggleTodo).toBeCalledTimes(1);
    });

}); 