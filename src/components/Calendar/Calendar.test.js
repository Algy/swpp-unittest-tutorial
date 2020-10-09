import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

import Calendar from './Calendar';

const todos =  [
    {id: 1, title: 'TODO_TEST_TITLE_1', content:'content1', done: false, year: 2019, month: 10, date: 1},
    {id: 2, title: 'TODO_TEST_TITLE_2', content:'content2', done: false, year: 2019, month: 10, date: 1},
    {id: 3, title: 'TODO_TEST_TITLE_3', content:'content3', done: false, year: 2019, month: 10, date: 1},
];

describe('<Calendar />', () => {
    it('should render without errors', () => {
        const component = shallow(<Calendar/>);
        const wrapper = component.find('.calendar')
        expect(wrapper.length).toBe(1);
    })

    it('should render cell', () => {
        const component = shallow(<Calendar year={2019} month={10} todos={todos}/>)
        const wrapper = component.find('.cell');
        expect(wrapper.length).toBe(31)
    })
})

