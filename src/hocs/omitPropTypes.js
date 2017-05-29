import omit from 'lodash.omit';
import setPropTypes from 'recompose/setPropTypes';

export default paths =>
  Component => setPropTypes(omit(Component.propTypes, paths))(Component);
