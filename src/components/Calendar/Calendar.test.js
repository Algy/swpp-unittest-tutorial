import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';

describe('<Calendar />', () => {
	const todos = [
		{id: 1, title:'TEST_TITLE', done: false, year:2000, month:1, date:2 }
	]
	beforeEach(() => {
	});

	it('should render Table', () => {
		const component = shallow(<Calendar />);
		const wrapper = component.find('Table');
		expect(wrapper.length).toBe(1);
	});

  it('should render title', () => {
    const component = shallow(<Calendar todos={todos} year={2000} month={2}/>);
    const wrapper = component.find('.todoTitle');
		expect(wrapper.at(0).text()).toBe('TEST_TITLE');
  });
  it('should call clickDone', () => {
		const mockClickDone = jest.fn((id) => {});
    const component = shallow(<Calendar todos={todos} year={2000} month={2} clickDone={mockClickDone}/>);
    const wrapper = component.find('.todoTitle');
		wrapper.at(0).simulate('click');
		expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
	it('should render notdone if done=false', () => {
		const todos = [
			{ id: 1, title:'TEST_TITLE', done: false, year:2000, month:1, date:2 }
		]
		const mockClickDone = jest.fn((id) => {});
    const component = shallow(<Calendar todos={todos} year={2000} month={2}/>); 
    const wrapper = component.find('.notdone').at(0);
		expect(wrapper.length).toBe(1)
		});
	it('should render done if done=false', () => {
		const todos = [
			{ id: 1, title:'TEST_TITLE', done: true, year:2000, month:1, date:2 }
		]
		const mockClickDone = jest.fn((id) => {});
    const component = shallow(<Calendar todos={todos} year={2000} month={2}/>); 
    const wrapper = component.find('.done').at(0);
		expect(wrapper.length).toBe(1)
		});
/*
  it('should render y', () => {
    const component = shallow(<Todo done={false} title={'TEST_TITLE'} />);
    let wrapper = component.find('.done');
    expect(wrapper.length).toBe(0);
    wrapper = component.find('.text');
    expect(wrapper.text()).toEqual('TEST_TITLE');
	});
*/
});
