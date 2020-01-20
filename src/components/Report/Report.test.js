import React from 'react';
import { shallow } from 'enzyme';

import Report from './Report';
import { StateProvider } from '../../store/store';

jest.mock('axios');

function mountSetup() {
  const jsx = (
    <StateProvider>
      <Report />
    </StateProvider>
  );
  const wrapper = shallow(jsx);
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
});
