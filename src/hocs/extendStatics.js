import compose from 'recompose/compose';

import extendDisplayName from './extendDisplayName';
import extendPropTypes from './extendPropTypes';
import extendDefaultProps from './extendDefaultProps';

export default (overrides) => {
  const { displayName, propTypes, defaultProps } = overrides || { displayName: 'extend' };

  return compose(
    extendDisplayName(displayName),
    extendPropTypes(propTypes),
    extendDefaultProps(defaultProps),
  );
};
