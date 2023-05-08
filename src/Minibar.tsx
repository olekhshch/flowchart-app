import React from "react";
import styled from "styled-components";

const Minibar = () => {
  return <StyledMinibar>Minibar</StyledMinibar>;
};

const StyledMinibar = styled.section`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--main);
  color: white;
  height: 1.4em;
`;

export default Minibar;
