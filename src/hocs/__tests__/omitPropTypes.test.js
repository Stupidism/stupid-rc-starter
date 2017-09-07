/* eslint-env jest */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import T from 'prop-types';
import omitPropTypes from '../omitPropTypes';

test('omitPropTypes removes the propTypes of the base component', () => {
  const BaseComponent = () => <div />;
  BaseComponent.propTypes = {
    foo: T.number,
    bar: T.number,
  };

  BaseComponent.defaultProps = {
    foo: 1,
    bar: 2,
  };

  const NewComponent = omitPropTypes(['foo'])(BaseComponent);

  expect(NewComponent).toBe(BaseComponent);
  expect(NewComponent.propTypes).toEqual({
    bar: T.number,
  });
  expect(NewComponent.defaultProps).toEqual({
    bar: 2,
  });
});
