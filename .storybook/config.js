import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/index.js');
  require('../stories/canvas-renderer.js');
}

configure(loadStories, module);
