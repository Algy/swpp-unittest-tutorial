import React from 'react';
import TodoCalendar from './TodoCalendar'
import { shallow, mount } from 'enzyme';
import { Item, Table, TableHeader } from 'semantic-ui-react';
import { getMockStore } from '../../test-utils/mocks';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';
import Calendar from '../../components/Calendar/Calendar';

jest.mock('../../components/Calendar/Calendar', () => jest.fn())
Calendar.mockImplementation((props) => {
    return(
        <Table className="spyCalendar">
                <Table.Header>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell className="todoTitle" onClick={props.clickDone}></Table.Cell>
                    </Table.Row>
                </Table.Body>
        </Table>
    )
})

const stubInitialState = {
    todos: [
        {content: "take swpp class", date: 1, done: true, id: 8, month: 10, title: "SWPP", year: 2019},
        {content: "Watch Movie", date: 1, done: false, id: 9, month: 10, title: "Movie", year: 2019},
        {content: "eat dinner", date: 1, done: false, id: 12, month: 10, title: "Dinner", year: 2019}
      ],
    selectedTodo: null
}
const mockStore = getMockStore(stubInitialState)

describe('TodoCalendar', () => {
    let mockTodoCalendar;
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
    })

    it('should render without errors', () => {
        const component = mount(mockTodoCalendar)
        const wrapper = component.find('.total')
        expect(wrapper.length).toBe(1)
    })

    it('should set state properly on clickPrev', () => {
        const component = mount(mockTodoCalendar)
        const wrapper = component.find('.prev')
        wrapper.simulate('click')
        let newComponent = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newComponent.state.month).toEqual(9)
        expect(newComponent.state.year).toBe(2019)
        newComponent.setState({year:2019, month: 1})
        wrapper.simulate('click')
        newComponent = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newComponent.state.month).toEqual(12)
        expect(newComponent.state.year).toBe(2018)
    })

    it('should set state properly on clickNext', () => {
        const component = mount(mockTodoCalendar)
        const wrapper = component.find('.next')
        wrapper.simulate('click')
        let newComponent = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newComponent.state.month).toBe(11)
        expect(newComponent.state.year).toBe(2019)
        newComponent.setState({month: 12})
        wrapper.simulate('click')
        expect(newComponent.state.month).toBe(1)
        expect(newComponent.state.year).toBe(2020)
    })
    
    it("should call toggle", () => {
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(temp => {return dispatch => {}})
        const component = mount(mockTodoCalendar)
        const wrapper = component.find('.todoTitle').at(0)
        wrapper.simulate('click')
        expect(spyToggleTodo).toHaveBeenCalledTimes(1)
    })

})


/*
jest.doMock('../../components/Calendar/Calendar', () => {
    return jest.fn((props) => {
        return(
            <Table className="spyCalendar">
                <Table.Header>
                </Table.Header>
                <Table.Body>
                    <Table.Cell className="todoTitle" onClick={props.clickDone}>   
                    </Table.Cell>
                </Table.Body>
            </Table>
        )
    })
})
*/