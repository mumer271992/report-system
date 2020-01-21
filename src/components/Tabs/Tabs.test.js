/*
  TEST PLAN

  ✔ Component renders properly
*/

import React from 'react';
import { shallow } from 'enzyme';

import Tabs from './Tabs';

function mountSetup() {
  const jsx = (
    <Tabs defaultTab="tab1">
      <div label="tab1" uniqueKey="tab1">
        Tab 1
      </div>
      <div label="tab2" uniqueKey="tab2">
        Tab 2
      </div>
    </Tabs>
  );
  const wrapper = shallow(jsx);
  return wrapper;
}

describe('renders tabs component without crashing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountSetup();
  });

  it('should renders properly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render all tabs', () => {
    expect(wrapper.find('[data-test="tab-items"]').length).toBe(2);
  });

  it('should active default tab', () => {
    expect(
      wrapper
        .find('.nav-link.active')
        .at(0)
        .text()
    ).toEqual('tab1');
  });

  it('should change active tab on click', () => {
    wrapper
      .find('.nav-link')
      .at(1)
      .simulate('click');
    expect(
      wrapper
        .find('.nav-link.active')
        .at(0)
        .text()
    ).toEqual('tab2');
  });
});
