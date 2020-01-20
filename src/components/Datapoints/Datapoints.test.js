import React from 'react';
import { mount } from 'enzyme';

import Datapoints from './Datapoints';
import { StateProvider } from '../../store/store';

jest.mock('axios');

function mountSetup() {
  const jsx = (
    <StateProvider>
      <Datapoints />
    </StateProvider>
  );
  const wrapper = mount(jsx);
  return wrapper;
}

describe('renders datapoints component without crashing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountSetup();
  });

  it('should renders properly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('is form fields rendered', () => {
    const inputWrapper = wrapper.find('[data-test="select_plant"]').at(0);
    const fromDateWrapper = wrapper.find('[data-test="from_date"]').at(0);
    const toDateWrapper = wrapper.find('[data-test="from_date"]').at(0);
    const buttonWrapper = wrapper.find('[data-test="update_btn"]');
    expect(inputWrapper.length).toEqual(1);
    expect(fromDateWrapper.length).toEqual(1);
    expect(toDateWrapper.length).toEqual(1);
    expect(buttonWrapper.length).toEqual(1);
  });

  it('is button disabled initially', () => {
    const buttonWrapper = wrapper.find('[data-test="update_btn"]');
    expect(buttonWrapper.props().disabled).toBe(true);
  });
});
