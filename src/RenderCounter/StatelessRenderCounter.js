import React from 'react';
import T from 'prop-types';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';
import setDisplayName from 'recompose/setDisplayName';
import flattenProp from 'recompose/flattenProp';

import styles from './styles';

const RenderCounter = ({ count }) => (
  <div style={styles.counter}>{count}</div>
);

RenderCounter.propTypes = {
  count: T.number.isRequired,
};

const componentWillUpdate = ({ state }) => {
  state.count += 1; // eslint-disable-line no-param-reassign
};

export default compose(
  setDisplayName(RenderCounter.name),
  withState('state', 'setState', () => ({ count: 1 })),
  lifecycle({ componentWillUpdate }),
  flattenProp('state'),
)(RenderCounter);
