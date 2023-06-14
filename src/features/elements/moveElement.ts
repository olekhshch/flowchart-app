import {
  ChartElement,
  ChartNode,
  ChartPoint,
  TypeOfElement,
} from "./elementsTypes";

export const setElementCoordinates = (
  element: ChartElement,
  dX: number,
  dY: number
) => {
  const { type } = element;
  if (type === "node") {
    const thisElement = element as ChartNode;
    const { top, left } = thisElement.coordinates;
    return {
      ...thisElement,
      coordinates: { top: top + dY, left: left + dX },
    } as ChartNode;
  }
  if (type === "point") {
    const thisElement = element as ChartPoint;
    const { x, y } = thisElement.coordinates;
    return {
      ...thisElement,
      coordinates: { x: x + dX, y: y + dY },
    } as ChartPoint;
  }
};
