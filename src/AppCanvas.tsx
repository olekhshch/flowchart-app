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
import { clearSelection } from "./features/elements/elementsSlice";

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
  } = useSelector((state: RootState) => state.general);

  const handleMouseDown = (ev: React.MouseEvent) => {
    if (ev.button === 1) {
      const x0 = ev.clientX;
      const y0 = ev.clientY;
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        const dX = x - x0;
        const dY = y - y0;
        const newLeft0 = left + dX;
        const newTop0 = top + dY;
        const newValue = (value0: number) => {
          if (value0 <= -window.innerWidth * 0.7) {
            return (-window.innerWidth * 0.7) / scale;
          }
          if (value0 > 0) {
            return 0;
          }
          return value0;
        };
        dispatch(
          setCanvasCoordinates({
            newLeft: newValue(newLeft0),
            newTop: newValue(newTop0),
          })
        );
        const handleMouseUp = () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mousemove", handleMouseUp);
          window.removeEventListener("mouseup", handleMouseUp);
        };
        window.addEventListener("mouseup", handleMouseUp);
      };
      window.addEventListener("mousemove", handleMouseMove);
    }
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
