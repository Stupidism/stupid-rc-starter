import withHandlers from 'recompose/withHandlers';

export const createEmbeddedHandler = (innerName, outerName) => (props) => {
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

  return (...args) => {
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
};

export default (innerName, outerName) => withHandlers({
  [outerName]: createEmbeddedHandler(innerName, outerName),
});

