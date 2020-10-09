import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
        const dates=props.todos.map(todo=>{
                return(
                    <div className="date" key={todo.date}>
                        <div
                        key={todo.id}
                        className={`todoTitle ${todo.done ? 'done':'notdone'}`}
                        onClick={() => props.clickDone(todo.id)}>
                        {todo.title}
                        </div>
                    </div>
                )
            })
      return (
        <div className="spyCalender">
            {dates}
        </div>);
    });
  });
const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: true, year: 2020, month:10, date:8},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2020, month:10, date:9},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2020, month:10, date:10},
  ],
};

const mockStore = getMockStore(stubInitialState);

 describe('<TodoCalendar />', () => {
   let todocalendar, spyGetTodos;

   beforeEach(() => {
     todocalendar = (
       <Provider store={mockStore}>
         <ConnectedRouter history={history}>
         <Switch>
           <Route path='/' exact
             render={() => <TodoCalendar title="TODOCALENDER_TEST_TITLE" />} />
         </Switch>
         </ConnectedRouter>
       </Provider>
     );
     spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
       .mockImplementation(() => { return dispatch => {}; });
   })

   it('should render TodoCalendar', () => {
        const component = mount(todocalendar);
        let wrapper = component.find('.date');
        expect(wrapper.length).toBe(3);
        wrapper = component.find('div.todoTitle.done')
        expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
        wrapper = component.find('div.todoTitle.notdone')
        expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_2');
        expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_3');
        expect(spyGetTodos).toBeCalledTimes(1);
   });
   
   it(`should call 'handleClickPrev'`, () => {
        const component = mount(todocalendar);
        const wrapper = component.find('#prev-month');
        wrapper.simulate('click');
        const cal = component.find(TodoCalendar.WrappedComponent).instance();
        expect(cal.state.month).toEqual(9);
        expect(cal.state.year).toEqual(2019);
        for(let i=0; i<10; i++)
            wrapper.simulate('click');
        const cal2 = component.find(TodoCalendar.WrappedComponent).instance();
        expect(cal2.state.year).toEqual(2018);
        expect(cal2.state.month).toEqual(11);
   });

   it(`should call 'handleClickNext'`, () => {
        const component = mount(todocalendar);
        const wrapper = component.find('#next-month');
        wrapper.simulate('click');
        const cal = component.find(TodoCalendar.WrappedComponent).instance();
        expect(cal.state.month).toEqual(11);
        expect(cal.state.year).toEqual(2019);
        for(let i=0; i<2; i++)
            wrapper.simulate('click');
        const cal2 = component.find(TodoCalendar.WrappedComponent).instance();
        expect(cal2.state.year).toEqual(2020);
        expect(cal2.state.month).toEqual(1);
   });

   it(`should call 'clickDone'`, () => {
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
        .mockImplementation(id => { return dispatch => {}; });
        const component = mount(todocalendar);
        const wrapper = component.find('.todoTitle.notdone').at(0);
        wrapper.simulate('click');
        expect(spyToggleTodo).toBeCalledTimes(1);
   });
 });