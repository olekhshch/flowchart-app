import React from "react";
import styled from "styled-components";
import AppCanvas from "./AppCanvas";

const Viewport = () => {
  return (
    <StyledViewport>
      <AppCanvas />
    </StyledViewport>
  );
};

export default Viewport;

const StyledViewport = styled.section`
  background-color: aliceblue;
  height: 100vh;
`;
