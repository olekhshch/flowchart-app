import React from "react";
import styled from "styled-components";
import { APoint, ChartNode } from "../features/elements/elementsTypes";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ChartPointEl from "./ChartPoint";
import { Point } from "./ChartPoint";

interface APProps {
  point: APoint;
  parent: ChartNode;
}

interface styledProps {
  coordinates: { top: string; left: string };
}

const AnchorPoint = ({ point, parent }: APProps) => {
  const { w, h } = useSelector((state: RootState) => state.elements.node_size);
  const { scale } = useSelector((state: RootState) => state.general);
  const { coordinates } = parent;
  const { position } = point;

  const pointCoordinates = { top: 0, left: 0 };
  switch (position) {
    case "top":
      pointCoordinates.top = coordinates.top - 1 * scale;
      pointCoordinates.left = coordinates.left + 0.5 * w;
  }

  // const coord = { top: "", left: "" };
  // switch (position) {
  //   case "top":
  //     coord.top = "-3px";
  //     coord.left = "50% - 3px";
  //     break;
  //   case "right":
  //     coord.top = "50% - 3px";
  //     coord.left = "100% - 3px";
  //     break;
  //   case "bottom":
  //     coord.top = "100% - 3px";
  //     coord.left = "50% - 3px";
  //     break;
  //   case "left":
  //     coord.top = "50% - 3px";
  //     coord.left = "-3px";
  // }
  // return <Point coordinates={coord} onMouseDown={(e) => e.stopPropagation()} />;
  return <Point coordinates={pointCoordinates} scale={scale} />;
};

export default AnchorPoint;

// const Point = styled.div`
//   position: absolute;
//   left: calc(${(props: styledProps) => props.coordinates.left});
//   top: calc(${(props: styledProps) => props.coordinates.top});
//   width: 6px;
//   height: 6px;
//   background-color: white;
//   border-radius: 50%;
//   cursor: default;

//   :hover {
//     box-shadow: 0 0 3px black;
//   }
// `;
