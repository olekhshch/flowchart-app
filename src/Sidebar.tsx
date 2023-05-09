import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./app/store";
import { openSB, closeSB } from "./features/general/generalSlice";

const Sidebar = () => {
  const { isSBCollapsed } = useSelector((state: RootState) => state.general);
  const dispatch = useDispatch();

  if (isSBCollapsed) {
    return (
      <StyledSB>
        <div className="conteiner hide-animate">
          <button onClick={() => dispatch(openSB())}>Collapse SB</button>
          <section>Add elements</section>
          <section>Edit elements</section>
        </div>
        <Button onClick={() => dispatch(openSB())}>+</Button>
      </StyledSB>
    );
  }

  return (
    <StyledSB>
      <div className="conteiner show-animate">
        <button onClick={() => dispatch(closeSB())}>Collapse SB</button>
        <section>Add elements</section>
        <section>Edit elements</section>
      </div>
    </StyledSB>
  );
};

const StyledSB = styled.aside`
  .conteiner {
    padding: 40px 16px;
    position: absolute;
    z-index: 100;
    width: var(--sb-width);
    right: 0;
    top: 0;
    bottom: 0;

    background-color: var(--sb-bg);
    backdrop-filter: blur(10px);
    color: white;
  }

  @keyframes hide {
    from {
      right: 0;
    }
    to {
      right: calc(-1 * var(--sb-width) - 40px);
    }
  }

  @keyframes show {
    from {
      right: calc(-1 * var(--sb-width) - 40px);
    }
    to {
      right: 0;
    }
  }

  .hide-animate {
    animation: hide 1s forwards;
  }

  .show-animate {
    animation: show 1s forwards;
  }
`;

const Button = styled.button`
  position: absolute;
  display: flex;
  z-index: 100;
  right: 20px;
  bottom: 40px;
  background: none;
  width: 1.2em;
  height: 1.2em;
  font-size: 48px;
  opacity: 0;
  cursor: pointer;
  border-radius: 50%;
  animation: btnAppear 0.6s 0.8s forwards;
  justify-content: center;
  align-items: center;

  @keyframes btnAppear {
    from {
      opacity: 0;
      rotate: -45deg;
    }
    to {
      opacity: 0.3;
      rotate: 0;
    }
  }

  :hover {
    animation: from50to100opacity 0.4s forwards;
  }
`;

export default Sidebar;
