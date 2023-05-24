import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import ConnectionMenu from "./menu/ConnectionMenu";

const Menu = () => {
  const { mode } = useSelector((state: RootState) => state.general);

  if (mode === "connect_points") {
    return <ConnectionMenu />;
  }

  return <></>;
};

export default Menu;
