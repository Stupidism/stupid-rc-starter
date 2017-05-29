import setStatic from 'recompose/setStatic';

export default defaultProps => (Component) => {
  if (!defaultProps) return Component;

  return setStatic('defaultProps', {
    ...Component.defaultProps,
    ...defaultProps,
  })(Component);
};
