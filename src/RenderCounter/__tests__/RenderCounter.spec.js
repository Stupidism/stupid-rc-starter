/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import StatefulRenderCounter from '../StatefulRenderCounter';
import StatelessRenderCounter from '../StatelessRenderCounter';

const testWrapper = (RenderCounter, name = 'RenderCounter') => describe(name, () => {
  it('should accept a prop initialCount as the initial value of count', () => {
    const tree = renderer.create(<RenderCounter initialCount={2} />);

    expect(tree).toMatchSnapshot();
  });

  it('should change the text after update', () => {
    const wrapper = mount(<RenderCounter />);

    expect(wrapper.text()).toEqual('1');
    wrapper.setProps({});
    expect(wrapper.text()).toEqual('2');
  });

  it('should not change the text after another RenderCounter\'s update', () => {
    const wrapper1 = mount(<RenderCounter />);
    const wrapper2 = mount(<RenderCounter />);

    expect(wrapper2.text()).toEqual('1');
    wrapper1.setProps({});
    expect(wrapper2.text()).toEqual('1');
  });

  describe('when onRerender is defined', () => {
    const onRerenderHandler = jest.fn();

    beforeEach(() => {
      onRerenderHandler.mockClear();
    });

    afterEach(() => {
      expect(onRerenderHandler).toHaveBeenCalledTimes(1);
    });

    describe('when onRenderer(count)', () => {
      it('should call onRerender handler with count and update the text', () => {
        const onRerender = count => onRerenderHandler(count);
        const wrapper = mount(<RenderCounter onRerender={onRerender} />);
        wrapper.setProps({});
        expect(onRerenderHandler).toHaveBeenCalledWith(2);
        expect(wrapper.text()).toEqual('2');
      });
    });

    describe('when onRenderer(count, next)', () => {
      it('should call onRerender handler with count and update the text', () => {
        const onRerender = (count, next) => onRerenderHandler(count, next(), next());
        const wrapper = mount(<RenderCounter onRerender={onRerender} />);
        wrapper.setProps({});
        expect(onRerenderHandler).toHaveBeenCalledWith(2, undefined, undefined);
        expect(wrapper.text()).toEqual('2');
      });
    });

    describe('when onRenderer(count, next) and next is not called', () => {
      it('should call onRerender handler with count and next, but not update the text', () => {
        const onRerender = (count, next) => onRerenderHandler(count, next);
        const wrapper = mount(<RenderCounter onRerender={onRerender} />);
        wrapper.setProps({});

        expect(onRerenderHandler).toHaveBeenCalledWith(2, expect.any(Function));
        expect(wrapper.text()).toEqual('1');
      });
    });
  });
});

testWrapper(StatefulRenderCounter, 'StatefulRenderCounter');
testWrapper(StatelessRenderCounter, 'ComposedRenderCounter');
