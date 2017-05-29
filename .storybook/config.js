import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';

import pkg from '../starter/config/minimal-package';

setAddon(infoAddon);
setOptions({
  name: pkg.name,
  url: pkg.repository.url,
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: false,
});

function loadStories() {
  const req = require.context('../stories', true, /\.story\.js$/);

  require('../stories/Welcome.js');

  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
