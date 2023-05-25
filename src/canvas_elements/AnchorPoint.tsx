import React from "react";
import styled from "styled-components";
import {
  APoint,
  ChartNode,
  PointCoordinates,
} from "../features/elements/elementsTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import ChartPointEl from "./ChartPoint";
import { Point } from "./ChartPoint";
import {
  addToDraft,
  clearDraft,
  connectTwoPoints,
} from "../features/elements/elementsSlice";
import { setMode } from "../features/general/generalSlice";

interface APProps {
  point: APoint;
  parent: ChartNode;
}

interface styledProps {
  coordinates: PointCoordinates;
}

const AnchorPoint = ({ point, parent }: APProps) => {
  const {
    node_size: { w, h },
    draft,
  } = useSelector((state: RootState) => state.elements);
  const { scale, mode } = useSelector((state: RootState) => state.general);
  const { coordinates } = parent;
  const { position } = point;

  const dispatch = useDispatch();

  const pointCoordinates: PointCoordinates = { y: 0, x: 0 };
  switch (position) {
    case "top":
      pointCoordinates.y = coordinates.top - 2;
      pointCoordinates.x = coordinates.left + w * 0.5 - 2;
      break;
    case "right":
      pointCoordinates.y = coordinates.top + 0.5 * h - 1 * scale;
      pointCoordinates.x = coordinates.left + w - 2;
      break;
    case "bottom":
      pointCoordinates.y = coordinates.top + h - 2;
      pointCoordinates.x = coordinates.left + 0.5 * w - 2;
      break;
    case "left":
      pointCoordinates.y = coordinates.top + 0.5 * h - 1 * scale;
      pointCoordinates.x = coordinates.left - 2;
  }

  const handleClick = () => {
    if (mode === "connect_points") {
      dispatch(
        addToDraft([
          parent.id,
          "anchor_point",
          pointCoordinates,
          point.position,
        ])
      );
      if (draft.length === 1) {
        dispatch(setMode("edit"));
        dispatch(connectTwoPoints());
        dispatch(clearDraft());
      }
    }
  };

  return (
    <Point coordinates={pointCoordinates} scale={scale} onClick={handleClick} />
  );
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
