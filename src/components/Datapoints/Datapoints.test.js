/*
  TEST PLAN

  ✔ Component renders properly
  ✔ All form fields are rendered
  ✔ Should display error message on submitting empty form 
  ✔ Submit button should remain disabel initiall 
  ✔ Should call axios mohod
*/

import React from 'react';
import axios from 'axios';
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

  it('should render form fields', () => {
    const inputWrapper = wrapper.find('[data-test="select_plant"]').at(0);
    const fromDateWrapper = wrapper.find('[data-test="from_date"]').at(0);
    const toDateWrapper = wrapper.find('[data-test="from_date"]').at(0);
    const buttonWrapper = wrapper.find('[data-test="update_btn"]');
    expect(inputWrapper.length).toEqual(1);
    expect(fromDateWrapper.length).toEqual(1);
    expect(toDateWrapper.length).toEqual(1);
    expect(buttonWrapper.length).toEqual(1);
  });

  it('button should be disabled initially', () => {
    const buttonWrapper = wrapper.find('[data-test="update_btn"]');
    expect(buttonWrapper.props().disabled).toBe(true);
  });

  it('button should be enabled on selecting all fields', () => {
    wrapper
      .find('[data-test="select_plant"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'plant_id',
          value: 'a20c140b-1b12-4611-ad39-b0f792cdba47'
        }
      });
    wrapper
      .find('[data-test="from_date"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'from_date',
          value: '2019-03-01'
        }
      });
    wrapper
      .find('[data-test="to_date"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'to_date',
          value: '2019-03-30'
        }
      });
    expect(wrapper.find('[data-test="update_btn"]').props().disabled).toBe(
      false
    );
  });

  it('on submit it should send netqork request', () => {
    wrapper
      .find('[data-test="select_plant"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'plant_id',
          value: 'a20c140b-1b12-4611-ad39-b0f792cdba47'
        }
      });
    wrapper
      .find('[data-test="from_date"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'from_date',
          value: '2019-03-01'
        }
      });
    wrapper
      .find('[data-test="to_date"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'to_date',
          value: '2019-03-30'
        }
      });

    const mockedAxiosPost = jest.fn(() =>
      Promise.resolve({
        ok: true
      })
    );
    axios.post = mockedAxiosPost;
    wrapper
      .find('[data-test="update_btn"]')
      .at(0)
      .simulate('submit');
    expect(mockedAxiosPost).toHaveBeenCalled();
  });
});
