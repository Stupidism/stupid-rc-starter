import T from 'prop-types';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import flattenProp from 'recompose/flattenProp';

import withThis from '../hocs/withThis';
import copyStatics from '../hocs/copyStatics';
import extendStatics from '../hocs/extendStatics';
import omitPropTypes from '../hocs/omitPropTypes';
import omitProps from '../hocs/omitProps';
import embedHandlers from '../hocs/embedHandlers';

const componentWillUpdate = ({ self, onRerender }) => onRerender(self.count + 1);

const getInitialSelf = ({ initialCount }) => ({ count: initialCount });

const onRerender = ({ self }) => (count) => {
  self.count = count;// eslint-disable-line no-param-reassign
};

export const propTypes = {
  initialCount: T.number,
  onRerender: T.func,
};

const getOverridedDefaultProps = ({ count } = {}) => ({
  initialCount: typeof count === 'undefined' ? 1 : count,
});

export default Component => compose(
  omitPropTypes('count'),
  extendStatics({
    displayName: 'withRenderCount',
    propTypes,
    defaultProps: getOverridedDefaultProps(Component.defaultProps),
  }),
  copyStatics(Component),
  withThis(getInitialSelf),
  embedHandlers({ onRerender }),
  lifecycle({ componentWillUpdate }),
  flattenProp('self'),
  omitProps(['self', 'onRerender', 'initialCount']),
)(Component);
