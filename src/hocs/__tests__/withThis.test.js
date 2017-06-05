/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import withThis from '../withThis';
import withPropsPeeker from '../withPropsPeeker';

describe('withThis([initialThis, thisName])', () => {
  let props;
  let BaseComponent;
  beforeEach(() => {
    props = {};
    BaseComponent = withPropsPeeker(props)(() => <div />);
  });
  it('adds a self prop for the base component', () => {
    const NewComponent = withThis()(BaseComponent);
    shallow(<NewComponent />);
    expect(props).toEqual({ self: {} });
  });

  describe('initialThis', () => {
    const initialThis = {};
    afterEach(() => expect(props).toEqual({ self: initialThis }));

    it('should be cloned as a new object', () => {
      const NewComponent = withThis(initialThis)(BaseComponent);
      shallow(<NewComponent />);
      expect(props.self).not.toBe(initialThis);
    });

    it('should be called to generate a initialThis', () => {
      const NewComponent = withThis(() => initialThis)(BaseComponent);
      shallow(<NewComponent />);
      expect(props.self).toBe(initialThis);
    });
  });

  test('thisName can be customized', () => {
    const NewComponent = withThis({}, '_this')(BaseComponent);
    shallow(<NewComponent />);
    expect(props).toEqual({ _this: {} });
  });
});

