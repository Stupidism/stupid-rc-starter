/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import omitProps from '../omitProps';

test('omitProps removes the some props of the new component', () => {
  const BaseComponent = jest.fn(() => null);
  const NewComponent = omitProps(['foo'])(BaseComponent);
  mount(<NewComponent foo={1} bar={1} />);
  expect(BaseComponent.mock.calls[0][0]).toEqual({ bar: 1 });
});
