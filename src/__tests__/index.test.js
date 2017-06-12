/* eslint-env jest */
import { expect } from 'chai';
import components, { RenderCounter } from '../index';
import RenderCounter1 from '../RenderCounter';

describe('[entry]index.js', () => {
  it('should export components hierarchically', () => {
    expect(RenderCounter).to.equal(components.RenderCounter);
    expect(RenderCounter).to.equal(RenderCounter1);
  });
});
