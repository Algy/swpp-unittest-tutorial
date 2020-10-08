import React from 'react';
import TodoCalendar from './TodoCalendar'
import { shallow, mount } from 'enzyme';
import { Item } from 'semantic-ui-react';
import { getMockStore } from '../../test-utils/mocks';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';



const stubInitialState = {
    todos: [
        {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
        {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
        {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
      ],
    selectedTodo: null
}
const mockStore = getMockStore(stubInitialState)

describe('TodoCalendar', () => {
    let mockTodoCalendar;
    let component;
    beforeEach(() => {
        mockTodoCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={TodoCalendar}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        component = mount(mockTodoCalendar)
    })

    it('should render without errors', () => {
        const wrapper = component.find('.total')
        expect(wrapper.length).toBe(1)
    })

    it('should set state properly on clickPrev', () => {
        const wrapper = component.find('.prev')
        const oldComponent = component.find(TodoCalendar.WrappedComponent).instance();
        let originalYear = oldComponent.state.year;
        let originalMonth = oldComponent.state.month;
        wrapper.simulate('click')
        const newComponent = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newComponent.state.month).toBe(originalMonth === 1 ? 12 : originalMonth-1)
        expect(newComponent.state.year).toBe(originalMonth === 12 ? originalYear-1: originalYear)
    })

    it('should set state properly on clickNext', () => {
        const wrapper = component.find('.next')
        const oldComponent = component.find(TodoCalendar.WrappedComponent).instance();
        let originalYear = oldComponent.state.year;
        let originalMonth = oldComponent.state.month;
        //use setstate
        wrapper.simulate('click')
        const newComponent = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newComponent.state.month).toBe(originalMonth === 12 ? 1 : originalMonth+1)
        expect(newComponent.state.year).toBe(originalMonth === 12 ? originalYear+1: originalYear)
    })
    
    it("shouldn't call toggle", () => {
        const mockFct = jest.fn();
        component.setProps({clickDone:{mockFct}})
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(temp => {return dispatch => {}})
        expect(spyToggleTodo).toHaveBeenCalledTimes(0)
    })

})