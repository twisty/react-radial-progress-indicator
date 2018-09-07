// @flow

import * as React from 'react';

import { getCanvasContext, drawSegment } from '../canvas-utils';

type fillStyle = string | CanvasGradient | CanvasPattern;

type Props = {
  backgroundColour: fillStyle,
  backgroundTransparent: boolean,
  height: number,
  proportion: number,
  ringBgColour: fillStyle,
  ringFgColour: fillStyle,
  ringIntermediateColour: fillStyle,
  ringThickness: number,
  showIntermediateProgress: boolean,
  showStepMarkers: boolean,
  steps: number,
  width: number,
};

class CanvasRenderer extends React.Component<Props> {
  static defaultProps = {
    backgroundColour: '#fff',
    backgroundTransparent: true,
    height: 100,
    proportion: 0,
    ringBgColour: '#ccc',
    ringFgColour: '#3c763d',
    ringIntermediateColour: '#aaa',
    ringThickness: 0.2,
    showIntermediateProgress: false,
    showStepMarkers: true,
    steps: 360,
    width: 100,
  };

  ctx: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement | null;

  componentDidMount = () => {
    if (this.canvas) {
      this.ctx = getCanvasContext(this.canvas);
      this.draw();
    }
  };

  componentDidUpdate() {
    if (this.canvas) {
      this.draw();
    }
  }

  draw = () => {
    const x = this.props.width * 0.5;
    const y = this.props.height * 0.5;

    const radius = radiusProportion => {
      return (this.props.width / 2) * radiusProportion;
    };

    const step = Math.floor(this.props.steps * this.props.proportion);

    // Set end degree of arc
    const fineStepDegree = 360 * this.props.proportion;
    const stepDegree = (360 / this.props.steps) * step;

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.props.width, this.props.height);

    // Draw the background circle
    drawSegment(this.ctx, x, y, radius(1), 0, 360);
    this.ctx.fillStyle = this.props.ringBgColour;
    this.ctx.fill();

    // Draw the 'intermediate progress' ring
    if (this.props.showIntermediateProgress === true) {
      drawSegment(
        this.ctx,
        x,
        y,
        radius(1 /* - this.props.ringThickness / 2*/),
        0,
        fineStepDegree
      );
      this.ctx.fillStyle = this.props.ringIntermediateColour;
      this.ctx.fill();
    }

    // Draw the main progress ring
    drawSegment(this.ctx, x, y, radius(1), 0, stepDegree);
    this.ctx.fillStyle = this.props.ringFgColour;
    this.ctx.fill();

    if (this.props.showStepMarkers) {
      if (this.props.backgroundTransparent) {
        this.ctx.globalCompositeOperation = 'destination-out';
      }
      for (let i = 0; i < this.props.steps; i++) {
        const angle = (i / this.props.steps) * 360;
        drawSegment(this.ctx, x, y, radius(1), angle - 1, angle + 1);
        this.ctx.fillStyle = this.props.backgroundColour;
        this.ctx.fill();
      }

      this.ctx.globalCompositeOperation = 'source-over';
    }

    /*
     * Draw the foreground circle. If there is no foreground colour,
     * make the shape transparent via composition effect.
     */
    if (this.props.backgroundTransparent) {
      this.ctx.globalCompositeOperation = 'destination-out';
    }
    drawSegment(this.ctx, x, y, radius(1 - this.props.ringThickness), 0, 360);
    this.ctx.fillStyle = this.props.backgroundColour;
    this.ctx.fill();

    this.ctx.globalCompositeOperation = 'source-over';
  };

  render() {
    return (
      <canvas
        ref={ref => (this.canvas = ref)}
        style={{
          width: this.props.width,
          height: this.props.height,
        }}
      />
    );
  }
}

export default CanvasRenderer;
