import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';
describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.sunday');
    expect(wrapper.length).toBe(1);
  });
  it('dates should be well rendered', () => {
      const todos=[
        ]
    const component = shallow(<Calendar year={2020} month={10} todos={todos}/>);
    const wrapper = component.find('.date');
    expect(wrapper.length).toBe(31);
  });
  it('todos should be well rendered', ()=>{
      const mock_todos=[{id: 1, title: "dodo", content: "deungjang", year: 2020, month: 9,
      date: 1, done: false}, 
      {id: 2, title: "take", content: "me home", year: 2020, month: 9,
      date: 2, done: false},
      {id: 3, title: "to the palce", content: "i belong", year: 2020, month: 9,
      date: 3, done: true}
    ];
    const component = shallow(<Calendar year={2020} month={10} todos={mock_todos}/>);
    let wrapper = component.find('.notdone');
    expect(wrapper.length).toBe(2);
    wrapper = component.find('.done');
    expect(wrapper.length).toBe(1);
  })
  it(`should call 'clickDone'`, () => {
    const mock_todos=[{id: 1, title: "dodo", content: "deungjang", year: 2020, month: 9,
    date: 1, done: false}
    ];
    const spyToggleTodo = jest.fn();
    const component =shallow(<Calendar year={2020} month={10} todos={mock_todos} clickDone={spyToggleTodo}/>)
    const wrapper = component.find('.notdone');
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});


