/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import ShallowTestRenderer from 'react-test-renderer/shallow';

import Counter from '../Counter';

const shallowRenderer = new ShallowTestRenderer();

describe('Counter({ count }): component', () => {
  it('deeply renders prop count=0', () => {
    const element = renderer.create(<Counter count={0} />);
    expect(element).toMatchSnapshot();
  });

  it('shallowly renders a long prop count', () => {
    const instance = shallowRenderer.render(<Counter count={30002} />);
    expect(instance).toMatchSnapshot();
  });
});

