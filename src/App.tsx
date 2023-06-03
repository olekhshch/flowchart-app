import React, { useState } from "react";
import "./app.css";
import Minibar from "./Minibar";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Viewport from "./Viewport";

import Menu from "./Menu";
import { TypeOfElement } from "./features/elements/elementsTypes";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { MenuCntxType, MenuContext } from "./menuContext";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOnly, setSelectedOnly] = useState<`${TypeOfElement}s` | null>(
    null
  );
  const contextObj: MenuCntxType = {
    isMenuOpen,
    setIsMenuOpen,
    selectedOnly,
    setSelectedOnly,
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
