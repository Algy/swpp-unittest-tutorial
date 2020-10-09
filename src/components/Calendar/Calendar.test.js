import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Calendar from './Calendar'

describe('<Calendar />', ()=>{
    const todos = [{
        year: 2020,
        month: 12,
        date: 1
    }];

    it('should render Calendar header', ()=>{
        const component = shallow(<Calendar/>);
        const wrapper = component.find('.sunday');
        expect(wrapper.length).toBe(1);
    })

    it('should call renderCalender', ()=>{
        const component = shallow(<Calendar year={2020} month={12} todos={todos}/>)
        const wrapper = component.find('date');
        expect(wrapper.length).toBe(0);
    })
})

