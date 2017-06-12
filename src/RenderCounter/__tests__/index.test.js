/* eslint-env jest */
import DefaultRenderCounter from '../index';
import StatefulRenderCounter from '../StatefulRenderCounter';
import StatelessRenderCounter from '../StatelessRenderCounter';

test('[entry]RenderCounter/index', () => {
  expect(DefaultRenderCounter).toEqual(StatefulRenderCounter);
  expect(DefaultRenderCounter).not.toEqual(StatelessRenderCounter);
});
