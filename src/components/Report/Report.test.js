/*
  TEST PLAN

  ✔ Component renders properly
  ✔ All form fields are rendered
  ✔ button should be disabled initially
  ✔ button should be enabled on selecting all fields
  ✔ on submit it should send network request
*/

import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';

import Report from './Report';
import { StateProvider } from '../../store/store';

jest.mock('axios');

function mountSetup() {
  const jsx = (
    <StateProvider>
      <Report />
    </StateProvider>
  );
  const wrapper = mount(jsx);
  return wrapper;
}

describe('renders report component without crashing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountSetup();
  });

  it('should renders properly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should render form fields', () => {
    const plantIDWrapper = wrapper.find('[data-test="plant_id"]');
    const typeWrapper = wrapper.find('[data-test="type"]');
    const dateWrapper = wrapper.find('[data-test="date"]');
    const buttonWrapper = wrapper.find('[data-test="report_btn"]');
    expect(plantIDWrapper.length).toEqual(1);
    expect(typeWrapper.length).toEqual(1);
    expect(dateWrapper.length).toEqual(1);
    expect(buttonWrapper.length).toEqual(1);
  });

  it('button should be disabled initially', () => {
    const buttonWrapper = wrapper.find('[data-test="report_btn"]');
    expect(buttonWrapper.props().disabled).toBe(true);
  });

  it('button should be enabled on selecting all fields', () => {
    wrapper
      .find('[data-test="plant_id"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'plant_id',
          value: 'a20c140b-1b12-4611-ad39-b0f792cdba47'
        }
      });
    wrapper
      .find('[data-test="type"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'type',
          value: 'energy'
        }
      });
    wrapper
      .find('[data-test="date"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'date',
          value: '2019-03-30'
        }
      });
    expect(wrapper.find('[data-test="report_btn"]').props().disabled).toBe(
      false
    );
  });

  it('on submit it should send network request', () => {
    wrapper
      .find('[data-test="plant_id"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'plant_id',
          value: 'a20c140b-1b12-4611-ad39-b0f792cdba47'
        }
      });
    wrapper
      .find('[data-test="type"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'type',
          value: 'energy'
        }
      });
    wrapper
      .find('[data-test="date"]')
      .at(0)
      .simulate('change', {
        target: {
          name: 'date',
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
      .find('[data-test="report_btn"]')
      .at(0)
      .simulate('submit');
    expect(mockedAxiosPost).toHaveBeenCalled();
  });
});
