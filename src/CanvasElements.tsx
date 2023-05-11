import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "./app/store";
import ChartNodeEl from "./ChartNode";

const CanvasElements = () => {
  const { elements } = useSelector((state: RootState) => state.elements);
  return (
    <ElementsConteiner>
      {elements.map((element) => {
        if (element.type === "node") {
          return <ChartNodeEl key={element.id} node={element} />;
        }
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
`;
