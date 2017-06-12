/* eslint-env jest */
import React from 'react';
import T from 'prop-types';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import enzymeToJson from 'enzyme-to-json';

import withRenderCount from '../withRenderCount';

describe('withRenderCount(BaseComponent): NewComponent', () => {
  describe('modifies props', () => {
    let BaseComponent;
    let NewComponent;

    beforeEach(() => {
      BaseComponent = props => <div data-props={props} />;

      NewComponent = withRenderCount(BaseComponent);
    });

    it('should transfer initialCount as initial value of prop count', () => {
      const instance = renderer.create(<NewComponent initialCount={2} />);
      expect(instance).toMatchSnapshot();
    });

    it('should +1 count prop after component update', () => {
      const wrapper = mount(<NewComponent />);
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
      wrapper.update();
      expect(enzymeToJson(wrapper)).toMatchSnapshot();
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
    expect({ ...NewComponent }).toMatchSnapshot();
  });
});
