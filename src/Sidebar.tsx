import React, { useContext } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./app/store";
import {
  openSB,
  closeSB,
  setMode,
  setMinibarMsg,
} from "./features/general/generalSlice";
import {
  addCircle,
  addLine,
  addPointByClick,
  addNode,
  addPointByCoordinates,
  addTextLine,
  addTriangle,
  clearSelection,
} from "./features/elements/elementsSlice";
import { MenuContext } from "./menuContext";
import { minibarMsg } from "./features/general/minibarMsgs";
import NodeIcon from "./icons/NodeIcon";
import CircleIcon from "./icons/CircleIcon";
import LineIcon from "./icons/LineIcon";
import TriangleIcon from "./icons/TriangleIcon";
import ConnectionIcon from "./icons/ConnectionIcon";

type PointDraft = {
  id: string;
  coordinates: { x: number; y: number };
  appliedScale: number;
};

const Sidebar = () => {
  const { setIsMenuOpen } = useContext(MenuContext);
  const { isSBCollapsed, scale } = useSelector(
    (state: RootState) => state.general
  );
  const { lastId, node_size } = useSelector(
    (state: RootState) => state.elements
  );
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

  const addNodeMode = () => {
    // const elementsContainer = document.getElementById(
    //   "elements-container"
    // ) as HTMLDivElement;
    dispatch(setMode("set_node"));
    setIsMenuOpen(false);
    // dispatch(clearSelection());
    // const { top, left } = elementsContainer.getBoundingClientRect();
    // const handleClick = (e: MouseEvent) => {
    //   const x0 = e.clientX;
    //   const y0 = e.clientY;
    //   const x = (x0 - left) / scale - 0.5 * node_size.w;
    //   const y = (y0 - top) / scale - 0.5 * node_size.h;
    //   dispatch(addNode({ left: x, top: y }));
    //   dispatch(setMode("edit"));

    //   elementsContainer.removeEventListener("click", handleClick);
    // };
    // elementsContainer.addEventListener("click", handleClick);
  };

  const addPointMode = () => {
    dispatch(setMode("set_point"));
    // const handleClick = (e: MouseEvent) => {
    //   dispatch(addPointByClick());
    //   dispatch(setMode("edit"));
    //   elementsContainer.removeEventListener("click", handleClick);
    // };
    // elementsContainer.addEventListener("click", handleClick);
  };

  const addLineMode = () => {
    dispatch(setMode("set_line"));
    // const elementsContainer = document.getElementById(
    //   "elements-container"
    // ) as HTMLDivElement;
    // const { top, left } = elementsContainer.getBoundingClientRect();
    // const draft: PointDraft[] = [];
    // const handleFirstClick = (e: MouseEvent) => {
    //   const scale1 = scale;
    //   const begginingPoint: PointDraft = {
    //     id: (lastId + 1).toString(),
    //     coordinates: { x: e.clientX - left, y: e.clientY - top },
    //     appliedScale: scale1,
    //   };
    //   draft[0] = begginingPoint;

    //   const handleSecondClick = (ev: MouseEvent) => {
    //     const scale2 = scale;
    //     const { top, left } = elementsContainer.getBoundingClientRect();
    //     const endPoint: PointDraft = {
    //       id: (lastId + 2).toString(),
    //       coordinates: { x: ev.clientX - left, y: ev.clientY - top },
    //       appliedScale: scale2,
    //     };
    //     draft[1] = endPoint;
    //     draft.map((pointDraft) =>
    //       dispatch(
    //         addPointByCoordinates({
    //           x: pointDraft.coordinates.x / pointDraft.appliedScale,
    //           y: pointDraft.coordinates.y / pointDraft.appliedScale,
    //         })
    //       )
    //     );
    //     dispatch(
    //       addLine({
    //         beginningPointId: (lastId + 1).toString(),
    //         endPointId: (lastId + 2).toString(),
    //         colour: "red",
    //       })
    //     );
    //     elementsContainer.removeEventListener("click", handleSecondClick);
    //   };
    //   elementsContainer.addEventListener("click", handleSecondClick);
    //   elementsContainer.removeEventListener("click", handleFirstClick);
    // };
    // elementsContainer.addEventListener("click", handleFirstClick);
  };

  const connectPointsMode = () => {
    setIsMenuOpen(true);
    dispatch(setMode("connect_points"));
  };

  const createCircleMode = () => {
    dispatch(setMode("set_circle"));
    setIsMenuOpen(false);
    // const elementsContainer = document.getElementById(
    //   "elements-container"
    // ) as HTMLDivElement;
    // const handleClick = (e: MouseEvent) => {
    //   const pointId = lastId + 1;
    //   dispatch(addPointByClick());
    //   dispatch(addCircle(pointId.toString()));
    //   dispatch(setMode("edit"));
    //   elementsContainer.removeEventListener("click", handleClick);
    // };
    // elementsContainer.addEventListener("click", handleClick);
  };

  const addTextLineMode = () => {
    // const elementsContainer = document.getElementById(
    //   "elements-container"
    // ) as HTMLDivElement;
    dispatch(setMode("set_textline"));
    setIsMenuOpen(false);
    // const { top, left } = elementsContainer.getBoundingClientRect();
    // const handleClick = (e: MouseEvent) => {
    //   const x0 = e.clientX;
    //   const y0 = e.clientY;
    //   const x = (x0 - left) / scale;
    //   const y = (y0 - top) / scale;
    //   dispatch(addTextLine({ x, y }));
    //   dispatch(setMode("edit"));
    //   elementsContainer.removeEventListener("click", handleClick);
    // };
    // elementsContainer.addEventListener("click", handleClick);
  };

  const createTriangleMode = () => {
    dispatch(setMode("set_triangle"));
    setIsMenuOpen(true);
    // const elementsContainer = document.getElementById(
    //   "elements-container"
    // ) as HTMLDivElement;
    // const { top, left } = elementsContainer.getBoundingClientRect();
    // const handleClick = (e: MouseEvent) => {
    //   const pointId = lastId + 1;
    //   dispatch(addPointByClick());
    //   dispatch(addTriangle(pointId.toString()));
    //   dispatch(setMode("edit"));
    //   elementsContainer.removeEventListener("click", handleClick);
    // };
    // elementsContainer.addEventListener("click", handleClick);
  };

  return (
    <StyledSB onMouseOver={() => dispatch(setMinibarMsg(minibarMsg.Empty))}>
      <div className="conteiner show-animate">
        <button onClick={() => dispatch(closeSB())}>Collapse SB</button>
        <section className="sb-section">
          <h3>Flowchart elements</h3>
          <ul>
            <li onClick={addNodeMode}>
              <NodeIcon colour="white" iconSize={32} isTextLabel={false} />
              <span className="sb-list-text">Node</span>
            </li>
            <li onClick={connectPointsMode}>
              <ConnectionIcon colour="white" iconSize={32} />
              <span className="sb-list-text">Connection</span>
            </li>
            <li onClick={createCircleMode}>
              <CircleIcon colour="white" iconSize={32} isPoint={false} />
              <span className="sb-list-text">Circle</span>
            </li>
            <li onClick={createTriangleMode}>
              <TriangleIcon colour="white" iconSize={32} />
              <span className="sb-list-text">Triangle</span>
            </li>
            <li onClick={addLineMode}>
              <LineIcon colour="white" iconSize={32} />
              <span className="sb-list-text">Line</span>
            </li>
            <li onClick={addPointMode}>
              <CircleIcon colour="white" iconSize={32} isPoint={true} />
              <span className="sb-list-text">Point</span>
            </li>
            <li onClick={addTextLineMode}>
              <NodeIcon colour="white" iconSize={32} isTextLabel={true} />
              <span className="sb-list-text">Text label</span>
            </li>
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
    margin-top: 1em;
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

  /* .icon {
    transform: translateY(2px);
  } */

  li {
    display: flex;
    gap: 2px;
  }

  .sb-list-text {
    margin: auto 0;
  }
`;

const Button = styled.button`
  position: absolute;
  display: flex;
  z-index: 100;
  right: 20px;
  top: 40px;
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
