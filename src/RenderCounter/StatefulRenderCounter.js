import React from 'react';

import Counter from './Counter';

// Example From http://airbnb.io/enzyme/docs/api/ShallowWrapper/update.html
class RenderCounter extends React.Component {
  constructor(props) {
    super(props);
    this.count = 1;
  }

  componentWillReceiveProps() {
    this.count += 1;
  }

  render() {
    return <Counter count={this.count} />;
  }
}

export default RenderCounter;
