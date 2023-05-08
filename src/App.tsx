import React from "react";
import "./app.css";
import MainWindow from "./MainWindow";
import Minibar from "./Minibar";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const App = () => {
  return (
    <div>
      <MainSection>
        <MainWindow />
        <Minibar />
      </MainSection>
      <Sidebar />
    </div>
  );
};

const MainSection = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100 vw;
`;

export default App;
