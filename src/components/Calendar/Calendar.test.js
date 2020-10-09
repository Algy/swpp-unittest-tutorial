import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react'
import { getMockStore } from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/todo';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import TodoList from '../../containers/TodoList/TodoList';
import { history } from '../../store/store';



describe('<Calendar />', () => {

  const mockTodos_done = [{
    id:1,
    title: 'TITLE',
    content: 'CONTENT',
    done: true,
    year: 2020,
    month:10,
    date: 8
  }]

  const mockTodos_undone = [{
    id:1,
    title: 'TITLE',
    content: 'CONTENT',
    done: false,
    year: 2020,
    month:10,
    date: 8
  }]


    it('should render without errors', () => {
      const component = shallow(<Calendar />);
      const wrapper = component.find('.Calendar');
      expect(wrapper.length).toBe(0);
    });
  
    it('should render title as not done if done=true', () => {
      const mockClickDone = jest.fn();
      const component = shallow(<Calendar year={2020} month={11} todos={mockTodos_done} clickDone={mockClickDone}/>)
      const wrapper = component.find('done')
      wrapper.simulate('click')
      expect(mockClickDone).toHaveBeenCalledTimes(1);
    });

    it('should render title as not done if done=false', () => {
      const mockClickDone = jest.fn();
      const component = shallow(<Calendar year={2020} month={11} todos={mockTodos_done} clickDone={mockClickDone}/>)
      const wrapper = component.find('notdone')
      wrapper.simulate('click')
      expect(mockClickDone).toHaveBeenCalledTimes(1);
    });
  
    // it('push dates', () => {
    //   const mockPush = jest.fn()
    //   const component = shallow(<Calendar year={2020} month={10}/>);
    //   const wrapper = component.find('dates');
    //   wrapper.simulate('push')
    //   expect(mockPush).toHaveBeenCalled(1);
    // });
  
    // it('should handle clicks', () => {
    //   const mockClickDone = jest.fn();
    //   const component = shallow(<Todo clickDone={mockClickDone} />);
    //   const wrapper = component.find('.doneButton');
    //   wrapper.simulate('click');
    //   expect(mockClickDone).toHaveBeenCalledTimes(1);
    // });
  });