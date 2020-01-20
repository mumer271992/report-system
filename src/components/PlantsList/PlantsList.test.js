import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';

import PlantsList from './PlantsList';
import { store } from '../../store/store';

jest.mock('axios');
const plants = [
  {
    uid: '6eccfd7f-b43c-4834-9c43-4bc74d8756b5',
    name: 'Plant 1'
  },
  {
    uid: 'a20c140b-1b12-4611-ad39-b0f792cdba47',
    name: 'Plant 1'
  },
  {
    uid: '6c2eee2a-7990-41f8-9228-5fcf34d99799',
    name: 'Plant 1'
  }
];
const dispatch = jest.fn();

function mountSetup() {
  const { Provider } = store;
  const state = {
    plants
  };

  const jsx = (
    <Provider value={{ state, dispatch }}>
      <PlantsList />
    </Provider>
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

  it('should render all list items', () => {
    const listItemsWrappers = wrapper.find('[data-test="list-item"]');
    expect(listItemsWrappers.length).toEqual(plants.length);
  });

  it('delete first item from list', async done => {
    const listItemsWrappers = wrapper.find('[data-test="list-item"]').at(0);
    const deleteItemButton = listItemsWrappers
      .find('[data-test="delete-plant-btn"]')
      .at(0);
    axios.delete.mockImplementationOnce(() => Promise.resolve({}));

    deleteItemButton.simulate('click');
    setTimeout(() => {
      expect(dispatch).toHaveBeenCalled();
      done();
    }, 1000);
  });
});
