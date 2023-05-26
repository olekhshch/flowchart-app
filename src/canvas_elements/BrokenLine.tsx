import React, { MouseEventHandler } from "react";
import {
  BrokenLineDirection,
  ChartPoint,
} from "../features/elements/elementsTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setBrokenLineTurnCoord } from "../features/elements/elementsSlice";

export type BrokenLineProps = {
  begPoint: ChartPoint;
  endPoint: ChartPoint;
  direction: BrokenLineDirection;
  turnCoordinate: number;
  id: string;
};

const BrokenLine = ({
  begPoint,
  endPoint,
  direction,
  turnCoordinate,
  id,
}: BrokenLineProps) => {
  const { scale, canvasCoordinates } = useSelector(
    (state: RootState) => state.general
  );
  const handle = React.useRef<SVGLineElement>(null);

  const dispatch = useDispatch();
  const xA = begPoint.coordinates.x * scale;
  const yA = begPoint.coordinates.y * scale;
  const xB = endPoint.coordinates.x * scale;
  const yB = endPoint.coordinates.y * scale;

  let x = turnCoordinate * scale;
  let y = yA;

  const handleMouseDownV = (e: React.MouseEvent) => {
    const x0 = e.clientX;
    const handleMouseMove = (ev: MouseEvent) => {
      const x = (ev.clientX - canvasCoordinates.left) / scale;
      dispatch(setBrokenLineTurnCoord({ id, newCoord: x }));
      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", handleMouseMove);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseDownH = (e: React.MouseEvent) => {
    const y0 = e.clientY;
    const handleMouseMove = (ev: MouseEvent) => {
      const y = (ev.clientY - canvasCoordinates.top) / scale;
      dispatch(setBrokenLineTurnCoord({ id, newCoord: y }));
      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", handleMouseMove);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
  };

  if (direction === "V") {
    return (
      <>
        <line
          x1={xA}
          x2={x}
          y1={yA}
          y2={y}
          strokeWidth="2"
          stroke="var(--main)"
        />
        <line
          x1={x}
          y1={y}
          x2={x}
          y2={yB}
          strokeWidth="2"
          stroke="var(--main)"
          onMouseDown={handleMouseDownV}
          style={{ cursor: "col-resize" }}
          ref={handle}
        />
        <line
          x1={x}
          y1={yB}
          x2={xB}
          y2={yB}
          strokeWidth="2"
          stroke="var(--main)"
        />
      </>
    );
  }

  x = xA;
  y = turnCoordinate * scale;

  return (
    <>
      <line
        x1={xA}
        x2={x}
        y1={yA}
        y2={y}
        strokeWidth="2"
        stroke="var(--main)"
      />
      <line
        x1={x}
        y1={y}
        x2={xB}
        y2={y}
        strokeWidth="2"
        stroke="var(--main)"
        style={{ cursor: "row-resize" }}
        ref={handle}
        onMouseDown={handleMouseDownH}
      />
      <line
        x1={xB}
        y1={y}
        x2={xB}
        y2={yB}
        strokeWidth="2"
        stroke="var(--main)"
      />
    </>
  );
};

export default BrokenLine;
