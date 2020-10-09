import React from 'react';
import {shallow, mount} from 'enzyme';
import Calendar from './Calendar';
import * as actionCreators from '../../store/actions/index';

it ('should render without errors', ()=> {
  const component = shallow(<Calendar/>);
  const wrapper = component.find('.Calendar');
  expect(wrapper.length).toBe(1);
})

it('should set date propperly', ()=> {
  const component = shallow(Calendar({year:2020, month:10, todos:[]}));
  const wrapper = component.find('.date');
  expect(wrapper.length).toBe(31);
})

it('should be clicked for done-todos if done=true', () => {
  const clickdone = jest.fn();
  const component = shallow(Calendar({
    year:2020, month:10, 
    todos:[
      {id:1, title:'TODO_TEST_TITLE_1', done:false, year:2020, month:9, date:9},
    ], 
    clickDone: clickdone }));
  const wrapper = component.find('.notdone');
  wrapper.simulate('click');
  expect(clickdone).toHaveBeenCalledTimes(1);
  // console.log(component.debug());
});

it('should be clicked done-todos if done=false', () => {
  const clickdone = jest.fn();
  const component = shallow(Calendar({
    year:2020, month:10, 
    todos:[
      {id:1, title:'TODO_TEST_TITLE_1', done:true, year:2020, month:9, date:9},
    ], 
    clickDone: clickdone }));
  const wrapper = component.find('.done');
  wrapper.simulate('click');
  expect(clickdone).toHaveBeenCalledTimes(1);
  // console.log(component.debug());
});