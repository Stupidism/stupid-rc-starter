import _ from 'lodash';
import { compose, setStatic } from 'recompose';

export default paths => Component => compose(
  setStatic('propTypes', _.omit(Component.propTypes, paths)),
  setStatic('defaultProps', _.omit(Component.defaultProps, paths)),
)(Component);
