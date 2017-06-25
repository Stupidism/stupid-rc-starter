import _ from 'lodash';
import compose from 'recompose/compose';
import setStatic from 'recompose/setStatic';

export default paths => Component => compose(
  setStatic('propTypes', _.omit(Component.propTypes, paths)),
  setStatic('defaultProps', _.omit(Component.defaultProps, paths)),
)(Component);
