import React, { useState } from "react";
import "./app.css";
import Minibar from "./Minibar";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Viewport from "./Viewport";
import { MenuContext, MyContext } from "./context";
import Menu from "./Menu";
import { TypeOfElement } from "./features/elements/elementsTypes";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOnly, setSelectedOnly] = useState<TypeOfElement | null>(null);
  const contextObj: MyContext = {
    isMenuOpen,
    setIsMenuOpen,
    selectedOnly,
    setSelectedOnly,
  };
  const { selectedIds } = useSelector((state: RootState) => state.elements);
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
