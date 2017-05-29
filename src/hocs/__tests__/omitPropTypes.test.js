/* eslint-env jest */
import React from 'react';
import T from 'prop-types';
import omitPropTypes from '../omitPropTypes';

test('omitPropTypes removes the propTypes of the base component', () => {
  const BaseComponent = () => <div />;
  BaseComponent.propTypes = {
    foo: T.number.isRequired,
    bar: T.number.isRequired,
  };

  const NewComponent = omitPropTypes(['foo'])(BaseComponent);

  expect(NewComponent).toBe(BaseComponent);
  expect(NewComponent.propTypes).toEqual({
    bar: T.number.isRequired,
  });
});
