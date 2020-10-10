import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
    const renderCalenderBody = (dates, todos, clickDone) => {
        let i = 0;
        const rows = [];
        for (let week=0; week<5; week++){
          let day = 0; // Sunday
            
          let row = [];
          for (let day=0; day<7; day++) {
              const date = dates[i]
            if (date !== undefined && day === date.getDay()) {
              row.push(
                <div className={`cell ${day === 0 && 'sunday'}`} key={7*week+day}>
                  <div className="date">{date.getDate()}</div>
                  {
                    todos.filter(todo => {
                      return todo.year === date.getFullYear() &&
                        todo.month === date.getMonth()+1 &&
                        todo.date === date.getDate();
                    }).map(todo => {
                      return (
                        <div
                          key={todo.id}
                          className={`todoTitle ${todo.done ? 'done':'notdone'}`}
                          onClick={() => clickDone(todo.id)}>
                          {todo.title}
                        </div>
                      )
                    })
                  }
                </div>
              )
              i++;
            } else {
              row.push(<div key={7*week+day}> </div>)
            }
          }
          rows.push(row);
        }
        return (
            <div>
              {rows.map((row, i) => (<div key={i}>{row}</div>))}
            </div>
          );
    }

    const renderCalendar = (dates, todos, clickDone) => (
        <div className='spyCalendar' striped style={{"height": "600px", "width": "600px"}}>
          {renderCalenderBody(dates, todos, clickDone)}
        </div>
    )

    return jest.fn(props => {
        const dates = [];
        const year = props.year;
        const month = props.month - 1;
        let date = 1;
        let maxDate = (new Date(year, month + 1, 0)).getDate();
        for (let date=1; date<=maxDate; date++) {
          dates.push(new Date(year, month, date));
        }
        return renderCalendar(dates, props.todos, props.clickDone);
    });
  });

const stubInitialState = {
    todos: [
      {id: 1, title: 'TODO_TEST_TITLE_1', content:'content1', done: false, year: 2019, month: 10, date: 1},
      {id: 2, title: 'TODO_TEST_TITLE_2', content:'content2', done: false, year: 2019, month: 10, date: 1},
      {id: 3, title: 'TODO_TEST_TITLE_3', content:'content3', done: false, year: 2019, month: 10, date: 1},
    ],
    selectedTodo: null,
};
  
const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar/>', () => {
    let todoCalendar, spyGetTodos;
    beforeEach(() => {
        todoCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                    <Route path='/calendar' exact render={() => <TodoCalendar/>}/>
                    <Redirect exact from='/' to='calendar' />
                </Switch>
                </ConnectedRouter>
            </Provider>
        )
        spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(() => { return dispatch => {}; });
    });

    it('should render Calendar', () => {
        const component = mount(todoCalendar);
        //console.log(component.debug())
        const wrapper = component.find('.spyCalendar');
        //console.log(wrapper);
        expect(wrapper.length).toBe(1);
        expect(spyGetTodos).toBeCalledTimes(1);
    })

    it('should call handleClickPrev', () => {
        const component = mount(todoCalendar);
        let newInstance = component.find(TodoCalendar.WrappedComponent).instance()
        newInstance.setState({month: 1});
        const wrapper = component.find('.header').find('button').at(0);
        wrapper.simulate('click');
        expect(newInstance.state.year).toEqual(2018);
        expect(newInstance.state.month).toEqual(12);
        wrapper.simulate('click');
        expect(newInstance.state.year).toEqual(2018);
        expect(newInstance.state.month).toEqual(11);
    })
    it('should call handleClickNext', () => {
        const component = mount(todoCalendar);
        let newInstance = component.find(TodoCalendar.WrappedComponent).instance()
        newInstance.setState({month: 12});
        const wrapper = component.find('.header').find('button').at(1);
        wrapper.simulate('click');
        expect(newInstance.state.year).toEqual(2020);
        expect(newInstance.state.month).toEqual(1);
        wrapper.simulate('click');
        expect(newInstance.state.year).toEqual(2020);
        expect(newInstance.state.month).toEqual(2);
    })

    it('should call clickDone', () => {
      const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
        .mockImplementation(id => {return dispatch => {};});
      const component = mount(todoCalendar);
      const wrapper = component.find('.spyCalendar .todoTitle').at(0);
      wrapper.simulate('click');
      expect(spyToggleTodo).toBeCalledTimes(1);
    })

})