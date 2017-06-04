import T from 'prop-types';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import flattenProp from 'recompose/flattenProp';
import withHandlers from 'recompose/withHandlers';

import withThis from '../hocs/withThis';
import copyStatics from '../hocs/copyStatics';
import extendStatics from '../hocs/extendStatics';
import omitPropTypes from '../hocs/omitPropTypes';
import omitProps from '../hocs/omitProps';

const componentWillUpdate = ({ onRerender }) => onRerender();

const getInitialSelf = ({ initialCount }) => ({ count: initialCount });

const onRerender = ({ self }) => () => {
  self.count += 1;// eslint-disable-line no-param-reassign
};

export default Component => compose(
  omitPropTypes('count'),
  extendStatics({
    displayName: 'withRenderCount',
    propTypes: { initialCount: T.number },
    defaultProps: { initialCount: 1 },
  }),
  copyStatics(Component),
  withThis(getInitialSelf),
  withHandlers({ onRerender }),
  lifecycle({ componentWillUpdate }),
  flattenProp('self'),
  omitProps(['self', 'onRerender', 'initialCount']),
)(Component);
