/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
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
      let getProps;

      beforeEach(() => {
        const BaseComponent = jest.fn(() => null);
        const NewComponent = withStates(initialState, { omit: showAll })(BaseComponent);
        mount(<NewComponent />);
        getProps = () => BaseComponent.mock.calls[BaseComponent.mock.calls.length - 1][0];
      });

      test('dispatchState(action: { type, payload })', () => {
        expect(getProps().dispatchState).not.toBeUndefined();

        let [curState, lastState] = [getProps().state, undefined];
        expect(curState).toBe(initialState);
        expect(curState).not.toBe(lastState);

        getProps().dispatchState({
          type: MERGE_STATE,
          payload: newState,
        });
        [curState, lastState] = [getProps().state, curState];
        expect(curState).not.toBe(initialState);
        expect(curState).not.toBe(lastState);
        expect(curState).toEqual({
          foo: 3,
          bar: 2,
        });

        getProps().dispatchState(undefined);
        [curState, lastState] = [getProps().state, curState];
        expect(curState).toBe(lastState);

        getProps().dispatchState({
          type: RESET_STATE,
          payload: newState,
        });
        [curState, lastState] = [getProps().state, curState];
        expect(curState).not.toBe(lastState);
        expect(curState).toEqual(newState);
      });

      test('resetState(newState)', () => {
        expect(getProps().resetState).not.toBeUndefined();

        expect(getProps().state).toEqual(initialState);
        getProps().resetState(newState);
        expect(getProps().state).toEqual(newState);
        getProps().resetState();
        expect(getProps().state).toEqual(initialState);
        getProps().resetState(() => newState);
        expect(getProps().state).toEqual(newState);
      });

      test('setState(newState)', () => {
        expect(getProps().setState).not.toBeUndefined();

        expect(getProps().state).toEqual(initialState);
        getProps().setState(newState);
        expect(getProps().state).toEqual({ foo: 3, bar: 2 });
      });

      test('[setStateKey](newStateValue)', () => {
        expect(getProps().setFoo).not.toBeUndefined();

        expect(getProps().foo).toBe(1);
        getProps().setFoo(newState.foo);
        expect(getProps().foo).toBe(newState.foo);
      });
    });
  });
});
