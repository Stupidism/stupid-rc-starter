import { shallow } from 'enzyme';

// Copied from gist
// https://gist.github.com/matthieuprat/5fd37abbd4a4002e6cfe0c73ae54cda8
export default function until(selector, options = this.options) {
  if (this.isEmptyRender() || typeof this.node.type === 'string') { return this; }

  let context = options.context;

  const instance = this.instance();
  if (instance.getChildContext) {
    context = {
      ...context,
      ...instance.getChildContext(),
    };
  }

  const wrapper = this.shallow({ context });

  if (!this.is(selector)) {
    return until.call(wrapper, selector, { context });
  }

  return wrapper;
}

export const shallowWithUntil = (...args) => {
  const wrapper = shallow(...args);
  return Object.assign(wrapper, { until });
};
