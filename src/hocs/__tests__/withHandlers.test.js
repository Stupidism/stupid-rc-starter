/* eslint-env jest */
import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';

jest.mock('recompose', () => {
  const { withHandlers, compose } = require.requireActual('recompose');
  return {
    compose,
    withHandlers: jest.fn(withHandlers),
  };
});

/* eslint-disable global-require */
const withHandlers = require('../withHandlers').default;
const originalWithHandlers = require('recompose').withHandlers;
/* eslint-enable global-require */

describe('withHandlers calls recompose/withHandlers', () => {
  const handlers = {
    foo: _.stubObject(),
    bar: _.stubObject(),
  };

  beforeEach(() => originalWithHandlers.mockClear());

  it('should call withHandlers normally when handler is not array', () => {
    withHandlers(handlers);
    expect(originalWithHandlers).toHaveBeenCalledTimes(1);
    expect(originalWithHandlers).toHaveBeenCalledWith(handlers);
  });

  it('should call withHandlers normally when handler is array with length 1', () => {
    withHandlers([handlers]);
    expect(originalWithHandlers).toHaveBeenCalledTimes(1);
    expect(originalWithHandlers).toHaveBeenCalledWith(handlers);
  });

  it('should call withHandlers normally when handler is array with length > 1', () => {
    withHandlers([handlers.foo, handlers.bar]);
    expect(originalWithHandlers).toHaveBeenCalledTimes(2);
    expect(originalWithHandlers).toHaveBeenCalledWith(handlers.foo);
    expect(originalWithHandlers).toHaveBeenCalledWith(handlers.bar);
  });
});

test('withHandlers makes handlers depend on each other hierarchically', () => {
  const foo = jest.fn();
  const handlers = [{
    fooLevel1: () => foo,
  }, {
    fooLevel2: ({ fooLevel1 }) => fooLevel1,
  }];
  const BaseComponent = jest.fn(() => null);
  const NewCompoent = withHandlers(handlers)(BaseComponent);
  mount(<NewCompoent />);
  const props = BaseComponent.mock.calls[0][0];

  expect(props.fooLevel1).not.toBeUndefined();
  expect(props.fooLevel2).not.toBeUndefined();

  props.fooLevel1(1, 1);
  expect(foo).toHaveBeenCalledTimes(1);
  expect(foo).toHaveBeenCalledWith(1, 1);

  props.fooLevel2(2, 2);
  expect(foo).toHaveBeenCalledTimes(2);
  expect(foo).toHaveBeenCalledWith(2, 2);
});
