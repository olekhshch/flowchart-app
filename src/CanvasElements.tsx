import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "./app/store";
import ChartNodeEl from "./ChartNode";
import type { ChartNode } from "./features/elements/elementsSlice";

const CanvasElements = (props: { scale: number }) => {
  const { elements } = useSelector((state: RootState) => state.elements);
  const chartNodeElements = elements.filter(
    (element) => element.type === "node"
  ) as ChartNode[];
  return (
    <ElementsConteiner>
      {chartNodeElements.map((element) => {
        return (
          <ChartNodeEl key={element.id} node={element} scale={props.scale} />
        );
      })}
    </ElementsConteiner>
  );
};

export default CanvasElements;

const ElementsConteiner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  cursor: grab;
  user-select: none;
  overflow: hidden;
`;
