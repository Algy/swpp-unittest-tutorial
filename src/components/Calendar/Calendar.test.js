import React from 'react';
import { shallow} from 'enzyme';
import Calendar from './Calendar';

const stub_todos = [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: true, year:2020, month:10, date:13},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: true, year:2020, month:9, date:2},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year:2020, month:9, date:3}
];


describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.Calendar');
    expect(wrapper.length).toBe(1);
  });

  it('should render when done is true', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2020} month={10} todos={stub_todos} clickDone={mockClickDone} />);
    let wrapper = component.find('.done');
    expect(wrapper.length).toBe(1);
  });

  it('should handle clicks',()=>{
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2020} month={10} todos={stub_todos}  clickDone={mockClickDone}/>);
    const wrapper = component.find('.todoTitle').at(0);
    wrapper.simulate('click');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(2);
});
});