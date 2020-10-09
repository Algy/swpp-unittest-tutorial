import React from 'react';
import { mount, shallow } from 'enzyme';
import TodoCalendar from './TodoCalendar';

describe('<TodoCalendar />', () => {
  let newTodo;

  beforeEach(() => {
    newTodo = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={NewTodo} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('year is', () => {
    const wrapper = mount(<TodoCalendar />);
    expect(wrapper.state().year).toBe(2019);
  });

  it('should render without errors', () => {
    const component = mount(<TodoCalendar />);
    const wrapper = component.find('.year');
    expect(wrapper.length).toBe(1);
  });
});
