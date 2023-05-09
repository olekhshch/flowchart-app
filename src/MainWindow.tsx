import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

const MainWindow = () => {
  const {
    canvasSize,
    canvasCoordinates: { left, top },
  } = useSelector((state: RootState) => state.general);
  const canvasEl = useRef<HTMLCanvasElement>(null);

  const handleMouseDown = (ev: React.MouseEvent) => {
    const wholeBoard = document.getElementById("whole-board") as HTMLElement;
    const x0 = ev.clientX;
    const y0 = ev.clientY;
    canvasEl.current?.classList.add("grabbing");

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const dX = x - x0;
      const dY = y - y0;
      window.addEventListener("mouseup", () => {
        canvasEl.current?.classList.remove("grabbing");
        canvasEl.current?.classList.add("grab");
        window.removeEventListener("mousemove", handleMouseMove);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
  };

  return (
    <Viewport
      id="whole-board"
      onMouseDown={handleMouseDown}
      style={{ left, top }}
    >
      <canvas
        id="canvas"
        className="grab"
        ref={canvasEl}
        width={"100px"}
        height={canvasSize + "px"}
      ></canvas>
    </Viewport>
  );
};

const Viewport = styled.section`
  width: fit-content;

  #canvas {
    background-color: aliceblue;
  }

  .grab {
    cursor: grab;
  }

  .grabbing {
    cursor: grabbing;
  }
`;

export default MainWindow;
