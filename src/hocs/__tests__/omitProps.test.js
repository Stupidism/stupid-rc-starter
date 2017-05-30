/* eslint-env jest */
import React from 'react';
import omitProps from '../omitProps';
import withPropsPeeker from '../withPropsPeeker';

test('omitProps removes the some props of the new component', () => {
  const props = {};
  const BaseComponent = withPropsPeeker(props)(() => <div />);
  const NewComponent = omitProps(['foo'])(BaseComponent);

  NewComponent({ foo: 1, bar: 1 });
  expect(props).toEqual({ bar: 1 });
});
