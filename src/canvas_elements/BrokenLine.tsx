import React from "react";
import {
  BrokenLineDirection,
  ChartPoint,
} from "../features/elements/elementsTypes";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export type BrokenLineProps = {
  begPoint: ChartPoint;
  endPoint: ChartPoint;
  direction: BrokenLineDirection;
  turnCoordinate: number;
};

const BrokenLine = ({
  begPoint,
  endPoint,
  direction,
  turnCoordinate,
}: BrokenLineProps) => {
  const { scale } = useSelector((state: RootState) => state.general);
  const xA = begPoint.coordinates.x * scale;
  const yA = begPoint.coordinates.y * scale;
  const xB = endPoint.coordinates.x * scale;
  const yB = endPoint.coordinates.y * scale;

  let x = turnCoordinate * scale;
  let y = yA;

  if (direction === "H") {
    return (
      <>
        <line x1={xA} x2={x} y1={yA} y2={y} width="2" stroke="var(--main)" />
        <line x1={x} y1={y} x2={x} y2={yB} width="2" stroke="var(--main)" />
        <line x1={x} y1={yB} x2={xB} y2={yB} width="2" stroke="var(--main)" />
      </>
    );
  }

  x = xA;
  y = turnCoordinate * scale;

  return (
    <>
      <line x1={xA} x2={x} y1={yA} y2={y} width="2" stroke="var(--main)" />
      <line x1={x} y1={y} x2={xB} y2={y} width="2" stroke="var(--main)" />
      <line x1={xB} y1={y} x2={xB} y2={yB} width="2" stroke="var(--main)" />
    </>
  );
};

export default BrokenLine;
