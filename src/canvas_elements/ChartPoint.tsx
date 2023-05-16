import React from "react";
import {
  ChartPoint,
  setPointCoordinates,
} from "../features/elements/elementsSlice";
import styled from "styled-components";
import { useDispatch } from "react-redux";

interface CPProps {
  point: ChartPoint;
  scale: number;
}

interface styledProps {
  coordinates: { top: number; left: number };
  scale: number;
}

const ChartPointEl = ({ point, scale }: CPProps) => {
  const dispatch = useDispatch();

  const {
    coordinates: { x, y },
  } = point;

  const elCoord = {
    top: y - 3,
    left: x - 3,
  };

  const handleMouseDown = (ev: React.MouseEvent) => {
    const x0 = ev.clientX;
    const y0 = ev.clientY;
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const dX = x - x0;
      const dY = y - y0;
      const newX = point.coordinates.x + dX / scale;
      const newY = point.coordinates.y + dY / scale;
      dispatch(
        setPointCoordinates({
          pointId: point.id,
          coordinates: { newX, newY },
        })
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", handleMouseMove);
    });
    ev.stopPropagation();
  };
  return (
    <Point coordinates={elCoord} scale={scale} onMouseDown={handleMouseDown} />
  );
};

export default ChartPointEl;

const Point = styled.div`
  position: absolute;
  left: ${(props: styledProps) => props.coordinates.left * props.scale}px;
  top: ${(props: styledProps) => props.coordinates.top * props.scale}px;
  width: ${(props) => props.scale * 6}px;
  height: ${(props) => props.scale * 6}px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 50%;
  cursor: default;

  :hover {
    box-shadow: 0 0 3px black;
  }
`;
