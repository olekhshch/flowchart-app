import React from "react";
import styled from "styled-components";
import CanvasElements from "./CanvasElements";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { setCanvasCoordinates } from "./features/general/generalSlice";

interface Canvas {
  canvasSize: number;
  coordinates: { left: number; top: number };
}

const AppCanvas = () => {
  const dispatch = useDispatch();

  const {
    canvasSize,
    canvasCoordinates: { left, top },
  } = useSelector((state: RootState) => state.general);

  const handleMouseDown = (ev: React.MouseEvent) => {
    const x0 = ev.clientX;
    const y0 = ev.clientY;
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const dX = x - x0;
      const dY = y - y0;
      const newLeft = left + dX;
      const newTop = top + dY;
      dispatch(setCanvasCoordinates({ newLeft, newTop }));
      window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", handleMouseMove);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
  };

  return (
    <CanvasConteiner
      canvasSize={canvasSize}
      coordinates={{ left, top }}
      onMouseDown={handleMouseDown}
    >
      <canvas id="canvas-bg" width={canvasSize} height={canvasSize} />
      <CanvasElements />
    </CanvasConteiner>
  );
};

export default AppCanvas;

const CanvasConteiner = styled.div`
  position: absolute;
  top: ${(props) => props.coordinates.top}px;
  left: ${(props) => props.coordinates.left}px;
  width: ${(props: Canvas) => props.canvasSize}px;
  height: ${(props: Canvas) => props.canvasSize}px;

  #canvas-bg {
    position: absolute;
    background-color: white;
  }

  .grab {
    cursor: grab;
  }
`;
