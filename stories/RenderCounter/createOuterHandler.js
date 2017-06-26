import { action } from '@storybook/addon-actions';

const createOuterHandler = ({ name, block }) => {
  const log = action(name);
  let handler;
  if (block) {
    // eslint-disable-next-line no-unused-vars
    handler = (count, next) => log('handler blocked', count);
  } else {
    handler = count => log('handler called', count);
  }

  Object.defineProperty(handler, 'name', { value: handler.toString() });
  return handler;
};

export default createOuterHandler;
