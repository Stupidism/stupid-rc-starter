/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';

import { shallowWithUntil as shallow } from '../until';

describe('until', () => {
  const Div = () => <div />;
  const hoc = Component => () => <Component />;

  it('shallow renders the current wrapper one level deep', () => {
    const EnhancedDiv = hoc(Div);
    const wrapper = shallow(<EnhancedDiv />).until('Div');
    expect(wrapper.contains(<div />)).toBe(true);
  });

  it('shallow renders the current wrapper several levels deep', () => {
    const EnhancedDiv = hoc(hoc(hoc(Div)));
    const wrapper = shallow(<EnhancedDiv />).until('Div');
    expect(wrapper.contains(<div />)).toBe(true);
  });

  it('stops shallow rendering when the wrapper is empty', () => {
    const nullHoc = () => () => null;
    const EnhancedDiv = nullHoc(Div);
    const wrapper = shallow(<EnhancedDiv />).until('Div');
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('shallow renders the current wrapper even if the selector never matches', () => {
    const EnhancedDiv = hoc(Div);
    const wrapper = shallow(<EnhancedDiv />).until('NotDiv');
    expect(wrapper.contains(<div />)).toBe(true);
  });

  it('stops shallow rendering when it encounters a DOM element', () => {
    const wrapper = shallow(<div><Div /></div>).until('Div');
    expect(wrapper.contains(<div><Div /></div>)).toBe(true);
  });

  describe('with context', () => {
    const Foo = () => <Div />;
    Foo.contextTypes = { quux: PropTypes.bool.isRequired };

    class Bar extends React.Component {
      getChildContext() {
        return { quux: true };
      }
      render() {
        return <Foo />;
      }
    }

    Bar.childContextTypes = { quux: PropTypes.bool };

    it('passes down context from the root component', () => {
      const EnhancedFoo = hoc(Foo);
      const wrapper = shallow(<EnhancedFoo />, { context: { quux: true } }).until('Foo');
      expect(wrapper.context('quux')).toBe(true);
      expect(wrapper.contains(<Div />)).toBe(true);
    });

    it('passes down context from an intermediary component', () => {
      const EnhancedBar = hoc(Bar);
      const wrapper = shallow(<EnhancedBar />).until('Foo');
      expect(wrapper.context('quux')).toBe(true);
      expect(wrapper.contains(<Div />)).toBe(true);
    });
  });
});
