import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';
import NewTodo from "../TodoList/NewTodo/NewTodo";

const stubInitialState = {
    todos: [
        {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
        {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
        {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
    ],
    selectedTodo: null,
}

jest.mock('../../components/Calendar/Calendar', ()=>{
   return jest.fn(props => {
       return (
           <div className='Calendar'>
               <div className='date'>
                   {props.year}.{props.month}
               </div>
               <div className="todos">
                   {props.todos.length !==0?props.todos[0].title : ''}
               </div>
               <button className = "done" onClick={props.clickDone}/>
           </div>
       )
   })
});

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', ()=>{
    let todoCalendar;
    beforeEach(()=>{
        todoCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={TodoCalendar} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
    })

    it('should render todoCalendar header', ()=>{
        const component = mount(todoCalendar);
        const wrapper = component.find('.header');
        expect(wrapper.length).toBe(1);
    })

    it('should click and run handleClickPrev', ()=>{
        const component = mount(todoCalendar);
        const wrapper = component.find('.prevMonth');
        const instance = component.find(TodoCalendar.WrappedComponent).instance();
        instance.setState({...instance.state, month: 1});
        wrapper.simulate('click');
        wrapper.simulate('click');
        expect(instance.state.month).toBe(11);
    })

    it('if the month is 12 then next year should be year + 1', ()=>{
        const component = mount(todoCalendar);
        const wrapper = component.find('.nextMonth');
        const instance = component.find(TodoCalendar.WrappedComponent).instance();
        instance.setState({...instance.state, month:12 });
        console.log(instance)
        wrapper.simulate('click');
        wrapper.simulate('click');
        expect(instance.state.year).toBe(2020);
    })

    it('onToggleTodo called', ()=>{
        const onToggleTodo = jest.spyOn(actionCreators, 'toggleTodo').mockImplementation(
            id=>dispatch=>{}
        );
        const component = mount(todoCalendar);
        const wrapper = component.find('.Calendar .done');
        wrapper.simulate('click');
        expect(onToggleTodo).toHaveBeenCalledTimes(1);
    })

})

