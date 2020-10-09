import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import { Item } from 'semantic-ui-react';
const todos= [
      {id: 1, title: 'TODO_TEST_TITLE_1',year:2019,month:12,date:1, done: false},
      {id: 2, title: 'TODO_TEST_TITLE_2',year:2019,month:12,date:1, done: true},
      {id: 3, title: 'TODO_TEST_TITLE_3',year:2019,month:12,date:1 ,done: false},
    ]
  

describe('Calendar',()=>{
   it('should render renderCalendr',()=>{
       const mockdone=jest.fn();
       const component=shallow(Calendar({year:2019,month:2,todos:todos,clickDone:mockdone}));
       const wrapper=component.find(`.todoTitle notdone`);
       
       expect(wrapper.length).toBe(0);
     
   })
    
})