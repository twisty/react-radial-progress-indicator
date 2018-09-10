// @flow

import * as React from 'react';
import { CanvasRenderer } from './index';

type fillStyle = string | CanvasGradient | CanvasPattern;

type Props = {
  width: number,
  height: number,
  steps: number,
  step: number,
  startStep: number,
  duration: number,
  ringThickness: number,
  ringBgColour: fillStyle,
  ringFgColour: fillStyle,
  ringIntermediateColour: fillStyle,
  backgroundColour: fillStyle,
  backgroundTransparent: boolean,
  showIntermediateProgress: boolean,
  showStepMarkers: boolean,
};

type State = {
  startTime: number,
  proportion: number | null,
};

class RadialProgress extends React.Component<Props, State> {
  static defaultProps = {
    width: 100,
    height: 100,
    steps: 10,
    step: 10,
    startStep: 0,
    duration: 5000,
    ringThickness: 0.2,
    ringBgColour: '#ccc',
    ringFgColour: '#3c763d',
    ringIntermediateColour: '#aaa',
    backgroundColour: '#dff0d8',
    backgroundTransparent: true,
    showIntermediateProgress: false,
    showStepMarkers: true,
  };

  state = {
    startTime: Date.now(),
    duration: null,
    proportion: null,
  };

  raf: (() => void) => number;

  graphic: ?CanvasRenderer;

  componentDidMount = () => {
    this.raf = window.requestAnimationFrame.bind(window);
    this.startAnimating();
  };

  componentWillUnmount() {
    this.cancelAnimating();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (
      nextProps.startStep !== this.props.startStep ||
      nextProps.step !== this.props.step
    ) {
      this.startAnimating();
    }
    return true;
  }

  startAnimating() {
    this.setState({
      proportion: null,
      startTime: Date.now(),
    });
    this.raf(() => {
      this.animate();
    });
  }

  cancelAnimating() {
    window.cancelAnimationFrame(this.raf);
  }

  getDuration = () => {
    return (
      (Math.abs(this.props.startStep - this.props.step) / this.props.steps) *
      this.props.duration
    );
  };

  getProportion = () => {
    const duration = this.getDuration();
    if (duration == 0) {
      return 1;
    }
    return Math.min(Date.now() - this.state.startTime, duration) / duration;
  };

  animate = () => {
    const proportion = this.getProportion();

    this.setState({
      proportion: proportion,
    });

    // Animate until end
    if (proportion < 1) {
      this.raf(() => {
        this.animate();
      });
    } else {
      // Done
    }
  };

  render() {
    const debug = proportion => {
      return (
        <ul style={{ fontFamily: 'monospace' }}>
          <li>startProportion: {startProportion}</li>
          <li>endProportion: {endProportion}</li>
          <li>getProportion(): {this.getProportion()}</li>
          <li>proportion: {proportion}</li>
          <li>props.duration: {this.props.duration}</li>
          <li>getDuration(): {this.getDuration()}</li>
        </ul>
      );
    };
    const label = (steps, proportion) => {
      const step = Math.floor(steps * proportion);
      return (
        <div
          className="label"
          style={{
            position: 'absolute',
            top: 0,
            width: this.props.width,
            height: this.props.height,
            lineHeight: `${this.props.height}px`,
            textAlign: 'center',
            fontSize: `${this.props.height / 4}px`,
            color: this.props.ringFgColour,
          }}
        >
          {step}/{steps}
        </div>
      );
    };
    const startProportion = this.props.startStep / this.props.steps;
    const endProportion = this.props.step / this.props.steps;
    const proportion =
      startProportion +
      (endProportion - startProportion) * this.getProportion();
    return (
      <div style={{ position: 'relative' }}>
        <CanvasRenderer
          ref={ref => (this.graphic = ref)}
          width={this.props.width}
          height={this.props.height}
          proportion={proportion}
          showIntermediateProgress={this.props.showIntermediateProgress}
          showStepMarkers={this.props.showStepMarkers}
          steps={this.props.steps}
          ringThickness={this.props.ringThickness}
          ringBgColour={this.props.ringBgColour}
          ringFgColour={this.props.ringFgColour}
          ringIntermediateColour={this.props.ringIntermediateColour}
          backgroundColour={this.props.backgroundColour}
          backgroundTransparent={this.props.backgroundTransparent}
        />
        {label(this.props.steps, proportion)}
        {/*debug(proportion)*/}
      </div>
    );
  }
}

export default RadialProgress;
