import React from 'react';
import { storiesOf, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import RadialProgressIndicator from '../src';

setAddon(JSXAddon);

const stories = storiesOf('RadialProgressIndicator', module);

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
  ));
