import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "./app/store";
import { setMode, toggleGrid } from "./features/general/generalSlice";

const Minibar = () => {
  const dispatch = useDispatch();
  const { scale, mode, minibarMessage } = useSelector(
    (state: RootState) => state.general
  );
  return (
    <StyledMinibar>
      <div className="btns-container">
        <button
          className="btn"
          title="Show/hide grid"
          onClick={() => dispatch(toggleGrid())}
        >
          #
        </button>
        <button
          className="btn"
          title="View/edit mode"
          onClick={() => {
            if (mode === "view") {
              dispatch(setMode("edit"));
            } else {
              dispatch(setMode("view"));
            }
          }}
        >
          .
        </button>
      </div>
      <span>{minibarMessage}</span>
      <div className="scale-info">Scale: {scale}</div>
    </StyledMinibar>
  );
};

const StyledMinibar = styled.section`
  position: absolute;
  display: flex;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--main);
  color: white;
  height: 1.4em;

  div {
    margin: 0 8px;
    display: flex;
  }

  @keyframes btnOnHover {
    from {
      background-color: var(--btn-mb-0);
    }
    to {
      background-color: var(--btn-mb-1);
    }
  }

  .btn {
    border: none;
    padding: 0 2px;
    background: var(--btn-mb-0);
    color: white;
    cursor: pointer;
  }

  .btn:hover {
    animation: btnOnHover 0.4s forwards;
  }

  .scale-info {
    position: absolute;
    bottom: 20px;
    font-size: 14px;
    color: var(--main);
    user-select: none;
  }

  span {
    margin: 0 6px;
    font-weight: lighter;
  }
`;

export default Minibar;
