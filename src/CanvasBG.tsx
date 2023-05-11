import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import styled from "styled-components";

const CanvasBG = () => {
  const { canvasSize, scale, grid } = useSelector(
    (state: RootState) => state.general
  );

  const canvasBg = useRef(null);

  const clearBG = (canvasEl: HTMLCanvasElement) => {
    canvasEl
      .getContext("2d")!
      .clearRect(0, 0, canvasSize * scale, canvasSize * scale);
  };

  const drawGrid = (
    canvasEl: HTMLCanvasElement,
    step: number,
    scale: number
  ) => {
    clearBG(canvasEl);
    const a = canvasEl.width;
    const n = a / step;
    const c = canvasEl.getContext("2d")!;
    for (let i = 1; i < n; i++) {
      const pathH = new Path2D();
      pathH.moveTo(step * scale * i, 0);
      pathH.lineTo(step * scale * i, canvasSize * scale);
      c.stroke(pathH);

      const pathV = new Path2D();
      pathV.moveTo(0, i * step * scale);
      pathV.lineTo(a, i * step * scale);
      c.stroke(pathV);
    }
  };

  useEffect(() => {
    const bg = canvasBg.current! as HTMLCanvasElement;

    if (grid.isOn) {
      drawGrid(bg, grid.step, scale);
    } else {
      clearBG(bg);
    }
  }, [grid, scale]);
  return (
    <canvas
      ref={canvasBg}
      id="canvas-bg"
      width={canvasSize * scale}
      height={canvasSize * scale}
    />
  );
};

export default CanvasBG;

const Background = styled.canvas`
  position: absolute;
  background-color: white;
`;
