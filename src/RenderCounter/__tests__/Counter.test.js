/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import Counter from '../Counter';

test('Counter renders the prop count', () => {
  const wrapper = mount(<Counter count={32} />);

  expect(wrapper.text()).toEqual('32');
});
