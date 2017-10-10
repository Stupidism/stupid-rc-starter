import _ from 'lodash';
import { compose, withReducer, withHandlers, flattenProp } from 'recompose';

import omitProps from './omitProps';

export const MERGE_STATE = 'MERGE_STATE';
export const RESET_STATE = 'RESET_STATE';

export const reducer = (state, { type, payload } = {}) => {
  switch (type) {
    case MERGE_STATE: {
      return { ...state, ...payload };
    }
    case RESET_STATE: {
      return { ...payload };
    }
    default:
  }
  return state;
};

export const createHandlers = (stateKeys, dispatchName) => {
  const handlers = {};
  stateKeys.forEach((stateKey) => {
    const handler = ({ [dispatchName]: setState }) => value => setState({
      type: MERGE_STATE,
      payload: { [stateKey]: value },
    });
    handlers[`set${_.capitalize(stateKey)}`] = handler;
  });
  return handlers;
};

export const createResetState = (initialState, dispatchName) =>
  ({ [dispatchName]: dispatch, ...props }) => (newState = initialState) => dispatch({
    type: RESET_STATE,
    payload: (typeof newState === 'function' ? newState(props) : newState),
  });

export const createSetState = dispatchName =>
  ({ [dispatchName]: dispatch }) => newState => dispatch({
    type: MERGE_STATE,
    payload: newState,
  });

export const createWithStatesHocs = (initialState, {
  stateKeys,
  names: {
    state: stateName,
    dispatch: dispatchName,
    merge: mergeName,
    reset: resetName,
  },
  omit,
}) => {
  const handlers = createHandlers(stateKeys, dispatchName);
  handlers[resetName] = createResetState(initialState, dispatchName);
  handlers[mergeName] = createSetState(dispatchName);

  const hocs = [
    withReducer(stateName, dispatchName, reducer, initialState),
    withHandlers(handlers),
    flattenProp(stateName),
  ];

  const propsToOmit = _.keys(_.pickBy(omit, _.truthy));
  if (propsToOmit.length) {
    hocs.push(omitProps(propsToOmit));
  }

  return hocs;
};

export const createGetInitialState = (initialKeysOrState) => {
  const type = typeof initialKeysOrState;
  if (type !== 'object' && type !== 'function') {
    throw new Error('initialKeysOrState must be an object or a function');
  }

  if (Array.isArray(initialKeysOrState)) {
    return {};
  }
  return initialKeysOrState;
};

const defaultOptions = {
  names: {
    state: 'state',
    dispatch: 'dispatchState',
    reset: 'resetState',
    merge: 'setState',
  },
  omit: {
    dispatch: true,
    state: true,
    reset: false,
    merge: false,
  },
};

export const createOptions = (initialState, options = {}) => {
  let { stateKeys } = options;

  if (!stateKeys) {
    if (typeof initialState === 'function') {
      throw new Error('options.stateKeys must be specified when initialState is a function');
    }
    stateKeys = Array.isArray(initialState) ? initialState : Object.keys(initialState);
  }

  const mergedOptions = _.merge({}, defaultOptions, options);

  const omit = _.mapKeys(mergedOptions.omit, (value, key) => mergedOptions.names[key]);

  return {
    ...mergedOptions,
    stateKeys,
    omit,
  };
};


/*
 * Compatible for different params
 * withStates(
 *   initialKeys: Array<string> |
 *   initialState: {
 *     [stateKey: string]: initialValue: Any
 *   } |
 *   getInitialState: (props) => {
 *     [stateKey: string]: initialValue: Any
 *   },
 *   options: {
 *     stateName: string,
 *     dispatchName: string,
 *     stateKeys: Array<string>,
 *   },
 * )
 *
 * TODO: withStates(
 *   initialState: {
 *     [stateKey: string]: getInitialValue: Function
 *   },
 *   options: Object
 * )
 */
export default (
  initialKeysOrState,
  options,
) => {
  const finalOptions = createOptions(initialKeysOrState, options);

  const initialState = createGetInitialState(initialKeysOrState, finalOptions);

  const hocs = createWithStatesHocs(initialState, finalOptions);

  return compose(...hocs);
};
