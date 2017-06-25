import _ from 'lodash';
import { createEmbeddedHandler } from './embedHandler';
import withHandlers from './withHandlers';

const createEmbeddedHandlers = handlers => _.mapValues(handlers, createEmbeddedHandler);

export default (handlers) => {
  const handlersArray = Array.isArray(handlers) ? handlers : [handlers];
  return withHandlers(handlersArray.map(createEmbeddedHandlers));
};
