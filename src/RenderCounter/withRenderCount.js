import T from 'prop-types';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';
import flattenProp from 'recompose/flattenProp';

const componentWillUpdate = ({ state }) => {
  state.count += 1; // eslint-disable-line no-param-reassign
};

const getInitialState = ({ initialCount }) => ({ count: initialCount });

const hoc = compose(
  withState('state', 'setState', getInitialState),
  lifecycle({ componentWillUpdate }),
  flattenProp('state'),
);

export default Component => Object.assign(hoc(Component), Component, {
  propTypes: {
    /**
     * Initial count for RenderCounter.
     */
    initialCount: T.number,
  },
  defaultProps: {
    initialCount: 1,
  },
});
