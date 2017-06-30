/* eslint-env jest */
import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import embedHandler, { createEmbeddedFunction } from '../embedHandler';
import withPropsPeeker from '../withPropsPeeker';

describe('createEmbeddedFunction(innerFunc, outerFunc) => (...innerArgs) => {...}', () => {
  const innerResult = _.stubObject();
  const outerResult = _.stubObject();
  const innerHandler = jest.fn(() => innerResult);
  const outerHandler = jest.fn(() => outerResult);
  let result;

  beforeEach(() => {
    innerHandler.mockClear();
    outerHandler.mockClear();
    result = null;
  });

  afterEach(() => {
    expect(result).toBe(outerResult);
  });

  describe('with innerFunc uncontrolled', () => {
    const args = _.times(2, _.stubObject);
    afterEach(() => {
      expect(innerHandler).toHaveBeenCalledTimes(1);
      expect(outerHandler).toHaveBeenCalledTimes(1);
    });
    test('outerFunc.length <= innerFunc.length ~= innerArgs.length', () => {
      const innerFunc = (foo, bar) => innerHandler(foo, bar);
      const outerFunc = (foo, bar) => outerHandler(foo, bar);

      const embeddedFunc = createEmbeddedFunction(innerFunc, outerFunc);
      result = embeddedFunc(...args);
      expect(innerHandler).toHaveBeenCalledWith(...args);
      expect(outerHandler).toHaveBeenCalledWith(...args);
    });

    test('innerArgs.length < outerFunc.length <= innerFunc.length', () => {
      const innerFunc = (foo, bar, baz) => innerHandler(foo, bar, baz);
      const outerFunc = (foo, bar, baz) => outerHandler(foo, bar, baz);

      const embeddedFunc = createEmbeddedFunction(innerFunc, outerFunc);
      result = embeddedFunc(...args);
      expect(innerHandler).toHaveBeenCalledWith(...args, undefined);
      expect(outerHandler).toHaveBeenCalledWith(...args, undefined);
    });

    test('innerFunc.length < outerFunc.length <= innerArgs.length', () => {
      const innerFunc = (foo, ...rest) => innerHandler(foo, ...rest);
      const outerFunc = (foo, bar) => outerHandler(foo, bar);

      const embeddedFunc = createEmbeddedFunction(innerFunc, outerFunc);
      result = embeddedFunc(...args);
      expect(innerHandler).toHaveBeenCalledWith(...args);
      expect(outerHandler).toHaveBeenCalledWith(...args);
    });
  });

  describe('with innerFunc controlled', () => {
    const innerFunc = (foo, bar, baz) => innerHandler(foo, bar, baz);
    const args = _.times(2, _.stubObject);

    test('innerFunc.length ~= innerArgs.length < outerFunc.length', () => {
      const outerFunc = (foo, bar, baz, next) => {
        expect(foo).toBe(args[0]);
        expect(bar).toBe(args[1]);
        expect(baz).toBe(undefined);

        expect(innerHandler).not.toHaveBeenCalled();
        expect(next()).toBe(innerResult);
        expect(innerHandler).toHaveBeenCalledTimes(1);
        expect(innerHandler).toHaveBeenLastCalledWith(...args, undefined);
        expect(next()).toBe(innerResult);
        expect(innerHandler).toHaveBeenCalledTimes(2);
        expect(innerHandler).toHaveBeenLastCalledWith(...args, undefined);
        return outerHandler();
      };

      const embeddedFunc = createEmbeddedFunction(innerFunc, outerFunc);
      result = embeddedFunc(...args);
    });
  });
});

describe('embedHandler(innerName | innerHandler, outerName)', () => {
  let peekedProps;
  let BaseComponent;
  let innerName;
  let outerName;
  const outerOnClick = jest.fn();
  const innerOnClick = jest.fn();
  const innerHandler = () => (foo, bar) => innerOnClick(foo, bar);
  const argsForOnClick = _.times(2, _.stubObject);
  beforeEach(() => {
    innerName = 'onClick';
    outerName = innerName;
    peekedProps = {};
    BaseComponent = withPropsPeeker(peekedProps)(() => <div />);
    outerOnClick.mockClear();
    innerOnClick.mockClear();
  });

  afterEach(() => {
    expect(peekedProps.onClick).not.toBeUndefined();
  });

  describe('both handlers got called', () => {
    afterEach(() => {
      peekedProps.onClick(...argsForOnClick);
      expect(outerOnClick).toHaveBeenCalledTimes(1);
      expect(outerOnClick).toHaveBeenCalledWith(...argsForOnClick);
      expect(innerOnClick).toHaveBeenCalledTimes(1);
      expect(innerOnClick).toHaveBeenCalledWith(...argsForOnClick);
    });

    test('embedHandler(innerHandler, outerName)(Component)({ outerHandler })', () => {
      const NewComponent = embedHandler(innerHandler, outerName)(BaseComponent);
      shallow(<NewComponent onClick={outerOnClick} />);
    });

    test('embedHandler(innerName, outerName)(Component)({ outerHandler, innerHandler })', () => {
      outerName = 'outerOnClick';
      const NewComponent = embedHandler(innerName, outerName)(BaseComponent);
      shallow(<NewComponent onClick={innerOnClick} outerOnClick={outerOnClick} />);
    });

    test('embedHandler(innerHandler, outerName)(Component)({ outerHandler(props, next) })', () => {
      const outerHandler = (foo, bar, next) => {
        outerOnClick(foo, bar);
        next();
      };
      const NewComponent = embedHandler(innerHandler, outerName)(BaseComponent);
      shallow(<NewComponent onClick={outerHandler} />);
    });
  });

  describe('only innerHandler got called', () => {
    test('embedHandler(innerHandler, outerName)(Component)({ outerHandler: undefined })', () => {
      const NewComponent = embedHandler(innerHandler, innerName)(BaseComponent);
      shallow(<NewComponent />);
      peekedProps.onClick(...argsForOnClick);
      expect(outerOnClick).toHaveBeenCalledTimes(0);
      expect(innerOnClick).toHaveBeenCalledTimes(1);
      expect(innerOnClick).toHaveBeenCalledWith(...argsForOnClick);
    });
  });

  describe('only outerHandler got called', () => {
    test('embedHandler(innerHandler, outerName)(Component)({ outerHandler(props, next) })', () => {
      const outerHandler = (foo, bar, next) => outerOnClick(foo, bar, next);
      const NewComponent = embedHandler(innerHandler, outerName)(BaseComponent);
      shallow(<NewComponent onClick={outerHandler} />);
      peekedProps.onClick(...argsForOnClick);
      expect(outerOnClick).toHaveBeenCalledTimes(1);
      expect(outerOnClick).toHaveBeenCalledWith(...argsForOnClick, expect.any(Function));
      expect(innerOnClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('error happens', () => {
    test('embedHandler(innerHandler:undefined, outerName)', () => {
      innerName = undefined;
      const NewComponent = embedHandler(innerName, outerName)(BaseComponent);
      shallow(<NewComponent />);
      expect(peekedProps.onClick).toThrow('innerName must be a handler or the name of it');
    });

    test('embedHandler(innerName, outerName)(Component)({ outerHandler, innerHandler:undefined })', () => {
      outerName = 'outerOnClick';
      const NewComponent = embedHandler(innerName, outerName)(BaseComponent);
      shallow(<NewComponent />);
      expect(peekedProps.onClick).toThrow('innerName must be a handler or the name of it');
    });
  });
});
