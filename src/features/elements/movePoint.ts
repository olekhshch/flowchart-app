import { ChartPoint } from "./elementsTypes";

export const movePoint = (point: ChartPoint, d: { dx: number; dy: number }) => {
  const { x, y } = point.coordinates;
  return { ...point, coordinates: { x: x + d.dx, y: y + d.dy } };
};
