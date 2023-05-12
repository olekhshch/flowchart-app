import React, { useRef } from "react";
import styled from "styled-components";
import CanvasElements from "./CanvasElements";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import {
  descreaseScale,
  increaseScale,
  setCanvasCoordinates,
} from "./features/general/generalSlice";
import CanvasBG from "./CanvasBG";

interface Canvas {
  canvasSize: number;
  coordinates: { left: number; top: number };
  scale: number;
}

const AppCanvas = () => {
  const dispatch = useDispatch();

  const canvasConteiner = useRef<HTMLDivElement>(null);

  const {
    canvasSize,
    canvasCoordinates: { left, top },
    scale,
    scaleValues,
  } = useSelector((state: RootState) => state.general);

  const getLowerScale = () => {
    const currentIndex = scaleValues.indexOf(scale);
    return currentIndex > 0 ? scaleValues[currentIndex - 1] : scaleValues[0];
  };

  const getHigherScale = () => {
    const currentIndex = scaleValues.indexOf(scale);
    return currentIndex < scaleValues.length - 1
      ? currentIndex + 1
      : currentIndex;
  };

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

  const zoomCanvas = (e: React.WheelEvent) => {
    const currentScale = scale;
    let nextScale: number;
    const currentTop = top;
    const currentLeft = left;
    const oX = e.clientX;
    const oY = e.clientY;
    if (e.deltaY > 0) {
      dispatch(descreaseScale());
    } else if (e.deltaY < 0) {
      dispatch(increaseScale());
    }
  };

  return (
    <CanvasConteiner
      ref={canvasConteiner}
      canvasSize={canvasSize}
      coordinates={{ left, top }}
      onMouseDown={handleMouseDown}
      scale={scale}
      onWheel={zoomCanvas}
    >
      <CanvasBG />
      <CanvasElements scale={scale} />
    </CanvasConteiner>
  );
};

export default AppCanvas;

const CanvasConteiner = styled.div<Canvas>`
  top: ${(props) => props.coordinates.top + "px"};
  left: ${(props) => props.coordinates.left + "px"};
  position: absolute;
  width: ${(props: Canvas) => props.canvasSize * props.scale}px;
  height: ${(props: Canvas) => props.canvasSize * props.scale}px;

  #canvas-bg {
    position: absolute;
    background-color: white;
  }

  .grab {
    cursor: grab;
  }
`;
