import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import { Story } from '@storybook/addon-info';

import RenderCounter, { Counter, StatelessRenderCounter } from '../../src/RenderCounter';
import DivRefreshable from './DivRefreshable';
import './RenderCounter.story.css';

const stories = storiesOf('RenderCounter', module)
  .addDecorator((getStory) => {
    const element = getStory();
    if (element.type === Story) {
      return <div className="root">{element}</div>;
    }
    return element;
  });

stories.addWithInfo(
  'RenderCounter',
  `
    This is the basic usage inside any component.\n
    NOTICE: You may see them render some extra times. That's a bug of storybook when you enter this page directly.
    Click another menu and re-enter this page to see real render times.
  `,
  () => <RenderCounter initialCount={number('initialCount', 0)} />,
);

const description = (
  <div>
    <h2>DivRefreshable</h2>
    <p><strong>DivRefreshable</strong> is a div with a button that can refresh itself</p>
    <p>It will update its only child if cloneChild prop is set to true</p>
  </div>
);

const createUnstableHandler = (possibility = 0.5, log = action('onRerender')) => {
  const handler = (props, next) => (count) => {
    if (Math.random() < possibility) {
      next();
      log('hit', possibility, props, count);
    } else {
      log('miss', possibility, props, count);
    }
  };

  Object.defineProperty(handler, 'name', { value: handler.toString() });
  return handler;
};

stories.addWithInfo('inside DivRefreshable', description, () => {
  const possibility = number('possibility', 0.5);
  const onRerender = createUnstableHandler(possibility);
  return (
    <DivRefreshable
      label={`Counter re-rendered in ${possibility * 100}% possibility`}
    >
      <RenderCounter onRerender={onRerender} />
    </DivRefreshable>
  );
}, { propTablesExclude: [RenderCounter] });

stories.addWithInfo('Counter', () => <Counter count={number('count', 1)} />);

stories.addWithInfo(
  'StatelessRenderCounter',
  'This is another implement of RenderCounter',
  () => <StatelessRenderCounter initialCount={number('initialCount', 1)} />,
);
