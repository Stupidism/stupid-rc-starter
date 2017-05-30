/* eslint-env jest */
import React from 'react';
import withPropsPeeker from '../withPropsPeeker';

test('withPropsPeeker peeks props passed to the base component', () => {
  const props = {};
  const BaseComponent = () => <div />;
  const NewComponent = withPropsPeeker(props)(BaseComponent);

  NewComponent({ foo: 1, bar: 1 });
  expect(props).toEqual({ foo: 1, bar: 1 });
});
