import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./app/store";
import { openSB, closeSB, setMode } from "./features/general/generalSlice";
import {
  addLine,
  addNode,
  addPoint,
  addTextLine,
  connectTwoPoints,
} from "./features/elements/elementsSlice";
import { connect } from "http2";

type PointDraft = {
  id: string;
  coordinates: { x: number; y: number };
  appliedScale: number;
};

const Sidebar = () => {
  const { isSBCollapsed, scale } = useSelector(
    (state: RootState) => state.general
  );
  const { lastId } = useSelector((state: RootState) => state.elements);
  const dispatch = useDispatch();

  if (isSBCollapsed) {
    return (
      <StyledSB>
        <div className="conteiner hide-animate">
          <button onClick={() => dispatch(openSB())}>Collapse SB</button>
        </div>
        <Button onClick={() => dispatch(openSB())}>+</Button>
      </StyledSB>
    );
  }

  const addPointMode = () => {
    const elementsContainer = document.getElementById(
      "elements-container"
    ) as HTMLDivElement;
    dispatch(setMode("set_point"));
    const { top, left } = elementsContainer.getBoundingClientRect();
    const handleClick = (e: MouseEvent) => {
      const x0 = e.clientX;
      const y0 = e.clientY;
      const x = (x0 - left) / scale;
      const y = (y0 - top) / scale;
      dispatch(addPoint({ x, y }));
      dispatch(setMode("edit"));
      elementsContainer.removeEventListener("click", handleClick);
    };
    elementsContainer.addEventListener("click", handleClick);
  };

  const addLineMode = () => {
    const elementsContainer = document.getElementById(
      "elements-container"
    ) as HTMLDivElement;
    const { top, left } = elementsContainer.getBoundingClientRect();
    const draft: PointDraft[] = [];
    const handleFirstClick = (e: MouseEvent) => {
      const scale1 = scale;
      const begginingPoint: PointDraft = {
        id: (lastId + 1).toString(),
        coordinates: { x: e.clientX - left, y: e.clientY - top },
        appliedScale: scale1,
      };
      draft[0] = begginingPoint;

      const handleSecondClick = (ev: MouseEvent) => {
        const scale2 = scale;
        const { top, left } = elementsContainer.getBoundingClientRect();
        const endPoint: PointDraft = {
          id: (lastId + 2).toString(),
          coordinates: { x: ev.clientX - left, y: ev.clientY - top },
          appliedScale: scale2,
        };
        draft[1] = endPoint;
        draft.map((pointDraft) =>
          dispatch(
            addPoint({
              x: pointDraft.coordinates.x / pointDraft.appliedScale,
              y: pointDraft.coordinates.y / pointDraft.appliedScale,
            })
          )
        );
        dispatch(
          addLine({
            beginningPointId: (lastId + 1).toString(),
            endPointId: (lastId + 2).toString(),
            colour: "red",
          })
        );
        elementsContainer.removeEventListener("click", handleSecondClick);
      };
      elementsContainer.addEventListener("click", handleSecondClick);
      elementsContainer.removeEventListener("click", handleFirstClick);
    };
    elementsContainer.addEventListener("click", handleFirstClick);
  };

  const connectPointsMode = () => {
    dispatch(setMode("connect_points"));
  };

  const addTextLineMode = () => {
    const elementsContainer = document.getElementById(
      "elements-container"
    ) as HTMLDivElement;
    const { top, left } = elementsContainer.getBoundingClientRect();
    const handleClick = (e: MouseEvent) => {
      const x0 = e.clientX;
      const y0 = e.clientY;
      const x = (x0 - left) / scale;
      const y = (y0 - top) / scale;
      dispatch(addTextLine({ x, y }));
      elementsContainer.removeEventListener("click", handleClick);
    };
    elementsContainer.addEventListener("click", handleClick);
  };

  return (
    <StyledSB>
      <div className="conteiner show-animate">
        <button onClick={() => dispatch(closeSB())}>Collapse SB</button>
        <section className="sb-section">
          <h3>Flowchart elements</h3>
          <ul>
            <li onClick={() => dispatch(addNode())}>Node</li>
            <li onClick={connectPointsMode}>Connection</li>
          </ul>
        </section>
        <section className="sb-section">
          <h3>Shapes</h3>
          <ul>
            <li onClick={addLineMode}>Line</li>
            <li onClick={addPointMode}>Point</li>
          </ul>
        </section>
        <section className="sb-section">
          <h3>Text elements</h3>
          <ul>
            <li onClick={addTextLineMode}>Text line</li>
            <li>Text block</li>
          </ul>
        </section>
        <section className="sb-section">
          <h3>Edit elements</h3>
        </section>
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

  .sb-section h3 {
    font-weight: normal;
    border-bottom: 1px solid white;
  }

  .sb-section li:hover {
    cursor: pointer;
    text-shadow: 0 0 5px white;
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
