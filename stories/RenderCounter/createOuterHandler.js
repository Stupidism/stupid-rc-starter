import { action } from '@storybook/addon-actions';

const createOuterHandler = ({ name, block }) => {
  const log = action(name);
  const handler = (props, next) => (count) => {
    if (block) {
      log('handler blocked', props, count);
    } else {
      next();
      log('handler called', props, count);
    }
  };

  Object.defineProperty(handler, 'name', { value: handler.toString() });
  return handler;
};

export default createOuterHandler;
