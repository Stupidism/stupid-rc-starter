import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';
import setDisplayName from 'recompose/setDisplayName';
import flattenProp from 'recompose/flattenProp';

import Counter from './Counter';

const componentWillUpdate = ({ state }) => {
  state.count += 1; // eslint-disable-line no-param-reassign
};

export default compose(
  setDisplayName('RenderCounter'),
  withState('state', 'setState', () => ({ count: 1 })),
  lifecycle({ componentWillUpdate }),
  flattenProp('state'),
)(Counter);
