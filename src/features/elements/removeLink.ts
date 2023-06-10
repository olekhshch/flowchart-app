import { ChartPoint, PointChild } from "./elementsTypes";

export const removeLink = (point: ChartPoint, linkToRemove: PointChild) => {
  const { linkedTo } = point;
  const newLinkedTo = linkedTo.filter(
    (link) =>
      link.elementId !== linkToRemove.elementId &&
      link.elementType !== linkToRemove.elementType
  );
  return { ...point, linkedTo: newLinkedTo } as ChartPoint;
};
