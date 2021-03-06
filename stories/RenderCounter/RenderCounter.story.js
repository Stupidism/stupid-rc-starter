import React from 'react';

import { storiesOf } from '@storybook/react';
import { number, boolean } from '@storybook/addon-knobs';
import { Story, withInfo } from '@storybook/addon-info';

import RenderCounter, { Counter, StatelessRenderCounter, withRenderCount } from '../../src/RenderCounter';
import DivRefreshable from './DivRefreshable';
import MyCounter from './MyCounter';
import createOuterHandler from './createOuterHandler';
import './RenderCounter.story.css';

const stories = storiesOf('RenderCounter', module)
  .addDecorator((getStory) => {
    const element = getStory();
    if (element.type === Story) {
      return <div className="root">{element}</div>;
    }
    return element;
  });

const defaultDesc = `
  NOTICE: You may see some extra times.\n
  That's a bug of storybook happens when you enter this page directly.\n
  You can click another menu and re-enter this route to see real render times.
`;

const defaultOptions = {
  propTablesExclude: [DivRefreshable],
};
const addRenderCounter = (name, Component, { desc = defaultDesc, options } = {}) =>
  stories.add(name, withInfo({
    text: desc,
    ...defaultOptions,
    ...options,
  })(() => {
    const blockOnRerender = boolean('blockOnRerender', true);
    const onRerender = createOuterHandler({ name: 'onRerender', block: blockOnRerender });
    const initialCount = number('initialCount', 1);
    return (
      <div>
        {`blockOnRerender: ${JSON.stringify(blockOnRerender)}`}
        <DivRefreshable>
          <Component initialCount={initialCount} onRerender={onRerender} />
        </DivRefreshable>
      </div>
    );
  }));

addRenderCounter('RenderCounter', RenderCounter);
addRenderCounter('StatelessRenderCounter', StatelessRenderCounter, {
  options: {
    propTables: [StatelessRenderCounter, Counter],
  },
});

const MyRenderCounter = withRenderCount(MyCounter);

addRenderCounter('withRenderCount', MyRenderCounter, {
  options: {
    propTables: [MyRenderCounter, MyCounter],
  },
});
