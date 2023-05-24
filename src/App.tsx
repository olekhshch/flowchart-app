import React, { useState } from "react";
import "./app.css";
import Minibar from "./Minibar";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Viewport from "./Viewport";
import { MenuContext, MyContext } from "./context";
import Menu from "./Menu";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const contextObj: MyContext = {
    isMenuOpen,
    setIsMenuOpen,
  };

  return (
    <div>
      <MenuContext.Provider value={contextObj}>
        <MainSection>
          <Viewport />
          <Minibar />
        </MainSection>
        {isMenuOpen && <Menu />}
        <Sidebar />
      </MenuContext.Provider>
    </div>
  );
};

const MainSection = styled.main`
  position: relative;
  width: 100 vw;
  height: 100 vh;
`;

export default App;
