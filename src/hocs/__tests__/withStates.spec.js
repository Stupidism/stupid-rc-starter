/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import withPropsPeeker from '../withPropsPeeker';
import snapshotHocProps from '../../utils/testHelpers/snapshotHocProps';
import withStates, { MERGE_STATE, RESET_STATE } from '../withStates';

describe('withStates(initialKeysOrState, options): PropsMapperHoc', () => {
  const initialState = {
    foo: 1,
    bar: 2,
  };
  const stateKeys = Object.keys(initialState);

  describe('when initialKeysOrState is an object as initialState', () => {
    test('with default options', () => {
      snapshotHocProps(withStates(initialState));
    });

    test('with options.stateKeys', () => {
      snapshotHocProps(withStates(initialState, {
        stateKeys: ['foo', 'bar', 'baz'],
      }));
      snapshotHocProps(withStates(initialState, {
        stateKeys: ['foo'],
      }));
    });
  });

  describe('when initialKeysOrState is an array of keys of initialState', () => {
    test('with default options', () => {
      snapshotHocProps(withStates(stateKeys));
    });
  });

  describe('when initialKeysOrState is a function to create initialState', () => {
    const createInitialState = () => initialState;
    test('with default options', () => {
      const stateKeysRequired = 'options.stateKeys must be specified when initialState is a function';
      expect(() => withStates(createInitialState)).toThrow(stateKeysRequired);
    });

    test('with options.stateKeys', () => {
      snapshotHocProps(withStates(createInitialState, { stateKeys }));
    });
  });

  describe('when initialKeysOrState is invalid', () => {
    const typeCheck = 'initialKeysOrState must be an object or a function';
    test(typeCheck, () => {
      expect(() => withStates(2)).toThrow(typeCheck);
    });
  });

  describe('output props have some meta handlers', () => {
    test('with options.omit to hide them', () => {
      const hideAll = { dispatch: true, merge: true, state: true, reset: true };
      snapshotHocProps(withStates(initialState, { omit: hideAll }));
    });

    const showAll = { dispatch: false, merge: false, state: false, reset: false };
    test('with options.omit to show them', () => {
      snapshotHocProps(withStates(initialState, { omit: showAll }));
    });

    test('with options.names to rename them', () => {
      const names = {
        dispatch: 'dispatch',
        merge: 'merge',
        state: 'finalState',
        reset: 'reset',
      };
      snapshotHocProps(withStates(initialState, { names, omit: showAll }));
    });

    describe('meta handlers can change states', () => {
      const newState = { foo: 3 };
      let props;

      beforeEach(() => {
        props = {};
        const BaseComponent = withPropsPeeker(props)(() => <div />);
        const NewComponent = withStates(initialState, { omit: showAll })(BaseComponent);
        mount(<NewComponent />);
      });

      test('dispatchState(action: { type, payload })', () => {
        expect(props.dispatchState).not.toBeUndefined();

        let [curState, lastState] = [props.state, undefined];
        expect(curState).toBe(initialState);
        expect(curState).not.toBe(lastState);

        props.dispatchState({
          type: MERGE_STATE,
          payload: newState,
        });
        [curState, lastState] = [props.state, curState];
        expect(curState).not.toBe(initialState);
        expect(curState).not.toBe(lastState);
        expect(curState).toEqual({
          foo: 3,
          bar: 2,
        });

        props.dispatchState(undefined);
        [curState, lastState] = [props.state, curState];
        expect(curState).toBe(lastState);

        props.dispatchState({
          type: RESET_STATE,
          payload: newState,
        });
        [curState, lastState] = [props.state, curState];
        expect(curState).not.toBe(lastState);
        expect(curState).toEqual(newState);
      });

      test('resetState(newState)', () => {
        expect(props.resetState).not.toBeUndefined();

        expect(props.state).toEqual(initialState);
        props.resetState(newState);
        expect(props.state).toEqual(newState);
        props.resetState();
        expect(props.state).toEqual(initialState);
        props.resetState(() => newState);
        expect(props.state).toEqual(newState);
      });

      test('setState(newState)', () => {
        expect(props.setState).not.toBeUndefined();

        expect(props.state).toEqual(initialState);
        props.setState(newState);
        expect(props.state).toEqual({ foo: 3, bar: 2 });
      });

      test('[setStateKey](newStateValue)', () => {
        expect(props.setFoo).not.toBeUndefined();

        expect(props.foo).toBe(1);
        props.setFoo(newState.foo);
        expect(props.foo).toBe(newState.foo);
      });
    });
  });
});
