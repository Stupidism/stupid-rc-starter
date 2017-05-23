import React from 'react';
import { mount } from 'enzyme';
import StatefulRenderCounter from '../../src/RenderCounter/StatefulRenderCounter';
import StatelessRenderCounter from '../../src/RenderCounter/StatelessRenderCounter';

const testWrapper = (RenderCounter, name = 'RenderCounter') => describe(name, () => {
  it('should change the text after update', () => {
    // Render a checkbox with label in the document
    const wrapper = mount(<RenderCounter />);

    expect(wrapper.text()).toEqual('1');
    wrapper.update();
    expect(wrapper.text()).toEqual('2');
  });

  it('should not change the text after another RenderCounter\'s update', () => {
    // Render a checkbox with label in the document
    const wrapper1 = mount(<RenderCounter />);
    const wrapper2 = mount(<RenderCounter />);

    expect(wrapper2.text()).toEqual('1');
    wrapper1.update();
    expect(wrapper2.text()).toEqual('1');
  });
});

testWrapper(StatefulRenderCounter, 'StatefulRenderCounter');
testWrapper(StatelessRenderCounter, 'ComposedRenderCounter');
