/* eslint-env jest */
import React from 'react';
import T from 'prop-types';
import { mount } from 'enzyme';

import withRenderCount from '../withRenderCount';
import snapshotHocProps from '../../utils/testHelpers/snapshotHocProps';

describe('withRenderCount(BaseComponent): NewComponent', () => {
  describe('modifies props', () => {
    it('should transfer initialCount as initial value of prop count', () => {
      snapshotHocProps(withRenderCount, { initialCount: 2 });
    });

    it('should +1 count prop after component update', () => {
      const BaseComponent = props => <div>{props.count}</div>;
      BaseComponent.propTypes = {
        count: T.number.isRequired,
      };
      const NewComponent = withRenderCount(BaseComponent);
      const wrapper = mount(<NewComponent />);
      expect(wrapper.text()).toBe('1');
      wrapper.update();
      expect(wrapper.text()).toBe('2');
    });
  });

  test('NewComponent has the extended statics of BaseComponent', () => {
    const BaseComponent = () => <div />;
    BaseComponent.propTypes = {
      count: T.number,
      foo: T.string.isRequired,
    };
    BaseComponent.defaultProps = { count: 1 };

    const NewComponent = withRenderCount(BaseComponent);

    expect(NewComponent).not.toBe(BaseComponent);
    expect({ ...NewComponent }).toMatchSnapshot();
  });
});
