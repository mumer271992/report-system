import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';

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

  it('should render form fields', () => {
    const inputWrapper = wrapper.find('[data-test="plant-name"]');
    const buttonWrapper = wrapper.find('[data-test="add-plant-btn"]');
    expect(inputWrapper.length).toEqual(1);
    expect(buttonWrapper.length).toEqual(1);
  });

  it('should display error on submiting empty form', () => {
    const formWrapper = wrapper.find('[data-test="add-plant-form"]').at(0);
    formWrapper.simulate('submit');
    const errorAlertWrapper = wrapper.find('[data-test="danger-alert"]');
    expect(errorAlertWrapper.length).toEqual(1);
  });

  it('should display success message on submit form', () => {
    const plantName = 'Test plant';
    wrapper
      .find('[data-test="plant-name"]')
      .at(0)
      .simulate('change', {
        target: {
          value: plantName,
          name: 'plant-name'
        }
      });
    expect(
      wrapper
        .find('[data-test="plant-name"]')
        .at(0)
        .props().value
    ).toEqual(plantName);
    const mockedFunc = jest.fn(() =>
      Promise.resolve({
        uid: 'aasdasdads',
        name: plantName
      })
    );
    axios.post = mockedFunc;

    wrapper
      .find('[data-test="add-plant-form"]')
      .at(0)
      .simulate('submit');
    expect(mockedFunc).toHaveBeenCalled();
  });
});
