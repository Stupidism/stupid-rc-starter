import { action } from '@storybook/addon-actions';

const createOuterHandler = ({ name, block }) => {
  const log = action(name);
  let handler;
  if (block) {
    // eslint-disable-next-line no-unused-vars
    handler = (props, next) => count => log('handler blocked', props, count);
  } else {
    handler = props => count => log('handler blocked', props, count);
  }

  Object.defineProperty(handler, 'name', { value: handler.toString() });
  return handler;
};

export default createOuterHandler;
