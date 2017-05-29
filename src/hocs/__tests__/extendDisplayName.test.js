/* eslint-env jest */
import React from 'react';
import extendDisplayName from '../extendDisplayName';

describe('extendDisplayName wraps displayName on the base component', () => {
  const equivalentOpitons = [
    'new',
    { name: 'new' },
    { name: 'new', operation: 'wrap' },
  ];

  equivalentOpitons.forEach((options) => {
    test(`options ${JSON.stringify(options)}`, () => {
      const BaseComponent = () => <div />;
      BaseComponent.displayName = 'BaseComponent';

      const NewComponent = extendDisplayName(options)(BaseComponent);
      expect(NewComponent).toBe(BaseComponent);
      expect(NewComponent.displayName).toEqual('new(BaseComponent)');
    });
  });
});

test('extendDisplayName replaces a new displayName on the base component', () => {
  const BaseComponent = () => <div />;
  BaseComponent.displayName = 'BaseComponent';

  const NewComponent = extendDisplayName({
    name: 'NewComponent',
    operation: 'replace',
  })(BaseComponent);

  expect(NewComponent).toBe(BaseComponent);
  expect(NewComponent.displayName).toEqual('NewComponent');
});

test('extendDisplayName does not change displayName the base component for unknown operation', () => {
  const BaseComponent = () => <div />;
  BaseComponent.displayName = 'BaseComponent';

  const NewComponent = extendDisplayName({
    name: 'NewComponent',
    operation: 'sd',
  })(BaseComponent);

  expect(NewComponent).toBe(BaseComponent);
  expect(NewComponent.displayName).toEqual('BaseComponent');
});
