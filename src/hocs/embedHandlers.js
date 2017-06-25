import mapValues from 'lodash.mapvalues';
import { createEmbeddedHandler } from './embedHandler';
import withHandlers from './withHandlers';

const createEmbeddedHandlers = handlers => mapValues(handlers, createEmbeddedHandler);

export default (handlers) => {
  const handlersArray = Array.isArray(handlers) ? handlers : [handlers];
  return withHandlers(handlersArray.map(createEmbeddedHandlers));
};
