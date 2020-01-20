import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';

import AddPlant from './AddPlant';
import { StateProvider } from '../../store/store';

jest.mock('axios');

function mountSetup() {
  const jsx = (
    <StateProvider>
      <AddPlant />
    </StateProvider>
  );
  const wrapper = mount(jsx);
  return wrapper;
}

describe('renders add plant component without crashing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountSetup();
  });

  it('should renders properly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('is form fields rendered', () => {
    const inputWrapper = wrapper.find('[data-test="plant-name"]');
    const buttonWrapper = wrapper.find('[data-test="add-plant-btn"]');
    expect(inputWrapper.length).toEqual(1);
    expect(buttonWrapper.length).toEqual(1);
  });

  it('submit empty form and show error', () => {
    const formWrapper = wrapper.find('[data-test="add-plant-form"]').at(0);
    formWrapper.simulate('submit');
    const errorAlertWrapper = wrapper.find('[data-test="danger-alert"]');
    expect(errorAlertWrapper.length).toEqual(1);
  });

  it('fill and submit form', () => {
    const inputWrapper = wrapper.find('[data-test="plant-name"]').at(0);
    const formWrapper = wrapper.find('[data-test="add-plant-form"]').at(0);
    const plantName = 'Test plant';
    inputWrapper.props().value = plantName;
    inputWrapper.simulate('change', {
      target: {
        value: plantName,
        name: 'plant-name'
      }
    });
    expect(inputWrapper.props().value).toEqual(plantName);
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        uid: 'aasdasdads',
        name: plantName
      })
    );

    formWrapper.simulate('submit');
    setTimeout(() => {
      expect(inputWrapper.props().value).toEqual('');
      const successAlertWrapper = wrapper.find('[data-test="success-alert"]');
      expect(successAlertWrapper).toEqual(1);
    }, 1000);
  });
});
