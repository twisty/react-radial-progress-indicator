import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
} from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { CanvasRenderer } from '../src/renderers/';

const backgrounds = [
  { name: 'white', value: '#fff', default: true },
  { name: 'blue', value: '#ccf' },
  { name: 'black', value: '#000' },
];

storiesOf('CanvasRenderer', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .add(
    'The kitchen sink',
    () => {
      const coloursGroup = 'Colour options';
      const displayGroup = 'Display options';
      const progressGroup = 'Progress display options';
      return (
        <div style={{ width: 200, height: 200 }}>
          <CanvasRenderer
            steps={number(
              'steps',
              10,
              {
                range: true,
                min: 5,
                max: 12,
                step: 1,
              },
              progressGroup
            )}
            proportion={number(
              'proportion',
              0.55,
              {
                range: true,
                min: 0,
                max: 1,
                step: 1 / 500,
              },
              progressGroup
            )}
            showIntermediateProgress={boolean(
              'showIntermediateProgress',
              true,
              progressGroup
            )}
            segmented={boolean('segmented', true, displayGroup)}
            ringBgColour={color('ringBgColour', '#ccc', coloursGroup)}
            ringIntermediateColour={color(
              'ringIntermediateColour',
              '#aaa',
              coloursGroup
            )}
            ringFgColour={color('ringFgColour', '#000', coloursGroup)}
            backgroundColour={color('backgroundColour', '#fff', coloursGroup)}
            backgroundTransparent={boolean(
              'backgroundTransparent',
              true,
              coloursGroup
            )}
            ringThickness={number(
              'ringThickness',
              0.2,
              {
                range: true,
                min: 0,
                max: 0.5,
                step: 1 / 100,
              },
              displayGroup
            )}
          />
        </div>
      );
    },
    {
      backgrounds: backgrounds,
    }
  );
