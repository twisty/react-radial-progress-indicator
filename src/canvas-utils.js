// @flow

/**
 * Set up the properties of a canvas element.
 */
export const getCanvasContext = (
  canvasDomElement: HTMLCanvasElement
): CanvasRenderingContext2D => {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvasDomElement.getBoundingClientRect();

  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvasDomElement.width = rect.width * dpr;
  canvasDomElement.height = rect.height * dpr;

  const ctx = canvasDomElement.getContext('2d');
  ctx.scale(dpr, dpr);

  return ctx;
};

/**
 * Draw a segment.
 */
export const drawSegment = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  startDegree: number,
  endDegree: number
) => {
  const degToRad = degree => {
    return (Math.PI / 180) * (degree - 90);
  };

  ctx.beginPath();
  ctx.moveTo(x, y);

  // arc(x, y, radius, startAngle, endAngle, anticlockwise)
  ctx.arc(x, y, radius, degToRad(startDegree), degToRad(endDegree), false);

  ctx.lineTo(x, y);
};
