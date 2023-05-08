import React from "react";
import styled from "styled-components";

const MainWindow = () => {
  return <Viewport id="viewport">Canvas</Viewport>;
};

const Viewport = styled.section`
  height: 100vh;
`;

export default MainWindow;
