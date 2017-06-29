import _ from 'lodash';
import { createEmbeddedHandler } from './embedHandler';
import withHandlers from './withHandlers';

const createEmbeddedHandlers = handlers => _.mapValues(
  handlers,
  (innerName, outerName) => createEmbeddedHandler(innerName, outerName),
);

export default (handlers) => {
  const handlersArray = Array.isArray(handlers) ? handlers : [handlers];
  return withHandlers(handlersArray.map(createEmbeddedHandlers));
};
