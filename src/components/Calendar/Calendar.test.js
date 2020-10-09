import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react';

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(Table);
    expect(wrapper.length).toBe(1);
  });


  
it('should handle clicks', () => {
    const mockClickDone = jest.fn();
    const mockTodos = [{
        id: 1,
        title: 'TEST-TITLE',
        content: 'TEST-CONTENT',
        year: 2020,
        month: 10,
        date: 8,
        done: true,
    }]
    const component = shallow(<Calendar year={2020} month={11} todos={mockTodos} clickDone={mockClickDone} />);
    const wrapper = component.find('.todoTitle');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
});

  it('should render className as not done if done=false', () => {
    const mockClickDone = jest.fn();
    const mockTodos = [{
        id: 1,
        title: 'TEST-TITLE',
        content: 'TEST-CONTENT',
        year: 2020,
        month: 10,
        date: 8,
        done: false, 
    }]
    const component = shallow(<Calendar year={2020} month={11} todos={mockTodos} clickDone={mockClickDone} />);
    let doneWrapper = component.find('.done');
    expect(doneWrapper.length).toBe(0);
    let notdoneWrapper = component.find('.notdone');
    expect(notdoneWrapper.length).toBe(1);
  });

  it('should render className as done if done=true', () => {
    const mockClickDone = jest.fn();
    const mockTodos = [{
        id: 1,
        title: 'TEST-TITLE',
        content: 'TEST-CONTENT',
        year: 2020,
        month: 10,
        date: 8,
        done: true, 
    }]
    const component = shallow(<Calendar year={2020} month={11} todos={mockTodos} clickDone={mockClickDone} />);
    let doneWrapper = component.find('.done');
    expect(doneWrapper.length).toBe(1);
    let notdoneWrapper = component.find('.notdone');
    expect(notdoneWrapper.length).toBe(0);
  });

});
