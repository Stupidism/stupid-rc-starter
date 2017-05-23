import DefaultRenderCounter from '../../src/RenderCounter';
import StatefulRenderCounter from '../../src/RenderCounter/StatefulRenderCounter';
import StatelessRenderCounter from '../../src/RenderCounter/StatelessRenderCounter';

test('[entry]RenderCounter/index', () => {
  expect(DefaultRenderCounter).toEqual(StatefulRenderCounter);
  expect(DefaultRenderCounter).not.toEqual(StatelessRenderCounter);
});
