import React from "react";
import { ChartPoint } from "../features/elements/elementsSlice";
import styled from "styled-components";

interface CPProps {
  point: ChartPoint;
  scale: number;
}

interface styledProps {
  coordinates: { top: number; left: number };
  scale: number;
}

const ChartPointEl = ({ point, scale }: CPProps) => {
  const {
    coordinates: { x, y },
  } = point;

  const elCoord = {
    top: y - 3,
    left: x - 3,
  };
  return <Point coordinates={elCoord} scale={scale} />;
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
