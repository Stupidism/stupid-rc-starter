/* eslint-env jest */
import React from 'react';
import extendDefaultProps from '../extendDefaultProps';

test('extendDefaultProps extends the defaultProps of the base component', () => {
  const BaseComponent = () => <div />;
  const defaultProps = {
    foo: 1,
    bar: 2,
  };
  BaseComponent.defaultProps = defaultProps;

  const NewComponent = extendDefaultProps({ foo: undefined })(BaseComponent);

  expect(NewComponent).toBe(BaseComponent);
  expect(NewComponent.defaultProps).not.toBe(defaultProps);
  expect(NewComponent.defaultProps).toEqual({
    foo: undefined,
    bar: 2,
  });
});

test('extendDefaultProps does not change the defaultProps of the base component if input is falsy', () => {
  const BaseComponent = () => <div />;
  const defaultProps = {};
  BaseComponent.defaultProps = defaultProps;

  const NewComponent = extendDefaultProps(undefined)(BaseComponent);

  expect(NewComponent).toBe(BaseComponent);
  expect(NewComponent.defaultProps).toBe(defaultProps);
});
