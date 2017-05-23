import React from 'react';

import styles from './styles';

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
    return <div style={styles.counter}>{this.count}</div>;
  }
}

export default RenderCounter;
