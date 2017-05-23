import React from 'react';
import T from 'prop-types';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import setDisplayName from 'recompose/setDisplayName';

import styles from './styles';

const RenderCounter = ({ state }) => (
  // eslint-disable-next-line no-plusplus,no-param-reassign
  <div style={styles.counter}>{++state.count}</div>
);

RenderCounter.propTypes = {
  state: T.shape({
    count: T.number.isRequired,
  }).isRequired,
};

export default compose(
  setDisplayName(RenderCounter.name),
  withState('state', 'setState', () => ({ count: 0 })),
)(RenderCounter);
