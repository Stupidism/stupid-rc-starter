import setPropTypes from 'recompose/setPropTypes';

export default propTypes => (Component) => {
  if (!propTypes) return Component;

  return setPropTypes({
    ...Component.propTypes,
    ...propTypes,
  })(Component);
};
