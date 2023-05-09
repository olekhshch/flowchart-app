import React from "react";
import "./app.css";
import Minibar from "./Minibar";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Viewport from "./Viewport";

const App = () => {
  return (
    <div>
      <MainSection>
        <Viewport />
        <Minibar />
      </MainSection>
      <Sidebar />
    </div>
  );
};

const MainSection = styled.main`
  position: relative;
  width: 100 vw;
  height: 100 vh;
`;

export default App;
