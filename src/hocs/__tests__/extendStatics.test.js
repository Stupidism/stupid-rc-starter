/* eslint-env jest */
import React from 'react';
import T from 'prop-types';
import extendStatics from '../extendStatics';

test('extendStatics extends displayName, propTypes and defaultProps on the base component', () => {
  const BaseComponent = () => <div />;
  const propTypes = {
    foo: T.number.isRequired,
    bar: T.number.isRequired,
  };
  const defaultProps = {
    foo: 1,
    bar: 2,
  };

  BaseComponent.propTypes = propTypes;
  BaseComponent.defaultProps = defaultProps;

  const NewComponent = extendStatics({
    displayName: 'new',
    propTypes: { foo: T.number },
    defaultProps: { bar: undefined },
  })(BaseComponent);

  expect(NewComponent).toBe(BaseComponent);
  expect(NewComponent.displayName).toBe('new(BaseComponent)');
  expect(NewComponent.propTypes).not.toBe(propTypes);
  expect(NewComponent.propTypes).toEqual({
    foo: T.number,
    bar: T.number.isRequired,
  });
  expect(NewComponent.defaultProps).not.toBe(defaultProps);
  expect(NewComponent.defaultProps).toEqual({
    foo: 1,
    bar: undefined,
  });
});

describe('extendStatics has default behaviour if input is falsy', () => {
  const BaseComponent = () => <div />;
  const propTypes = {};
  const defaultProps = {};

  BaseComponent.propTypes = propTypes;
  BaseComponent.defaultProps = defaultProps;

  const NewComponent = extendStatics(undefined)(BaseComponent);
  test('it modifies the base component and returns it', () => {
    expect(NewComponent).toBe(BaseComponent);
  });

  test('it wraps the component name with extend', () => {
    expect(NewComponent.displayName).toBe('extend(BaseComponent)');
  });

  test('it does not change propTypes and defaultProps on the base component ', () => {
    expect(NewComponent.propTypes).toBe(propTypes);
    expect(NewComponent.defaultProps).toBe(defaultProps);
  });
});
