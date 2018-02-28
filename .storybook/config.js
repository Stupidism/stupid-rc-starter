import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon, { setDefaults } from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';

import pkg from '../starter/config/minimal-package';

// addon-options
setOptions({
  name: pkg.name,
  url: pkg.repository.url,
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  sortStoriesByKind: false,
});

// addon-info
setDefaults({
  inline: true,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
});
setAddon(infoAddon);

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
