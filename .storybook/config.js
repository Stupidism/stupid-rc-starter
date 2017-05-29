import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';

import pkg from '../starter/config/minimal-package';

// addon-options
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

// addon-knobs
// Add the `withKnobs` decorator to add knobs support to your stories.
addDecorator(withKnobs);

// load stories
function loadStories() {
  const req = require.context('../stories', true, /\.story\.js$/);

  require('../stories/Welcome.js');

  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
