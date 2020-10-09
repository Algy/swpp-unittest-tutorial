import Calendar from '../../components/Calendar/Calendar';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { Item } from 'semantic-ui-react';
import TodoCalendar from './TodoCalendar';
import * as actionCreators from '../../store/actions/todo';
jest.mock('../../components/Calendar/Calendar',()=>{
  return jest.fn(props=>{
    let tmp=props.todos.map((el)=>{
      return (
        <button className='donebutton' onClick={props.clickDone}></button>
      );
    })
    
    return(
      <div className='spyCalendar'>
        {props.year}
        {props.month}
        {tmp}
      </div>
    )
  })
})
const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1',year:2019,month:12,date:1, done: false},
    {id: 2, title: 'TODO_TEST_TITLE_2',year:2019,month:12,date:1, done: false},
    {id: 3, title: 'TODO_TEST_TITLE_3',year:2019,month:12,date:1 ,done: false},
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar/>',()=>{
let todocalendar, spygetTodos;
  beforeEach(()=>{
  
  todocalendar=(
    <Provider store={mockStore}>
    <ConnectedRouter history={history}>
    <Switch>
      <Route path='/' exact
        render={() => <TodoCalendar title="TODOCAL_TEST_TITLE" />} />
    </Switch>
    </ConnectedRouter>
  </Provider>
  );
  spygetTodos=jest.spyOn(actionCreators, 'getTodos')
  .mockImplementation(() => { return dispatch => {}; });
})
it('should render todocalendr',()=>{
  const component=mount(todocalendar);
  const wrapper=component.find('.spyCalendar');
  expect(wrapper.length).toBe(1);
  expect(spygetTodos).toBeCalledTimes(1);
})
it('should click next',()=>{
    const component=mount(todocalendar);
    const wrapper=component.find('.next');
    wrapper.simulate('click');
    const todocalendarinstance=component.find(TodoCalendar.WrappedComponent).instance();
    
    expect(todocalendarinstance.state.month).toBe(3);
})
it('should click prev',()=>{
  const component=mount(todocalendar);
  let todocalendarinstance=component.find(TodoCalendar.WrappedComponent).instance();
  const month = todocalendarinstance.state.month;
  const year=todocalendarinstance.state.year;
  if(month!=1)
  {const wrapper=component.find('.preview');
  wrapper.simulate('click');
  todocalendarinstance=component.find(TodoCalendar.WrappedComponent).instance();    
   expect(todocalendarinstance.state.month).toBe(month-1);
    expect(todocalendarinstance.state.year).toBe(year);

}
  else 
  {
    const wrapper=component.find('.preview');
  wrapper.simulate('click');
  todocalendarinstance=component.find(TodoCalendar.WrappedComponent).instance();    
   
    expect(todocalendarinstance.state.month).toBe(12);
    expect(todocalendarinstance.state.year).toBe(year-1);
 
  }
  })
it('should toggle done',()=>{
  const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
  .mockImplementation(id => { return dispatch => {}; });
  const component=mount(todocalendar);
  const wrapper=component.find('.spyCalendar .donebutton').at(0);
  wrapper.simulate('click');
  expect(spyToggleTodo).toBeCalledTimes(1);
})

})