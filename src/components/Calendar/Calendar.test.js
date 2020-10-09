import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar.js';


describe('<Calendar />', () => {
    
    it('should render without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('Table');
        expect(wrapper.length).toBe(1);
    });

    it('should render title as done if done', () => {
        let year = 2020;
        let month = 11;
        const todos=[
        {year: 2020,month:10,date:8,id:1,done:true,title:'title 1'},
        {year: 2020,month:5,date:10,id:1,done:false,title:'title 2'},
        {year: 2019,month:3,date:25,id:2,done:false,title:'title 3'},
        ];
        const mockClickDone = jest.fn();
        const component = mount(<Calendar todos={todos} year={year} month={month} clickDone={mockClickDone} />);
        const wrapper = component.find('.done');
        expect(wrapper.length).toBe(1);


    });

    it('should handle clicks', () => {
        
        let year = 2020;
        let month = 6;
        const todos=[
        {year: 2020,month:10,date:8,id:1,done:true,title:'title 1'},
        {year: 2020,month:5,date:10,id:1,done:false,title:'title 2'},
        {year: 2019,month:3,date:25,id:2,done:false,title:'title 3'},
        ];
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar year={year} month={month} todos={todos} clickDone={mockClickDone} />);
        const wrapper = component.find('.notdone');
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });

});
