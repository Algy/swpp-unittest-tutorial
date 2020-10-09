import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';
import TodoCalendar from './TodoCalendar';

const stubInitialState = {
	todos: [
		{id: 1, title: 'TEST_TITLE', done: false, year:2000, month:1, date:2}
	],
}

const mockStore = getMockStore(stubInitialState);
jest.mock('../../components/Calendar/Calendar', () => {
	return jest.fn(props => {
		return (
			<div className='spyCalendar'>
				<button className='doneButton' onClick={props.clickDone}/>
			</div>
		)
	});
})
describe('<TodoCalendar />', () => {
	let todoCalendar;

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
	});
	afterEach(() => { jest.clearAllMocks() });
	it('should call handleClickPrev when month is not 1', () => {
		const component = mount(todoCalendar);
		const wrapper = component.find('button').at(0);
		wrapper.simulate('click');
		const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
		expect(todoCalendarInstance.state.year).toBe(2019);
		expect(todoCalendarInstance.state.month).toBe(9);
	});
	it('should call handleClickPrev when month is 1', () => {
		const component = mount(todoCalendar);
		const wrapper = component.find('button').at(0);
		for(let i=0;i<12;i++){ 
			wrapper.simulate('click');
		}
		const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
		expect(todoCalendarInstance.state.year).toBe(2018);
		expect(todoCalendarInstance.state.month).toBe(10);
	});
	it('should call handleClickNext when month is not 12', () => {
		const component = mount(todoCalendar);
		const wrapper = component.find('button').at(1);
		wrapper.simulate('click');
		const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
		expect(todoCalendarInstance.state.year).toBe(2019);
		expect(todoCalendarInstance.state.month).toBe(11);
	});
	it('should call handleClickNext when month is 12', () => {
		const component = mount(todoCalendar);
		const wrapper = component.find('button').at(1);
		for(let i=0;i<12;i++){ 
			wrapper.simulate('click');
		}
		const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
		expect(todoCalendarInstance.state.year).toBe(2020);
		expect(todoCalendarInstance.state.month).toBe(10);
	});
	it('should render onToggleTodo to Calendar', () => {
		const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
			.mockImplementation(id => {return disaptch => {};});
		const component = mount(todoCalendar);
		const wrapper = component.find('.spyCalendar .doneButton').at(0);
		wrapper.simulate('click');
		expect(spyToggleTodo).toBeCalledTimes(1);
	});

});
