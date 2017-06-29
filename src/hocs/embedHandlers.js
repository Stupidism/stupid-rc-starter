import _ from 'lodash';
import { createEmbeddedHandler, createEmbeddedName } from './embedHandler';
import withHandlers from './withHandlers';

const createEmbeddedHandlers = (handlers) => {
  const embeddedHandlers = {};

  _.forEach(handlers, (innerName, outerName) => {
    const name = createEmbeddedName(innerName, outerName);
    embeddedHandlers[name] = createEmbeddedHandler(innerName, outerName);
  });

  return embeddedHandlers;
};

export default (handlers) => {
  const handlersArray = Array.isArray(handlers) ? handlers : [handlers];
  return withHandlers(handlersArray.map(createEmbeddedHandlers));
};
