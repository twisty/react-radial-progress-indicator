// @flow

import * as React from 'react';
import { CanvasRenderer } from './renderers/';

type fillStyle = string | CanvasGradient | CanvasPattern;

type Props = {
  /** The CSS width of the element */
  width: number | string,
  /** The CSS height of the element */
  height: number | string,
  /** The total number of steps to complete the ring */
  steps: number,
  /** The current step */
  step: number,
  /** Start animating from this step, to the current step */
  startStep: number,
  /** The time in milliseconds to complete an animation of all steps in the ring */
  duration: number,
  /** The thickness of the progress ring, expressed as a proportion (0.0 to 1.0) of the radius of the ring */
  ringThickness: number,
  /** The colour of the uncompleted steps of the ring */
  ringBgColour: fillStyle,
  /** The colour of the completed steps of the ring */
  ringFgColour: fillStyle,
  /** The colour of the 'intermediate' progress indicator that travels around the ring */
  ringIntermediateColour: fillStyle,
  /** The colour for the centre of the ring */
  backgroundColour: fillStyle,
  /** Whether to display the centre of the ring as transparent */
  backgroundTransparent: boolean,
  /** Whether to display the 'intermediate' progress bar */
  showIntermediateProgress: boolean,
  /** Whether to segment the steps by displaying a gap between them */
  segmented: boolean,
  /** A function that returns the content that is displayed in the centre of the ring */
  text: (steps: number, proportion: number) => React.Node,
};

type State = {
  startTime: number,
  proportion: number | null,
};

export class RadialProgress extends React.Component<Props, State> {
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
    segmented: true,
    text: (steps: number, proportion: number) => {
      const step = Math.floor(steps * proportion);
      return `${step}/${steps}`;
    },
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
    const debug = (proportion: number) => (
      <ul style={{ fontFamily: 'monospace' }}>
        <li>startProportion: {startProportion}</li>
        <li>endProportion: {endProportion}</li>
        <li>getProportion(): {this.getProportion()}</li>
        <li>proportion: {proportion}</li>
        <li>props.duration: {this.props.duration}</li>
        <li>getDuration(): {this.getDuration()}</li>
      </ul>
    );
    const label = (steps, proportion) => {
      if (this.graphic && this.graphic.canvas) {
        const rect = this.graphic.canvas.getBoundingClientRect();
        const diameter = Math.min(rect.height, rect.width);
        const style = {
          position: 'absolute',
          textAlign: 'center',
          color: this.props.ringFgColour,
          fontSize: `${diameter / 4}px`,
        };
        return (
          <div className="RadialProgressIndicator__label" style={style}>
            {this.props.text(steps, proportion)}
          </div>
        );
      }
      return null;
    };
    const startProportion = this.props.startStep / this.props.steps;
    const endProportion = this.props.step / this.props.steps;
    const proportion =
      startProportion +
      (endProportion - startProportion) * this.getProportion();
    return (
      <div
        className="RadialProgressIndicator"
        style={{
          position: 'relative',
          width: this.props.width,
          height: this.props.height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CanvasRenderer
          ref={ref => (this.graphic = ref)}
          proportion={proportion}
          showIntermediateProgress={this.props.showIntermediateProgress}
          segmented={this.props.segmented}
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
