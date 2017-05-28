import React from 'react';
import T from 'prop-types';

import Counter from './Counter';

// Example From http://airbnb.io/enzyme/docs/api/ShallowWrapper/update.html
class RenderCounter extends React.Component {
  constructor(props) {
    super(props);
    this.count = props.initialCount;
  }

  componentWillReceiveProps() {
    this.count += 1;
  }

  render() {
    return <Counter count={this.count} />;
  }
}

RenderCounter.propTypes = {
  initialCount: T.number,
};

RenderCounter.defaultProps = {
  initialCount: 1,
};

export default RenderCounter;
