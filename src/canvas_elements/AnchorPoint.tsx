import React from "react";
import styled from "styled-components";
import { APoint, ChartNode } from "../features/elements/elementsTypes";
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
  coordinates: { top: string; left: string };
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

  const pointCoordinates = { top: 0, left: 0 };
  switch (position) {
    case "top":
      pointCoordinates.top = coordinates.top - 2;
      pointCoordinates.left = coordinates.left + w * 0.5 - 2;
      break;
    case "right":
      pointCoordinates.top = coordinates.top + 0.5 * h - 1 * scale;
      pointCoordinates.left = coordinates.left + w - 2;
      break;
    case "bottom":
      pointCoordinates.top = coordinates.top + h - 2;
      pointCoordinates.left = coordinates.left + 0.5 * w - 2;
      break;
    case "left":
      pointCoordinates.top = coordinates.top + 0.5 * h - 1 * scale;
      pointCoordinates.left = coordinates.left - 2;
  }

  const handleClick = () => {
    if (mode === "connect_points") {
      dispatch(addToDraft([parent.id, "anchor_point", point.position]));
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
