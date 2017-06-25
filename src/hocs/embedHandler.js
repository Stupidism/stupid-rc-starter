import withHandlers from 'recompose/withHandlers';

export const createEmbeddedFunction = (innerFunc, outerFunc, ...outerArgs) => (...innerArgs) => {
  const next = () => innerFunc(...innerArgs);
  let handler;
  if (outerFunc.length > outerArgs.length) {
    handler = outerFunc(...outerArgs, next);
  } else {
    next();
    handler = outerFunc(...outerArgs);
  }
  return handler(...innerArgs);
};

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

  return createEmbeddedFunction(innerHandler, outerHandler, props);
};

export default (innerName, outerName) => withHandlers({
  [outerName]: createEmbeddedHandler(innerName, outerName),
});

