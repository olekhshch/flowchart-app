import React from "react";
import styled from "styled-components";

const CanvasElements = () => {
  return <ElementsConteiner>Elements</ElementsConteiner>;
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
