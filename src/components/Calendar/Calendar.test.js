import React from 'react';
import { shallow } from 'enzyme';

import Calendar from './Calendar';

const stubInitialState = {
    todos: [
        {id: 1, title: '1', done: false, year: 2019, month: 9, date: 1},
        {id: 2, title: '2', done: true, year: 2019, month: 9, date: 1},
        {id: 3, title: '3', done: false, year: 2019, month: 10, date: 1},
    ],
    selectedTodo: null,
};

describe('<Calendar />', () => {

    

    
    it('should handle clicks', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar clickDone={mockClickDone} todos={stubInitialState.todos} year={2019} month={10}/>);
        const wrapper = component.find('.todoTitle').at(0);
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });


})