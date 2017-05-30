/* eslint-env jest */
import React from 'react';
import T from 'prop-types';
import { mount } from 'enzyme';
import compose from 'recompose/compose';
import { withRenderCount } from '../';
import withPropsPeeker from '../../hocs/withPropsPeeker';

describe('withRenderCount(BaseComponent): NewComponent', () => {
  describe('modifies props', () => {
    let BaseComponent;
    let props;
    let NewComponent;

    beforeEach(() => {
      props = {};
      BaseComponent = () => <div />;

      NewComponent = compose(
        withRenderCount,
        withPropsPeeker(props),
      )(BaseComponent);
    });

    it('should transfer initialCount as initial value of prop count', () => {
      mount(<NewComponent initialCount={2} />);
      expect(props).toEqual({ count: 2 });
    });

    it('should +1 count prop after component update', () => {
      const wrapper = mount(<NewComponent />);

      expect(props).toEqual({ count: 1 });
      wrapper.update();
      expect(props).toEqual({ count: 2 });
    });
  });

  test('NewComponent has the extended statics of BaseComponent', () => {
    const BaseComponent = () => <div />;
    BaseComponent.propTypes = {
      count: T.number,
      foo: T.string,
    };
    BaseComponent.defaultProps = { count: 1 };

    const NewComponent = withRenderCount(BaseComponent);

    expect(NewComponent).not.toBe(BaseComponent);
    expect(NewComponent.displayName).toBe('withRenderCount(BaseComponent)');
    expect(NewComponent.propTypes).toEqual({
      initialCount: T.number,
      foo: T.string,
    });
    expect(NewComponent.defaultProps.initialCount).toBe(1);
  });
});
