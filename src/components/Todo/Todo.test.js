import React from 'react';
import { shallow } from 'enzyme';
import Todo from './Todo';

describe('<Todo />', () => {
  it('should render without errors', () => {
    const component = shallow(<Todo />);
    const wrapper = component.find('.Todo');
    expect(wrapper.length).toBe(1);
  });
  
  it('should render title as done if done=true', () => {
      const component = shallow(<Todo done={true} title={'TEST_TITLE'} />);
      const wrapper = component.find('.done');
      expect(wrapper.text()).toEqual('TEST_TITLE');
  });
   

  it('should handle click', () => {
      const mockClickDone = jest.fn();
      const component = shallow(<Todo clickDone={mockClickDone} />);
      const wrapper = component.find('.doneButton');
      wrapper.simulate('click');
      expect(mockClickDone).toHaveBeenCalledTimes(1);
  });

});
