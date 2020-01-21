/*
  TEST PLAN

  ✔ Component renders properly
*/

import React from 'react';
import { shallow } from 'enzyme';

import Graph from './Graph';
import { StateProvider } from '../../store/store';

jest.mock('axios');

function mountSetup() {
  const mockData = [
    {
      day: '2019-04-01',
      total_energy_expected: 1278.2491284683547,
      total_energy_observed: 1272.342430344096,
      total_irradiation_expected: 1252.1082515706937,
      total_irradiation_observed: 1162.0592040652755
    },
    {
      day: '2019-04-02',
      total_energy_expected: 1204.6575511494805,
      total_energy_observed: 1268.8976717602177,
      total_irradiation_expected: 1231.8414890926529,
      total_irradiation_observed: 1382.101875360679
    },
    {
      day: '2019-04-03',
      total_energy_expected: 1174.3523566861077,
      total_energy_observed: 1121.1422038884245,
      total_irradiation_expected: 1023.3172006158673,
      total_irradiation_observed: 1423.8315747251172
    }
  ];
  const jsx = (
    <StateProvider>
      <Graph type="energy" data={mockData} />
    </StateProvider>
  );
  const wrapper = shallow(jsx);
  return wrapper;
}

describe('renders graph component without crashing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountSetup();
  });

  it('should renders properly', () => {
    expect(wrapper.length).toEqual(1);
  });
});
