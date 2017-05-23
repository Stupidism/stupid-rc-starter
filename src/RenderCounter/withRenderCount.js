import compose from 'recompose/compose';
import withState from 'recompose/withState';
import setDisplayName from 'recompose/setDisplayName';
import lifecycle from 'recompose/lifecycle';
import flattenProp from 'recompose/flattenProp';

const componentWillUpdate = ({ state }) => {
  state.count += 1; // eslint-disable-line no-param-reassign
};

export default Component => compose(
  setDisplayName(Component.name),
  withState('state', 'setState', () => ({ count: 1 })),
  lifecycle({ componentWillUpdate }),
  flattenProp('state'),
)(Component);
