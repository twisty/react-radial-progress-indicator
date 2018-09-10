# react-radial-progress-indicator

A React component that displays a customisable circular progress gauge.

This component displays a circular progress gauge, useful for displaying progress on a completeable action, like:

* “you’re on step 3/10”, or 
* “you're 30% there”

<img alt="3/10" src="docs/example.png" width="100" height="100" />

## Features

* The graphic is drawn using HTML5 canvas.
* Optimised to natively draw at the correct pixel density for the user's screen.
* Tweakable props to set various colours and layout metrics.
* Animatable between steps.

## Demo

* Have a look at [this storybook](https://twisty.github.io/react-radial-progress-indicator/).

## Install

Install with yarn…

```
yarn add react-radial-progress-indicator
```

…or npm:

```
npm install react-radial-progress-indicator
```

## Usage

```jsx
import React, { Component } from 'react'
import RadialProgressIndicator from 'react-radial-progress-indicator';

class MyComponent extends Component {
  render() {
    return (
      <RadialProgressIndicator
        width={100}
        height={100}
        steps={10}
        step={3}
      />
    )
  }
}
```
