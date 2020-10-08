import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';

describe('<Calendar />',()=>{
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('Table');
    expect(wrapper.length).toBe(1);
  });
  it('should render correctly',()=>{
    const year=2020,month=10;
    const todos=[
      {year:2020,month:9,date:8,id:1,done:true,title:'title 1'},
      {year:2020,month:9,date:12,id:1,done:false,title:'title 2'},
      {year:2019,month:12,date:25,id:2,done:false,title:'title 3'},
    ];
    const mockClickDone=jest.fn();
    const component=mount(<Calendar year={year} month={month} todos={todos} clickDone={mockClickDone}/>);
    let wrapper=component.find('.done');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('title 1');
    wrapper=component.find('.notdone');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe('title 2');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
})