import React from 'react';
import { storiesOf, setAddon } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import JSXAddon from 'storybook-addon-jsx';
import RadialProgressIndicator from '../src';

setAddon(JSXAddon);

const myBackgrounds = backgrounds([
  { name: 'white', value: '#fff', default: true },
  { name: 'blue', value: '#ccf' },
  { name: 'black', value: '#000' },
]);

const stories = storiesOf('RadialProgressIndicator', module);

stories.addDecorator(myBackgrounds);

stories
  .addWithJSX('At 3/10', () => (
    <RadialProgressIndicator
      startStep={3}
      step={3}
      steps={10}
      width={200}
      height={200}
    />
  ))
  .addWithJSX('At 3/10, thin ring', () => (
    <RadialProgressIndicator
      startStep={3}
      step={3}
      steps={10}
      width={200}
      height={200}
      ringThickness={0.05}
    />
  ))
  .addWithJSX('At 3/10, thick ring', () => (
    <RadialProgressIndicator
      startStep={3}
      step={3}
      steps={10}
      width={200}
      height={200}
      ringThickness={0.3}
    />
  ))
  .addWithJSX('To 3/10, with colours', () => (
    <RadialProgressIndicator
      step={3}
      steps={10}
      width={200}
      height={200}
      ringBgColour="#EDCA8A"
      ringFgColour="#674509"
      ringIntermediateColour="#AA8239"
      backgroundColour="#FFE0A9"
      backgroundTransparent={false}
      showIntermediateProgress={true}
    />
  ))
  .addWithJSX('From 3/10 to 5/10', () => (
    <RadialProgressIndicator
      startStep={3}
      step={5}
      steps={10}
      width={200}
      height={200}
      showIntermediateProgress={true}
    />
  ))
  .addWithJSX('From 5/10 to 3/10', () => (
    <RadialProgressIndicator
      startStep={5}
      step={3}
      steps={10}
      width={200}
      height={200}
      showIntermediateProgress={true}
    />
  ))
  .addWithJSX('100 steps, no step markers', () => (
    <RadialProgressIndicator
      steps={100}
      step={100}
      width={200}
      height={200}
      showStepMarkers={false}
    />
  ))
  .addWithJSX('5 steps, fast duration', () => (
    <RadialProgressIndicator
      steps={5}
      step={5}
      width={200}
      height={200}
      duration={1000}
      showIntermediateProgress={true}
    />
  ))
  .addWithJSX('5 steps, slow duration', () => (
    <RadialProgressIndicator
      steps={5}
      step={5}
      width={200}
      height={200}
      duration={10000}
      showIntermediateProgress={true}
    />
  ))
  .addWithJSX('Custom text', () => (
    <div style={{ fontFamily: 'sans-serif' }}>
      <RadialProgressIndicator
        steps={5}
        step={5}
        width={200}
        height={200}
        showIntermediateProgress={true}
        text={(steps, proportion) => `${Math.floor(proportion * 100)}%`}
      />
    </div>
  ))
  .addWithJSX('Small, with custom text', () => (
    <div style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>
      <RadialProgressIndicator
        steps={6}
        step={6}
        width={48}
        height={48}
        ringThickness={0.4}
        showIntermediateProgress={true}
        text={(steps, proportion) => `${Math.floor(steps * proportion)}`}
      />
    </div>
  ));
