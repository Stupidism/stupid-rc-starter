import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RenderCounter, { Counter, StatelessRenderCounter } from '../../src/RenderCounter';
import DivRefreshable from './DivRefreshable';

const onRefresh = (context, ...args) => {
  if (Math.random() < 0.5) {
    context.next();
  }
  action('onRefresh')(context, ...args);
};

const stories = storiesOf('RenderCounter', module);

stories.addWithInfo(
  'RenderCounter',
  `
    This is the basic usage inside any component.\n
    NOTICE: You may see them render an extra time. That's a bug of storybook when you enter this page directly.
  `,
  () => (
    <div style={{ width: 600, height: 400, border: 'solid 1px grey', padding: 10 }}>
      <RenderCounter />
      <RenderCounter initialCount={1} />
      <RenderCounter initialCount={2} />
    </div>
  ),
  { inline: true },
);

const description = (
  <div>
    <h2>DivRefreshable</h2>
    <p><strong>DivRefreshable</strong> is a div with a button that can refresh itself</p>
    <p>It will update its only child if cloneChild prop is set to true</p>
  </div>
);

stories.addWithInfo('inside DivRefreshable', description, () => (
  <div style={{ width: 600 }}>
    <h4>{"Normal Counter won't re-render unless it's updated, e.g. hot module reload"}</h4>
    <DivRefreshable>
      <RenderCounter />
    </DivRefreshable>
    <h4>This div will update its child</h4>
    <DivRefreshable label="Refresh and Clone Child" cloneChild>
      <RenderCounter />
    </DivRefreshable>
    <h4>onRefresh can be decide to trigger or not</h4>
    <DivRefreshable
      label="Refresh in 50% possibility and Clone Child"
      cloneChild
      onRefresh={onRefresh}
    >
      <RenderCounter />
    </DivRefreshable>
  </div>
), { inline: true, propTablesExclude: [RenderCounter] });

stories.addWithInfo('Counter', () => (
  <div style={{ width: 600, height: 400, border: 'solid 1px grey', padding: 10 }}>
    <Counter count={1} />
    <Counter count={2} />
    <Counter count={3} />
  </div>
), { inline: true });

stories.addWithInfo(
  'StatelessRenderCounter',
  'This is another implement of RenderCounter',
  () => (
    <div style={{ width: 600, height: 400, border: 'solid 1px grey', padding: 10 }}>
      <StatelessRenderCounter />
      <StatelessRenderCounter />
      <StatelessRenderCounter />
    </div>
  ),
  { inline: true },
);
