import React from 'react';

import styles from './styles';

class RenderCounter extends React.Component {
  constructor(props) {
    super(props);
    this.count = 0;
  }
  render() {
    // eslint-disable-next-line no-plusplus
    return <div style={styles.counter}>{++this.count}</div>;
  }
}

export default RenderCounter;
