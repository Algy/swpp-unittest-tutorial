import React from 'react';
import { shallow, mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import Calendar from './Calendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';


let todos = [
    {
      id: 8,
      title: 'SWPP',
      content: 'take swpp class',
      done: true,
      year: 2019,
      month: 1,
      date: 1
    },
    {
      id: 9,
      title: 'Movie',
      content: 'Watch Movie',
      done: false,
      year: 2019,
      month: 1,
      date: 1
    },
    {
      id: 12,
      title: 'Dinner',
      content: 'eat dinner',
      done: false,
      year: 2019,
      month: 1,
      date: 1
    },
    {
      id: 13,
      title: 'tests',
      content: 'stset',
      done: false,
      year: 2020,
      month: 9,
      date: 8
    },
    {
      id: 14,
      title: 'test',
      content: 'go',
      done: false,
      year: 2020,
      month: 9,
      date: 8
    }
  ];

describe('<Calendar />', () => {
    it("should render without errors", () => {
        const component = shallow(<Calendar year="2020" month="10" todos={todos} clickDone="false"/>);
        const wrapper = component.find(".Calendar");
        expect(wrapper.length).toBe(1);
    })
});