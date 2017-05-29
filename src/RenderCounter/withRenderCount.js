import T from 'prop-types';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';
import flattenProp from 'recompose/flattenProp';

import copyStatics from '../hocs/copyStatics';
import extendStatics from '../hocs/extendStatics';
import omitPropTypes from '../hocs/omitPropTypes';

const componentWillUpdate = ({ state }) => {
  state.count += 1; // eslint-disable-line no-param-reassign
};

const getInitialState = ({ initialCount }) => ({ count: initialCount });

export default Component => compose(
  omitPropTypes('count'),
  extendStatics({
    displayName: 'withRenderCount',
    propTypes: { initialCount: T.number },
    defaultProps: { initialCount: 1 },
  }),
  copyStatics(Component),
  withState('state', 'setState', getInitialState),
  lifecycle({ componentWillUpdate }),
  flattenProp('state'),
)(Component);
