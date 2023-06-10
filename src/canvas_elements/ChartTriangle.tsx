import React from "react";
import { APPositions, TypeOfElement } from "../features/elements/elementsTypes";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

type TriangleProps = {
  x: number;
  y: number;
  r: number;
  id: string;
  pointId: string;
  elementType: TypeOfElement;
  direction: APPositions;
};

const ChartTriangleEl = ({
  x,
  y,
  r,
  id,
  pointId,
  direction,
}: TriangleProps) => {
  const { scale } = useSelector((state: RootState) => state.general);

  const angle = () => {
    switch (direction) {
      case "right":
        return 90;
      case "bottom":
        return -180;
      case "left":
        return -90;
      default:
        return 0;
    }
  };

  const x1 = x - r / 2;
  const y1 = y;

  const vector = {
    x: r / 2,
    y: r / 2,
  };

  const x2 = x1 + 1 * vector.x;
  const y2 = y1 + -1 * vector.y;

  const x3 = x2 + 1 * vector.x;
  const y3 = y2 + 1 * vector.y;

  return (
    <polygon
      points={`${x1 * scale}, ${y1 * scale} ${x2 * scale}, ${y2 * scale} ${
        x3 * scale
      }, ${y3 * scale}`}
      strokeWidth="2"
      stroke="var(--main)"
      fill="white"
      transform={`rotate(${angle()}, ${x * scale}, ${y * scale})`}
    />
  );
};

export default ChartTriangleEl;
