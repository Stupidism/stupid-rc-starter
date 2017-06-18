import React from 'react';
import T from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';

import copyStatics from '../../src/hocs/copyStatics';
import omitPropTypes from '../../src/hocs/omitPropTypes';

const DivRefreshable = ({ label, onRefresh, children }) => (
  <div>
    <button onClick={onRefresh}>{label}</button>
    {children && React.cloneElement(children)}
  </div>
);

const propTypes = {
  children: T.element,
  label: T.string,
  onRefresh: T.func.isRequired,
};

const defaultProps = {
  children: undefined,
  label: 'Refresh',
};

DivRefreshable.propTypes = propTypes;
DivRefreshable.defaultProps = defaultProps;

const onRefresh = ({ setState }) => (/* event */) => setState();

const hoc = Component => compose(
  omitPropTypes('onRefresh'),
  copyStatics(Component),
  withState('state', 'setState'),
  withHandlers({ onRefresh }),
)(Component);

export default hoc(DivRefreshable);
