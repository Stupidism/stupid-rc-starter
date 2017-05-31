import omit from 'lodash.omit';
import compose from 'recompose/compose';
import setStatic from 'recompose/setStatic';

export default paths => Component => compose(
  setStatic('propTypes', omit(Component.propTypes, paths)),
  setStatic('defaultProps', omit(Component.defaultProps, paths)),
)(Component);
