import React from 'react';
import T from 'prop-types';
import { compose, withState, withHandlers, defaultProps } from 'recompose';
import WithEvents from '@storybook/addon-events';

import copyStatics from '../../src/hocs/copyStatics';
import omitPropTypes from '../../src/hocs/omitPropTypes';

const WithRefreshEvent = defaultProps({
  events: [{
    key: 'refresh',
    name: 'REFRESH',
    title: 'Refresh',
  }],
})(WithEvents);

const DivRefreshable = ({ label, onRefresh, children }) => (
  <WithRefreshEvent emit={onRefresh}>
    <div>
      {label}
      {children && React.cloneElement(children)}
    </div>
  </WithRefreshEvent>
);

DivRefreshable.propTypes = {
  children: T.element,
  label: T.string,
  onRefresh: T.func.isRequired,
};
DivRefreshable.defaultProps = {
  children: undefined,
  label: 'Refresh',
};

const onRefresh = ({ setState }) => (/* event */) => setState();

const hoc = Component => compose(
  omitPropTypes('onRefresh'),
  copyStatics(Component),
  withState('state', 'setState'),
  withHandlers({ onRefresh }),
)(Component);

export default hoc(DivRefreshable);
