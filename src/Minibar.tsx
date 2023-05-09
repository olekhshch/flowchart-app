import React from "react";
import styled from "styled-components";

const Minibar = () => {
  return <StyledMinibar>Minibar</StyledMinibar>;
};

const StyledMinibar = styled.section`
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--main);
  color: white;
  height: 1.4em;
`;

export default Minibar;
