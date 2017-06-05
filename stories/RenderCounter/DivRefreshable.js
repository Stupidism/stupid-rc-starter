import React from 'react';
import T from 'prop-types';
import _ from 'lodash';
import { compose, withState } from 'recompose';

import copyStatics from '../../src/hocs/copyStatics';
import extendPropTypes from '../../src/hocs/extendPropTypes';
import embedHandlers from '../../src/hocs/embedHandlers';

const DivRefreshable = ({ label, onRefresh, children, cloneChild, ...rest }) => (
  <div {..._.pick(rest, ['style'])}>
    <button onClick={onRefresh}>{label}</button>
    {children && (cloneChild ? React.cloneElement(children) : children)}
  </div>
);

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

DivRefreshable.propTypes = propTypes;
DivRefreshable.defaultProps = defaultProps;

const onRefresh = ({ setState }) => (/* event */) => setState();

const hoc = Component => compose(
  extendPropTypes({ onRefresh: T.func }),
  copyStatics(Component),
  withState('state', 'setState'),
  embedHandlers({ onRefresh }),
)(Component);

export default hoc(DivRefreshable);
