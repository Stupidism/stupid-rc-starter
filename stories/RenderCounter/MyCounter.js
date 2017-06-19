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

const MyCounter = ({ count, style }) => (
  <div style={{ ...styles.counter, style }}>{count}</div>
);

MyCounter.propTypes = {
  /**
   * Value for Counter to render.
   */
  count: T.number,
  /**
   * Override stylesheets.
   */
  style: T.objectOf(T.node),
};

MyCounter.defaultProps = {
  count: 0,
  style: undefined,
};

export default MyCounter;
