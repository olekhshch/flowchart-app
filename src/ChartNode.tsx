import React from "react";
import {
  ChartNode,
  setNodeCoordinates,
} from "./features/elements/elementsSlice";
import styled from "styled-components";
import { useDispatch } from "react-redux";

interface ChartNodeProps {
  node: ChartNode;
}

interface StyledCompProps {
  top: number;
  left: number;
}

const ChartNodeEl = ({ node }: ChartNodeProps) => {
  const dispatch = useDispatch();

  const handleMouseDown = (ev: React.MouseEvent) => {
    const x0 = ev.clientX;
    const y0 = ev.clientY;
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const dX = x - x0;
      const dY = y - y0;
      const newLeft = node.coordinates.left + dX;
      const newTop = node.coordinates.top + dY;
      dispatch(setNodeCoordinates({ nodeId: node.id, newLeft, newTop }));
      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", handleMouseMove);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    ev.stopPropagation();
  };

  return (
    <StyledNode
      top={node.coordinates.top}
      left={node.coordinates.left}
      onMouseDown={handleMouseDown}
    >
      {node.title}
    </StyledNode>
  );
};

export default ChartNodeEl;

const StyledNode = styled.div`
  padding: 4px 10px;
  min-width: 100px;
  max-width: 140px;
  text-align: center;
  position: absolute;
  top: ${(props: StyledCompProps) => props.top}px;
  left: ${(props) => props.left}px;
  background-color: gray;
  cursor: default;
`;
