import compose from 'recompose/compose';
import setStatic from 'recompose/setStatic';
import getDisplayName from 'recompose/getDisplayName';

export default SrcComponent => compose(
  setStatic('displayName', getDisplayName(SrcComponent)),
  setStatic('propTypes', SrcComponent.propTypes),
  setStatic('defaultProps', SrcComponent.defaultProps),
);
