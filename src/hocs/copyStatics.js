import { compose, setStatic, getDisplayName } from 'recompose';

export default SrcComponent => compose(
  setStatic('displayName', getDisplayName(SrcComponent)),
  setStatic('propTypes', SrcComponent.propTypes),
  setStatic('defaultProps', SrcComponent.defaultProps),
);
