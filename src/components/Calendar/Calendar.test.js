import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';

const todos2 = [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, 
      year: 2019,
      month: 11,
      date: 1,
    },
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false, 
      year: 2019,
      month: 11,
      date: 2,
    },
    {id: 3, title: 'TODO_TEST_TITLE_3', done: true, 
      year: 2019,
      month: 11,
      date: 3,
    },
    {id: 4, title: 'TODO_TEST_TITLE_4', done: true, 
      year: 2020,
      month: 11,
      date: 3,
    },
    {id: 5, title: 'TODO_TEST_TITLE_5', done: true, 
      year: 2019,
      month: 9,
      date: 3,
    },
    {id: 6, title: 'TODO_TEST_TITLE_6', done: false, 
      year: 2019,
      month: 9,
      date: 4,
    },
    {id: 7, title: 'TODO_TEST_TITLE_7', done: false, 
      year: 2019,
      month: 10,
      date: 3,
    },
  ];

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2019} month={10} clickDone={mockClickDone} todos={todos2}/>);
    const wrapper = component.find('Table');
    expect(wrapper.length).toBe(1);
  });

  it('should render as done if done=true', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2019} month={10} clickDone={mockClickDone} todos={todos2}/>);
    let wrapper = component.find('.done');
    expect(wrapper.length).toBe(1);
  });

  it('should render title as notdone if done=false', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2019} month={10} clickDone={mockClickDone} todos={todos2}/>);
    const wrapper = component.find('.notdone');
    expect(wrapper.length).toBe(1);
  });

  it('should handle clicks', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2019} month={10} clickDone={mockClickDone} todos={todos2}/>);
    const wrapper = component.find('.done').first();
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});
