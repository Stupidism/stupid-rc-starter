import React from 'react';
import T from 'prop-types';

const styles = {
  counter: {
    display: 'inline-block',
    float: 'right',
    borderRadius: '8px',
    backgroundColor: '#f95',
    fontSize: '8pt',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '1px 5px',
    color: 'white',
    top: '2px',
  },
};

const Counter = ({ count }) => (
  <div style={styles.counter}>{count}</div>
);

Counter.propTypes = {
  /**
   * Value for Counter to render.
   */
  count: T.number.isRequired,
};

export default Counter;
