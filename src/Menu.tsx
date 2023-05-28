import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import ConnectionMenu from "./menu/ConnectionMenu";
import GlobalSelectionMenu, { MyCountType } from "./menu/GlobalSelectionMenu";
import styled from "styled-components";

const Menu = () => {
  const { mode } = useSelector((state: RootState) => state.general);
  const { selectedIds } = useSelector((state: RootState) => state.elements);

  if (mode === "connect_points") {
    return (
      <MenuStyled>
        <ConnectionMenu />
      </MenuStyled>
    );
  }

  const selectedEntries = Object.entries(selectedIds);

  let countAcc: MyCountType = { overalNumber: 0 };

  const selectedCount = selectedEntries.reduce((acc, entry) => {
    const [key, array] = entry;
    const number = array.length;
    return { ...acc, [key]: number, overalNumber: acc.overalNumber + number };
  }, countAcc);

  // console.log(selectedCount);

  if (selectedCount.overalNumber !== 0) {
    return (
      <MenuStyled>
        <GlobalSelectionMenu selectedCount={selectedCount} />
      </MenuStyled>
    );
  }

  return <></>;
};

export default Menu;

const MenuStyled = styled.section`
  position: absolute;
  padding: 10px;
  top: 10px;
  left: 10px;
  z-index: 1000;
  min-height: 40px;
  min-width: 100px;

  background-color: var(--sb-bg);
  backdrop-filter: blur(10px);
  color: white;
  border-radius: 8px;

  h4 {
    border-bottom: 1px solid white;
  }

  .list {
    cursor: pointer;
  }

  .list:hover,
  .list-selected:hover {
    text-shadow: 0 0 10px white;
  }

  .bold {
    font-weight: bold;
  }

  p,
  button {
    font-weight: lighter;
  }

  button {
    background: none;
    padding: 2px;
    color: white;
    border: none;
  }
`;
