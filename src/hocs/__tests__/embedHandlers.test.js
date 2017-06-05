/* eslint-env jest */
import { createEmbeddedHandler } from '../embedHandler';

test('embedHandlers should call mapValues with createEmbeddedHandler', () => {
  jest.mock('lodash.mapvalues', () => jest.fn());
  jest.mock('recompose/withHandlers', () => jest.fn());

  /* eslint-disable global-require */
  const embedHandlers = require('../embedHandlers').default;
  const mapValues = require('lodash.mapvalues');
  const withHandlers = require('recompose/withHandlers');
  /* eslint-enable global-require */

  const handlers = {};
  embedHandlers(handlers);
  expect(mapValues).toHaveBeenCalledTimes(1);
  expect(withHandlers).toHaveBeenCalledTimes(1);
  expect(mapValues).toHaveBeenCalledWith(handlers, createEmbeddedHandler);
});
