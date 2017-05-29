import withRenderCount from './withRenderCount';
import Counter from './Counter';

// Try to make react-docgen works on prop description
Counter.propTypes = {
  ...Counter.propTypes,
  /**
   * Initial count for RenderCounter.
   */
  count: Counter.propTypes.count,
};

export default withRenderCount(Counter);
