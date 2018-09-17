// @flow

import * as React from 'react';

import {
  getCanvasContext,
  drawSegment,
  drawStrokeSegment,
  degToRad,
} from '../canvas-utils';

type fillStyle = string | CanvasGradient | CanvasPattern;

type Props = {
  /** The colour for the centre of the ring */
  backgroundColour: fillStyle,
  /** Whether to display the centre of the ring as transparent */
  backgroundTransparent: boolean,
  /** The proportion of progress */
  proportion: number,
  /** The colour of the uncompleted steps of the ring */
  ringBgColour: fillStyle,
  /** The colour of the completed steps of the ring */
  ringFgColour: fillStyle,
  /** The colour of the 'intermediate' progress indicator that travels around the ring */
  ringIntermediateColour: fillStyle,
  /** The thickness of the progress ring, expressed as a proportion (0.0 to 1.0) of the radius of the ring */
  ringThickness: number,
  /** Whether to display the 'intermediate' progress bar */
  showIntermediateProgress: boolean,
  /** Whether to show a gap between segments */
  segmented: boolean,
  /** The width of the gap between segments, in degrees */
  segmentGap: number,
  /** The total number of steps to complete the ring */
  steps: number,
};

export class CanvasRenderer extends React.Component<Props> {
  static defaultProps = {
    backgroundColour: '#fff',
    backgroundTransparent: true,
    proportion: 0,
    ringBgColour: '#ccc',
    ringFgColour: '#3c763d',
    ringIntermediateColour: '#aaa',
    ringThickness: 0.2,
    showIntermediateProgress: false,
    segmented: true,
    segmentGap: 2,
    steps: 360,
  };

  ctx: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement | null;

  componentDidMount = () => {
    if (this.canvas !== null) {
      // Assign canvas to local variable to work around a flow refinement invalidation.
      // https://flow.org/en/docs/lang/refinements/#toc-refinement-invalidations
      const canvas = this.canvas;
      this.ctx = getCanvasContext(canvas);
      this.draw(canvas);
    }
  };

  componentDidUpdate = () => {
    if (this.canvas !== null) {
      this.draw(this.canvas);
    }
  };

  draw = (canvasElement: HTMLCanvasElement) => {
    const radius = radiusProportion => {
      return (Math.min(width, height) / 2) * radiusProportion;
    };

    const rect = canvasElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = width * 0.5;
    const y = height * 0.5;
    const lineWidth = radius(this.props.ringThickness);
    const ringInner = radius(1 - this.props.ringThickness);
    const ringOuter = radius(1);

    const step = Math.floor(this.props.steps * this.props.proportion);

    // Clear the canvas
    this.ctx.clearRect(0, 0, width, height);

    // Draw the background circle
    if (this.props.backgroundTransparent === false) {
      drawSegment(this.ctx, x, y, ringOuter, 0, 360);
      this.ctx.fillStyle = this.props.backgroundColour;
      this.ctx.fill();
    }

    if (this.props.segmented) {
      for (let i = 0; i < this.props.steps; i++) {
        const startAngle = (i / this.props.steps) * 360;
        const endAngle = ((i + 1) / this.props.steps) * 360;
        const strokeStyle =
          i < step ? this.props.ringFgColour : this.props.ringBgColour;
        drawStrokeSegment(
          this.ctx,
          x,
          y,
          startAngle + this.props.segmentGap / 2,
          endAngle - this.props.segmentGap / 2,
          ringInner,
          ringOuter,
          strokeStyle
        );
      }
    } else {
      const endAngle = (step / this.props.steps) * 360;
      drawStrokeSegment(
        this.ctx,
        x,
        y,
        0,
        360,
        ringInner,
        ringOuter,
        this.props.ringBgColour
      );
      drawStrokeSegment(
        this.ctx,
        x,
        y,
        0,
        endAngle,
        ringInner,
        ringOuter,
        this.props.ringFgColour
      );
    }

    // Draw the 'intermediate progress' ring
    if (this.props.showIntermediateProgress === true) {
      let total = 360;
      let segmentOffset = 0;
      if (this.props.segmented === true) {
        total = 360 - this.props.steps * this.props.segmentGap;
        segmentOffset =
          step * this.props.segmentGap + this.props.segmentGap / 2;
      }
      const startAngle = (step / this.props.steps) * total;
      const endAngle = total * this.props.proportion;
      drawStrokeSegment(
        this.ctx,
        x,
        y,
        startAngle + segmentOffset,
        endAngle + segmentOffset,
        ringInner,
        ringOuter,
        this.props.ringIntermediateColour
      );
    }
  };

  render() {
    return (
      <canvas
        ref={ref => (this.canvas = ref)}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    );
  }
}
