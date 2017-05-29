import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';

import RenderCounter, { Counter, StatelessRenderCounter } from '../../src/RenderCounter';
import DivRefreshable from './DivRefreshable';

const stories = storiesOf('RenderCounter', module);

const styles = {
  container: {
    width: '50%',
    minHeight: 100,
    border: 'solid 1px grey',
    padding: 10,
  },
};

stories.addWithInfo(
  'RenderCounter',
  `
    This is the basic usage inside any component.\n
    NOTICE: You may see them render some extra times. That's a bug of storybook when you enter this page directly.
    Click another menu and re-enter this page to see real render times.
  `,
  () => (
    <div style={styles.container}>
      <RenderCounter initialCount={number('initialCount', 1)} />
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

const onRefreshInPossibitly = (possibility = 0.5, log = action('onRefresh')) => (context) => {
  if (Math.random() < possibility) {
    context.next();
    log('hit', context.props);
  } else {
    log('miss', context.props);
  }
};

stories.addWithInfo('inside DivRefreshable', description, () => {
  const possibility = number('possibility', 0.5);
  const cloneChild = boolean('cloneChild', true);
  const onRefresh = onRefreshInPossibitly(possibility);
  Object.defineProperty(onRefresh, 'name', { value: onRefresh.toString() });
  return (
    <DivRefreshable
      style={styles.container}
      label={`Refresh in ${possibility * 100}% possibility${cloneChild ? ' and Clone Child' : ''}`}
      cloneChild={cloneChild}
      onRefresh={onRefresh}
    >
      <RenderCounter />
    </DivRefreshable>
  );
}, { inline: true, propTablesExclude: [RenderCounter] });

stories.addWithInfo('Counter', () => (
  <div style={styles.container}>
    <Counter count={number('count', 1)} />
  </div>
), { inline: true });

stories.addWithInfo(
  'StatelessRenderCounter',
  'This is another implement of RenderCounter',
  () => (
    <div style={styles.container}>
      <StatelessRenderCounter initialCount={number('initialCount', 1)} />
    </div>
  ),
  { inline: true },
);
