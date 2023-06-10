import { ChartElement, ChartNode, TypeOfElement } from "./elementsTypes";

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
};
