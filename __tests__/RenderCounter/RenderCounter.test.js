import React from 'react';
import { mount } from 'enzyme';
import StatefulRenderCounter from '../../src/RenderCounter/StatefulRenderCounter';
import StatelessRenderCounter from '../../src/RenderCounter/StatelessRenderCounter';

const testWrapper = (RenderCounter, name = 'RenderCounter') => describe(name, () => {
  it('should change the text after update', () => {
    const wrapper = mount(<RenderCounter />);

    expect(wrapper.text()).toEqual('1');
    wrapper.update();
    expect(wrapper.text()).toEqual('2');
  });

  it('should accept a prop initialCount as the initial value of count', () => {
    const wrapper = mount(<RenderCounter initialCount={2} />);

    expect(wrapper.text()).toEqual('2');
    wrapper.update();
    expect(wrapper.text()).toEqual('3');
  });

  it('should not change the text after another RenderCounter\'s update', () => {
    const wrapper1 = mount(<RenderCounter />);
    const wrapper2 = mount(<RenderCounter />);

    expect(wrapper2.text()).toEqual('1');
    wrapper1.update();
    expect(wrapper2.text()).toEqual('1');
  });

  describe('when onRerender is not undefined', () => {
    let onRerender;
    let onRerenderHandler;

    beforeEach(() => {
      onRerender = jest.fn();
      onRerenderHandler = jest.fn(() => onRerender);
    });

    afterEach(() => {
      expect(onRerenderHandler).toHaveBeenCalledTimes(1);
      expect(onRerender).toHaveBeenCalledTimes(1);
      expect(onRerender).toHaveBeenCalledWith(2);
    });

    describe('when onRenderer(props)', () => {
      it('should call onRerender handler with props and update the text', () => {
        const wrapper = mount(<RenderCounter onRerender={onRerenderHandler} />);
        wrapper.update();

        expect(onRerenderHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            onRerender: onRerenderHandler,
            initialCount: 1,
          }),
        );
        expect(wrapper.text()).toEqual('2');
      });
    });

    describe('when onRenderer(props, next) and next is not called', () => {
      it('should call onRerender handler with props and next, but not update the text', () => {
        // eslint-disable-next-line no-unused-vars
        onRerenderHandler = jest.fn((props, next) => onRerender);
        Object.defineProperty(onRerenderHandler, 'length', { value: 2 });

        const wrapper = mount(<RenderCounter onRerender={onRerenderHandler} />);
        wrapper.update();

        expect(onRerenderHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            onRerender: onRerenderHandler,
            initialCount: 1,
          }),
          expect.any(Function),
        );
        expect(wrapper.text()).toEqual('1');
      });
    });
  });
});

testWrapper(StatefulRenderCounter, 'StatefulRenderCounter');
testWrapper(StatelessRenderCounter, 'ComposedRenderCounter');
