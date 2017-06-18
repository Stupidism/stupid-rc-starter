import React from 'react';

import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import { Story } from '@storybook/addon-info';

import RenderCounter, { Counter, StatelessRenderCounter } from '../../src/RenderCounter';
import DivRefreshable from './DivRefreshable';
import createUnstableHandler from './createUnstableHandler';
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
  () => {
    const possibility = number('possibility', 0.5);
    const onRerender = createUnstableHandler(possibility);
    return (
      <DivRefreshable
        label={`Counter re-rendered in ${possibility * 100}% possibility`}
      >
        <RenderCounter onRerender={onRerender} />
      </DivRefreshable>
    );
  },
  { propTablesExclude: [DivRefreshable] },
);

stories.addWithInfo('Counter', () => <Counter count={number('count', 1)} />);

stories.addWithInfo(
  'StatelessRenderCounter',
  'This is another implement of RenderCounter',
  () => <StatelessRenderCounter initialCount={number('initialCount', 1)} />,
);
