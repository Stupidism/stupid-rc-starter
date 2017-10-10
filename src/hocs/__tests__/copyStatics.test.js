/* eslint-env jest */
/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import copyStatics from '../copyStatics';

test('copyStatics copies displayName, propTypes and defaultProps from the src component to the dest component', () => {
  const DestComponent = () => <div />;
  const SrcComponent = () => <div />;
  SrcComponent.propTypes = {};
  SrcComponent.defaultProps = {};

  DestComponent.defaultProps = {
    foo: 1,
    bar: 2,
  };

  const NewComponent = copyStatics(SrcComponent)(DestComponent);

  expect(NewComponent).toBe(DestComponent);
  expect(NewComponent.displayName).toBe('SrcComponent');
  expect(NewComponent.propTypes).toBe(SrcComponent.propTypes);
  expect(NewComponent.defaultProps).toBe(SrcComponent.defaultProps);
});
