/* eslint-env jest */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import T from 'prop-types';
import extendPropTypes from '../extendPropTypes';

test('extendPropTypes extends the propTypes of the base component', () => {
  const BaseComponent = () => <div />;
  const propTypes = {
    foo: T.number.isRequired,
    bar: T.number.isRequired,
  };
  BaseComponent.propTypes = propTypes;

  const NewComponent = extendPropTypes({ foo: T.number })(BaseComponent);

  expect(NewComponent).toBe(BaseComponent);
  expect(NewComponent.propTypes).not.toBe(propTypes);
  expect(NewComponent.propTypes).toEqual({
    foo: T.number,
    bar: T.number.isRequired,
  });
});

test('extendPropTypes does not change the propTypes of the base component if input is falsy', () => {
  const BaseComponent = () => <div />;
  const propTypes = {};
  BaseComponent.propTypes = propTypes;

  const NewComponent = extendPropTypes(undefined)(BaseComponent);

  expect(NewComponent).toBe(BaseComponent);
  expect(NewComponent.propTypes).toBe(propTypes);
});
