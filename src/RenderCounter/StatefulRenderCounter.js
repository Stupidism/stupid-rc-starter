import React from 'react';
import T from 'prop-types';

import { createEmbeddedFunction } from '../hocs/embedHandler';
import Counter from './Counter';

// Example From http://airbnb.io/enzyme/docs/api/ShallowWrapper/update.html
class RenderCounter extends React.Component {
  constructor(props) {
    super(props);
    this.count = props.initialCount;
  }

  componentWillReceiveProps(props) {
    let onRerender = count => this.onRerender(count);
    if (props.onRerender) {
      onRerender = createEmbeddedFunction(onRerender, props.onRerender, props);
    }
    onRerender(this.count + 1);
  }

  onRerender(count) {
    this.count = count;
  }

  render() {
    return <Counter count={this.count} />;
  }
}

RenderCounter.propTypes = {
  /**
   * Initial count for RenderCounter.
   */
  initialCount: T.number,
  /**
   * (props[, next]) => (...args) => {...}
   * get full props of inner onRerender can get \n
   * if next is specified, inner onRerender will not be called until next is called
   */
  onRerender: T.func,
};

RenderCounter.defaultProps = {
  initialCount: 1,
  onRerender: undefined,
};

export default RenderCounter;
