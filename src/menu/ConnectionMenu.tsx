import React from "react";
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
    <div>
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
    </div>
  );
};

export default ConnectionMenu;
