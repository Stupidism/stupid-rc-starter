import React from 'react';
import T from 'prop-types';

import { createEmbeddedFunction } from '../hocs/embedHandler';
import Counter from './Counter';

// Example From http://airbnb.io/enzyme/docs/api/ShallowWrapper/update.html
class RenderCounter extends React.Component {
  constructor(props) {
    super(props);
    this.count = props.initialCount;
    this.onRerender = this.onRerender.bind(this);
  }

  componentWillReceiveProps(props) {
    const newCount = this.count + 1;
    if (props.onRerender) {
      createEmbeddedFunction(this.onRerender, props.onRerender)(newCount);
    } else {
      this.onRerender(newCount);
    }
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
   * (count[, next]) => {...}
   * if next is specified, inner onRerender will not be called until next is called
   */
  onRerender: T.func,
};

RenderCounter.defaultProps = {
  initialCount: 1,
  onRerender: undefined,
};

export default RenderCounter;
