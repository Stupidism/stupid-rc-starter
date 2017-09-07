/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import withThis from '../withThis';

describe('withThis([initialThis, thisName])', () => {
  let BaseComponent;
  beforeEach(() => {
    BaseComponent = jest.fn(() => null);
  });
  it('adds a self prop for the base component', () => {
    const NewComponent = withThis()(BaseComponent);
    mount(<NewComponent />);
    const props = BaseComponent.mock.calls[0][0];
    expect(props).toEqual({ self: {} });
  });

  describe('initialThis', () => {
    const initialThis = {};
    afterEach(() => {
      const props = BaseComponent.mock.calls[0][0];
      expect(props).toEqual({ self: initialThis });
    });

    it('should be cloned as a new object', () => {
      const NewComponent = withThis(initialThis)(BaseComponent);
      mount(<NewComponent />);
      const props = BaseComponent.mock.calls[0][0];
      expect(props.self).not.toBe(initialThis);
    });

    it('should be called to generate a initialThis', () => {
      const NewComponent = withThis(() => initialThis)(BaseComponent);
      mount(<NewComponent />);
      const props = BaseComponent.mock.calls[0][0];
      expect(props.self).toBe(initialThis);
    });
  });

  test('thisName can be customized', () => {
    const NewComponent = withThis({}, '_this')(BaseComponent);
    mount(<NewComponent />);
    const props = BaseComponent.mock.calls[0][0];
    expect(props).toEqual({ _this: {} });
  });
});

