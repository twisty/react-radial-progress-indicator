import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/radial-progress');
  require('../stories/canvas-renderer');
}

configure(loadStories, module);
