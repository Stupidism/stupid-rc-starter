import PropTypes from 'prop-types';
import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon, { setDefaults } from '@storybook/addon-info';
import PropVal from '@storybook/addon-info/dist/components/PropVal';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';

import pkg from '../starter/config/minimal-package';

// addon-options
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

// addon-info
setDefaults({
  inline: true,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
});
setAddon(infoAddon);
// temp fix PropVal.propTypes
PropVal.propTypes = {
  ...PropVal.propTypes,
  maxPropObjectKeys: PropTypes.number,
  maxPropArrayLength: PropTypes.number,
  maxPropStringLength: PropTypes.number,
};

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
