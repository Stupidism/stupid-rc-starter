import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

export default (handlersArray) => {
  if (Array.isArray(handlersArray)) {
    if (handlersArray.length > 1) {
      const hocs = handlersArray.map(handlers => withHandlers(handlers));
      return compose(...hocs);
    }
    return withHandlers(handlersArray[0]);
  }
  return withHandlers(handlersArray);
};
