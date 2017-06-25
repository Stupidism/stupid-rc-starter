/* eslint-env jest */
import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import withPropsPeeker from '../withPropsPeeker';

jest.mock('recompose/withHandlers', () => {
  const recomposeWithHandlers = require.requireActual('recompose/withHandlers').default;
  return jest.fn(recomposeWithHandlers);
});

/* eslint-disable global-require */
const withHandlers = require('../withHandlers').default;
const recomposeWithHandlers = require('recompose/withHandlers');
/* eslint-enable global-require */

describe('withHandlers calls recompose/withHandlers', () => {
  const handlers = {
    foo: _.stubObject(),
    bar: _.stubObject(),
  };

  beforeEach(() => recomposeWithHandlers.mockClear());

  it('should call withHandlers normally when handler is not array', () => {
    withHandlers(handlers);
    expect(recomposeWithHandlers).toHaveBeenCalledTimes(1);
    expect(recomposeWithHandlers).toHaveBeenCalledWith(handlers);
  });

  it('should call withHandlers normally when handler is array with length 1', () => {
    withHandlers([handlers]);
    expect(recomposeWithHandlers).toHaveBeenCalledTimes(1);
    expect(recomposeWithHandlers).toHaveBeenCalledWith(handlers);
  });

  it('should call withHandlers normally when handler is array with length > 1', () => {
    withHandlers([handlers.foo, handlers.bar]);
    expect(recomposeWithHandlers).toHaveBeenCalledTimes(2);
    expect(recomposeWithHandlers).toHaveBeenCalledWith(handlers.foo);
    expect(recomposeWithHandlers).toHaveBeenCalledWith(handlers.bar);
  });
});

test('withHandlers makes handlers depend on each other hierarchically', () => {
  const foo = jest.fn();
  const handlers = [{
    fooLevel1: () => foo,
  }, {
    fooLevel2: ({ fooLevel1 }) => fooLevel1,
  }];
  const props = {};
  const BaseComponent = withPropsPeeker(props)(() => <div />);
  const NewCompoent = withHandlers(handlers)(BaseComponent);
  mount(<NewCompoent />);
  expect(props.fooLevel1).not.toBeUndefined();
  expect(props.fooLevel2).not.toBeUndefined();

  props.fooLevel1(1, 1);
  expect(foo).toHaveBeenCalledTimes(1);
  expect(foo).toHaveBeenCalledWith(1, 1);

  props.fooLevel2(2, 2);
  expect(foo).toHaveBeenCalledTimes(2);
  expect(foo).toHaveBeenCalledWith(2, 2);
});
