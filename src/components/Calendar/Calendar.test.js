import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('<Calendar />', () => {
    let todos;
    
    
  

    beforeEach(() => {
        todos = [
            {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
            {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
            {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
          ];

        })

  it('should render without errors', () => {
    let spyClickDone = jest.fn();
    const component = shallow(<Calendar year = {2020} month = {10} todos = {todos} clickDone = {spyClickDone}/>);
    const wrapper = component.find('TableCell');
    expect(wrapper.length).toBe(35);
  });

  it('should render todos as done if done=true', () => {
    const todos2 = [
        {
            id: 1, 
            title: 'TODO_TEST_TITLE_1', 
            done: true,
            year : 2020, month : 9, date : 10, 
            dueDate : {year : 2020, month : 9, date : 10}},
        {
            id: 2, 
            title: 'TODO_TEST_TITLE_2', 
            done: false, 
            year : 2020, month : 9, date : 11,
            dueDate : {year : 2020, month : 10, date : 11}},
        {
            id: 3, 
            title: 'TODO_TEST_TITLE_3', 
            done: true, 
            year : 2020, month : 11, date : 12,
            dueDate : {year : 2020, month : 11, date : 12}},
      ];
    let spyClickDone = jest.fn();
    const component = shallow(<Calendar year = {2020} month = {10} todos = {todos2} clickDone = {spyClickDone}/>);
    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(2);
    wrapper.at(0).simulate('click');
    expect(spyClickDone).toHaveBeenCalledTimes(1);
  });

});
