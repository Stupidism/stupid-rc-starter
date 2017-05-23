import React from 'react';
import { mount } from 'enzyme';
import RenderCounter from '../../src/RenderCounter';

test('RenderCounter changes the text after update', () => {
  // Render a checkbox with label in the document
  const wrapper = mount(<RenderCounter />);

  expect(wrapper.text()).toEqual('1');
  wrapper.update();
  expect(wrapper.text()).toEqual('2');
});
