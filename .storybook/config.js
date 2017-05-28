import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

setAddon(infoAddon);

function loadStories() {
  const req = require.context('../stories', true, /\.story\.js$/);

  require('../stories/Welcome.js');

  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
