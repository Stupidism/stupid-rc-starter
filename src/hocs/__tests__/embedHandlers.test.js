/* eslint-env jest */
import _ from 'lodash';
import { createEmbeddedHandler } from '../embedHandler';

describe('embedHandlers(handlers):HOC', () => {
  jest.mock('lodash', () => ({
    mapValues: jest.fn(),
  }));
  jest.mock('../withHandlers', () => jest.fn());

  /* eslint-disable global-require */
  const mapValues = require('lodash').mapValues;
  const withHandlers = require('../withHandlers');

  const embedHandlers = require('../embedHandlers').default;
  /* eslint-enable global-require */

  beforeEach(() => {
    mapValues.mockClear();
    withHandlers.mockClear();
  });

  test('embedHandlers(Object<handler>)', () => {
    const handlers = _.stubObject();
    embedHandlers(handlers);
    expect(mapValues).toHaveBeenCalledTimes(1);
    expect(mapValues).toHaveBeenCalledWith(handlers, createEmbeddedHandler);
    expect(withHandlers).toHaveBeenCalledTimes(1);
  });

  it('embedHandlers(Array<Object<handler>>)', () => {
    const handlers = [_.stubObject(), _.stubObject()];
    embedHandlers(handlers);
    expect(mapValues).toHaveBeenCalledTimes(2);
    expect(mapValues).toHaveBeenCalledWith(handlers[0], createEmbeddedHandler);
    expect(mapValues).toHaveBeenCalledWith(handlers[1], createEmbeddedHandler);
    expect(withHandlers).toHaveBeenCalledTimes(1);
  });
});

