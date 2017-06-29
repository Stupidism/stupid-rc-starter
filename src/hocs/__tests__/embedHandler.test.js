/* eslint-env jest */
import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import embedHandler, { createEmbeddedFunction } from '../embedHandler';
import withPropsPeeker from '../withPropsPeeker';

describe('createEmbeddedFunction(innerFunc, outerFunc) => embeddedFunc', () => {
  const innerResult = _.stubObject();
  const outerResult = _.stubObject();
  const args = _.times(2, _.stubObject);
  const innerHandler = jest.fn(() => innerResult);
  const outerHandler = jest.fn(() => outerResult);
  const innerFunc = (foo, bar) => innerHandler(foo, bar);
  let result;

  beforeEach(() => {
    innerHandler.mockClear();
    outerHandler.mockClear();
    result = null;
  });

  afterEach(() => {
    expect(result).toBe(outerResult);
  });

  test('with innerFunc uncontrolled', () => {
    const outerFunc = (foo, bar) => outerHandler(foo, bar);
    const embeddedFunc = createEmbeddedFunction(innerFunc, outerFunc);
    result = embeddedFunc(...args);

    expect(innerHandler).toHaveBeenCalledTimes(1);
    expect(innerHandler).toHaveBeenCalledWith(...args);
    expect(outerHandler).toHaveBeenCalledTimes(1);
    expect(outerHandler).toHaveBeenCalledWith(...args);
  });

  test('with innerFunc controlled not to be called', () => {
    const outerFunc = (foo, bar, next) => outerHandler(foo, bar, next);
    const embeddedFunc = createEmbeddedFunction(innerFunc, outerFunc);
    result = embeddedFunc(...args);

    expect(innerHandler).not.toHaveBeenCalled();
    expect(outerHandler).toHaveBeenCalledTimes(1);
    expect(outerHandler).toHaveBeenCalledWith(...args, expect.any(Function));
  });

  test('with innerFunc controlled to be called', () => {
    const outerFunc = (foo, bar, next) => outerHandler(foo, bar, next(), next());
    const embeddedFunc = createEmbeddedFunction(innerFunc, outerFunc);
    result = embeddedFunc(...args);

    expect(innerHandler).toHaveBeenCalledTimes(2);
    expect(innerHandler).toHaveBeenCalledWith(...args);
    expect(outerHandler).toHaveBeenCalledTimes(1);
    expect(outerHandler).toHaveBeenCalledWith(...args, innerResult, innerResult);
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
