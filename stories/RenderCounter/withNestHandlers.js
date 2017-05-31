import _ from 'lodash';
import withHandlers from 'recompose/withHandlers';

const createCallbackStyleHandler = ({ innerHandler, outerHandler, props }) => (...args) => {
  const next = () => innerHandler(...args);
  let handler;
  if (outerHandler.length > 1) {
    handler = outerHandler(props, next);
  } else {
    next();
    handler = outerHandler(props);
  }
  return handler(...args);
};

export const nestHandler = (innerName, outerName) => (props) => {
  let innerHandler;
  if (typeof innerName === 'function') {
    innerHandler = innerName(props);
  } else if (typeof innerName === 'string') {
    innerHandler = props[innerName];
  }
  if (typeof innerHandler !== 'function') {
    throw new Error('innerName must be a handler or the name of it');
  }

  const outerHandler = props[outerName];

  if (!outerHandler) return innerHandler;

  return createCallbackStyleHandler({ props, innerHandler, outerHandler });
};

const withNestHandlers = handlers => withHandlers(_.mapValues(handlers, nestHandler));

export default withNestHandlers;
