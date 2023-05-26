import React, { useContext } from "react";
import styled from "styled-components";
import { MenuContext } from "../context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  setConnectionDirection,
  setConnectionType,
} from "../features/elements/elementsSlice";
import { BrokenLineDirection } from "../features/elements/elementsTypes";

const ConnectionMenu = () => {
  const { connection_type, connection_dir } = useSelector(
    (state: RootState) => state.elements
  );
  const dispatch = useDispatch();

  const setConnDir = (newDir: BrokenLineDirection) => {
    dispatch(setConnectionDirection(newDir));
  };

  return (
    <MenuStyled>
      <h4>Connection type</h4>
      <ul>
        <li
          onClick={() => dispatch(setConnectionType("straight"))}
          className={connection_type === "straight" ? "list bold" : "list"}
        >
          Straight line
        </li>
        <li
          onClick={() => dispatch(setConnectionType("broken"))}
          className={connection_type === "broken" ? "list bold" : "list"}
        >
          Broken line
        </li>
      </ul>
      {connection_type === "broken" && (
        <p>
          Direction:{" "}
          <button
            className={connection_dir === "H" ? "bold" : ""}
            onClick={() => setConnDir("H")}
          >
            H
          </button>
          |
          <button
            className={connection_dir === "V" ? "bold" : ""}
            onClick={() => setConnDir("V")}
          >
            V
          </button>
        </p>
      )}
    </MenuStyled>
  );
};

export default ConnectionMenu;

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
