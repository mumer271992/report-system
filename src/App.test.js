import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import { StateProvider } from './store/store';

describe('renders learn react link', () => {
  it('renders learn react link', () => {
    const jsx = (
      <StateProvider>
        <App />
      </StateProvider>
    );
    const wrapper = mount(jsx);
    expect(wrapper.length).toEqual(1);
  });
});
