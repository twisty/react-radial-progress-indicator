import React from 'react';
import { storiesOf, setAddon } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';
import { RadialProgress } from '../src';

const stories = storiesOf('RadialProgress', module);

stories.addDecorator(jsxDecorator);

stories.addDecorator(story => (
  <div style={{ textAlign: 'center', fontFamily: 'Helvetica, sans-serif' }}>
    {story()}
  </div>
));

stories
  .add('At 3/10', () => (
    <RadialProgress
      startStep={3}
      step={3}
      steps={10}
      width={200}
      height={200}
    />
  ))
  .add('At 3/10, thin ring', () => (
    <div style={{ fontWeight: 100 }}>
      <RadialProgress
        startStep={3}
        step={3}
        steps={10}
        width={200}
        height={200}
        ringThickness={0.05}
      />
    </div>
  ))
  .add('At 3/10, thick ring', () => (
    <RadialProgress
      startStep={3}
      step={3}
      steps={10}
      width={200}
      height={200}
      ringThickness={0.3}
    />
  ))
  .add('From 3/10 to 5/10', () => (
    <RadialProgress
      startStep={3}
      step={5}
      steps={10}
      width={200}
      height={200}
      showIntermediateProgress={true}
    />
  ))
  .add('From 5/10 to 3/10', () => (
    <RadialProgress
      startStep={5}
      step={3}
      steps={10}
      width={200}
      height={200}
      showIntermediateProgress={true}
    />
  ))
  .add('Step or sweep', () => {
    const steps = 20;
    const float = jsx => <div style={{ float: 'left', margin: 10 }}>{jsx}</div>;
    return (
      <div>
        {float(
          <RadialProgress
            steps={steps}
            step={steps}
            width={200}
            height={200}
            text={(steps, percentage) => Math.floor(steps * percentage)}
            duration={10000}
            ringFgColour="#666666"
            ringIntermediateColour="#666666"
            segmented={true}
          />
        )}
        {float(
          <RadialProgress
            steps={steps}
            step={steps}
            width={200}
            height={200}
            segmented={false}
            text={(steps, percentage) =>
              (Math.floor(steps * percentage * 10) / 10).toFixed(1)
            }
            duration={10000}
            ringFgColour="#666666"
            ringIntermediateColour="#666666"
            showIntermediateProgress={true}
          />
        )}
      </div>
    );
  })
  .add('5 steps, fast duration', () => (
    <RadialProgress
      steps={5}
      step={5}
      width={200}
      height={200}
      duration={1000}
      showIntermediateProgress={true}
    />
  ))
  .add('5 steps, slow duration', () => (
    <RadialProgress
      steps={5}
      step={5}
      width={200}
      height={200}
      duration={10000}
      showIntermediateProgress={true}
    />
  ))
  .add('Custom text', () => (
    <RadialProgress
      steps={5}
      step={5}
      width={200}
      height={200}
      showIntermediateProgress={true}
      text={(steps, proportion) => `${Math.floor(proportion * 100)}%`}
    />
  ))
  .add('Small, with custom text', () => (
    <div style={{ fontWeight: 'bold' }}>
      <RadialProgress
        steps={6}
        step={6}
        width={48}
        height={48}
        ringThickness={0.4}
        showIntermediateProgress={true}
        text={(steps, proportion) => `${Math.floor(steps * proportion)}`}
      />
    </div>
  ))
  .add('Sized to fit container', () => {
    const progress = (
      <RadialProgress step={10} steps={10} width="100%" height="100%" />
    );
    return (
      <div>
        <div
          style={{
            float: 'left',
            backgroundColor: '#eee',
            margin: 5,
            width: 50,
            height: 200,
          }}
        >
          {progress}
        </div>
        <div
          style={{
            float: 'left',
            backgroundColor: '#eee',
            margin: 5,
            width: 100,
            height: 200,
          }}
        >
          {progress}
        </div>
        <div
          style={{
            float: 'left',
            backgroundColor: '#eee',
            margin: 5,
            width: 200,
            height: 200,
          }}
        >
          {progress}
        </div>
        <div
          style={{
            float: 'left',
            backgroundColor: '#eee',
            margin: 5,
            width: 200,
            height: 100,
          }}
        >
          {progress}
        </div>
      </div>
    );
  })
  .add('Colours', () => {
    const schemes = [
      {
        name: 'option-1',
        ringBgColour: '#EDCA8A',
        ringFgColour: '#674509',
        ringIntermediateColour: '#AA8239',
        backgroundColour: '#FFE0A9',
        pageBackgroundColour: '#FFE0A9',
      },
      {
        name: 'option-2',
        ringBgColour: '#ffffff',
        ringFgColour: '#639A88',
        ringIntermediateColour: '#91CC7A',
        backgroundColour: '#eeeeee',
        pageBackgroundColour: '#eeeeee',
      },
      {
        name: 'option-3',
        ringBgColour: '#7C90A0',
        ringFgColour: '#B5AA9D',
        ringIntermediateColour: '#B9B7A7',
        backgroundColour: '#747274',
        pageBackgroundColour: '#747274',
      },
    ];
    return schemes.map(scheme => (
      <div
        key={scheme.name}
        style={{
          float: 'left',
          width: 100,
          height: 100,
          padding: 15,
          margin: 5,
          backgroundColor: scheme.pageBackgroundColour,
        }}
      >
        <RadialProgress
          step={10}
          steps={10}
          width="100%"
          height="100%"
          ringBgColour={scheme.ringBgColour}
          ringFgColour={scheme.ringFgColour}
          ringIntermediateColour={scheme.ringIntermediateColour}
          backgroundColour={scheme.backgroundColour}
          backgroundTransparent={false}
          showIntermediateProgress={true}
          segmented={false}
        />
      </div>
    ));
  });
