import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react'

describe('<Calendar />', () => {
  it('should render table without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(Table);
    expect(wrapper.length).toBe(1);
  });

  it('should render table header without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(Table.Header);
    expect(wrapper.length).toBe(1);
  });

  it('should render table 7 headercells without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(Table.HeaderCell);
    expect(wrapper.length).toBe(7);
  });

  it('should render table header cell `sunday` without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.sunday');
    expect(wrapper.length).toBe(1);
  });

  it('should render table body without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(Table.Body);
    expect(wrapper.length).toBe(1);
  });

  it('should render 35 table cells for every 12 months', () => {
    for(let m=1;m<=12;m++){
      const component = shallow(<Calendar todos={[]} year={2000} month={m}/>);
      const wrapper = component.find(Table.Cell);
      expect(wrapper.length).toBe(35);
    }
  });

  it('should render 31 date-written cells for 2019-january', () => {
    const component = shallow(<Calendar todos={[]} year={2019} month={1} />);
    const wrapper = component.find('.cell');
    expect(wrapper.length).toBe(31);
  });

  it('should render done todo `year=2019`', () => {
    const stubTodos =  [{
      id: 0,
      title: 'title 1',
      content: 'content 1',
      done: true,
      year: 2019,
      month: 1,
      date: 1,
      },];
    const component = shallow(<Calendar todos={stubTodos} year={2019} month={1}/>);
    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(0);
  });

  // it('should render calendar header', () => {
  //   const component = shallow(<Calendar />);
  //   let wrapper = component.find('.sunday');
  //   expect(wrapper.length).toBe(1);
  //   // wrapper = component.find('.text');
  //   // expect(wrapper.text()).toEqual('Sun');
  // });





});
