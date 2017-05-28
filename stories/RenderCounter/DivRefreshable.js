import React from 'react';
import T from 'prop-types';
import { compose, withState } from 'recompose';

import withNestHandlers from './withNestHandlers';

const DivRefreshable = ({ label, onRefresh, children, cloneChild }) => (
  <div style={{ padding: 10, border: '1px solid black' }}>
    <button onClick={() => onRefresh()}>{label}</button>
    {children && (cloneChild ? React.cloneElement(children) : children)}
  </div>
);

const displayName = 'DivRefreshable';

const propTypes = {
  children: T.element,
  cloneChild: T.bool,
  label: T.string,
  onRefresh: T.func.isRequired,
};

const defaultProps = {
  children: undefined,
  cloneChild: false,
  label: 'Refresh',
};

DivRefreshable.displayName = displayName;
DivRefreshable.propTypes = propTypes;
DivRefreshable.defaultProps = defaultProps;

const hoc = compose(
  withState('state', '_onRefresh'),
  withNestHandlers({ onRefresh: '_onRefresh' }),
);

export default Object.assign(hoc((DivRefreshable)), DivRefreshable, {
  propTypes: {
    ...propTypes,
    onRefresh: T.func,
  },
});
