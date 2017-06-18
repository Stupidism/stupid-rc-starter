import { action } from '@storybook/addon-actions';

const createUnstableHandler = (possibility = 0.5, log = action('onRerender')) => {
  const handler = (props, next) => (count) => {
    if (Math.random() < possibility) {
      next();
      log('hit', possibility, props, count);
    } else {
      log('miss', possibility, props, count);
    }
  };

  Object.defineProperty(handler, 'name', { value: handler.toString() });
  return handler;
};

export default createUnstableHandler;
