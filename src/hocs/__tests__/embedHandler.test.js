/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import embedHandler from '../embedHandler';
import withPropsPeeker from '../withPropsPeeker';

describe('embedHandler(innerName | innerHandler, outerName)', () => {
  let peekedProps;
  let BaseComponent;
  let onClick;
  let innerOnClick;
  const outerName = 'onClick';
  let outerHandler = props => onClick; // eslint-disable-line no-unused-vars
  const innerHandler = props => innerOnClick; // eslint-disable-line no-unused-vars
  const argsForOnClick = [1, 2];
  beforeEach(() => {
    peekedProps = {};
    BaseComponent = withPropsPeeker(peekedProps)(() => <div />);
    onClick = jest.fn();
    innerOnClick = jest.fn();
  });

  afterEach(() => {
    expect(peekedProps.onClick).not.toBeUndefined();
  });

  describe('both handlers got called', () => {
    afterEach(() => {
      peekedProps.onClick(...argsForOnClick);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(...argsForOnClick);
      expect(innerOnClick).toHaveBeenCalledTimes(1);
      expect(innerOnClick).toHaveBeenCalledWith(...argsForOnClick);
    });

    test('embedHandler(innerHandler, outerName)(Component)({ outerHandler })', () => {
      const NewComponent = embedHandler(innerHandler, outerName)(BaseComponent);
      shallow(<NewComponent onClick={outerHandler} />);
    });

    test('embedHandler(innerName, outerName)(Component)({ outerHandler, innerHandler })', () => {
      const NewComponent = embedHandler('innerOnClick', outerName)(BaseComponent);
      shallow(<NewComponent innerOnClick={innerOnClick} onClick={outerHandler} />);
    });

    test('embedHandler(innerHandler, outerName)(Component)({ outerHandler(props, next) })', () => {
      outerHandler = (props, next) => (...args) => {
        onClick(...args);
        next(...args);
      };
      const NewComponent = embedHandler(innerHandler, 'onClick')(BaseComponent);
      shallow(<NewComponent onClick={outerHandler} />);
    });
  });

  describe('only innerHandler got called', () => {
    test('embedHandler(innerHandler, outerName)(Component)({ outerHandler: undefined })', () => {
      const NewComponent = embedHandler(innerHandler, outerName)(BaseComponent);
      shallow(<NewComponent />);
      peekedProps.onClick(...argsForOnClick);
      expect(onClick).toHaveBeenCalledTimes(0);
      expect(innerOnClick).toHaveBeenCalledTimes(1);
      expect(innerOnClick).toHaveBeenCalledWith(...argsForOnClick);
    });
  });

  describe('only outerHandler got called', () => {
    test('embedHandler(innerHandler, outerName)(Component)({ outerHandler(props, next) })', () => {
      outerHandler = (props, next) => onClick; // eslint-disable-line no-unused-vars
      const NewComponent = embedHandler(innerHandler, 'onClick')(BaseComponent);
      shallow(<NewComponent onClick={outerHandler} />);
      peekedProps.onClick(...argsForOnClick);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(...argsForOnClick);
      expect(innerOnClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('error happens', () => {
    test('embedHandler(innerHandler:undefined, outerName)', () => {
      const NewComponent = embedHandler(undefined, outerName)(BaseComponent);
      shallow(<NewComponent />);
      expect(peekedProps.onClick).toThrow('innerName must be a handler or the name of it');
    });

    test('embedHandler(innerName, outerName)(Component)({ outerHandler, innerHandler:undefined })', () => {
      const NewComponent = embedHandler('innerOnClick', outerName)(BaseComponent);
      shallow(<NewComponent />);
      expect(peekedProps.onClick).toThrow('innerName must be a handler or the name of it');
    });
  });
});
