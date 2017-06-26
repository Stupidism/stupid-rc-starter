import withHandlers from 'recompose/withHandlers';

export const createEmbeddedFunction = (innerFunc, outerFunc) => (...innerArgs) => {
  if (outerFunc.length <= innerFunc.length) {
    innerFunc(...innerArgs);
    return outerFunc(...innerArgs);
  }
  const next = () => innerFunc(...innerArgs);
  const outerArgs = [...innerArgs];
  outerArgs.length = innerFunc.length;
  return outerFunc(...outerArgs, next);
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

