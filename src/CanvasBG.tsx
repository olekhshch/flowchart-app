import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

const CanvasBG = () => {
  const {
    canvasSize,
    scale,
    grid,
    mode,
    canvasCoordinates: { left, top },
  } = useSelector((state: RootState) => state.general);

  const { node_size } = useSelector((state: RootState) => state.elements);

  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const canvasBg = useRef<HTMLCanvasElement>(null);

  const clearBG = (canvasEl: HTMLCanvasElement) => {
    canvasEl
      .getContext("2d")!
      .clearRect(0, 0, canvasSize * scale, canvasSize * scale);
  };

  const drawGrid = (canvasEl: HTMLCanvasElement) => {
    clearBG(canvasEl);
    const a = canvasEl.width;
    const n = a / grid.step;
    const c = canvasEl.getContext("2d")!;
    c.strokeStyle = "rgb(211, 198, 218)";
    for (let i = 1; i < n; i++) {
      const pathH = new Path2D();
      pathH.moveTo(grid.step * scale * i, 0);
      pathH.lineTo(grid.step * scale * i, canvasSize * scale);
      c.stroke(pathH);

      const pathV = new Path2D();
      pathV.moveTo(0, i * grid.step * scale);
      pathV.lineTo(a, i * grid.step * scale);
      c.stroke(pathV);
    }
  };

  const getCanvasCoordinatesOfMouse = (e: MouseEvent) => {
    const x0 = e.clientX;
    const y0 = e.clientY;
    const x = (x0 - left) / scale;
    const y = (y0 - top) / scale;

    setMouseCoordinates({ x, y });
    window.removeEventListener("mousemove", getCanvasCoordinatesOfMouse);
  };

  const previewNode = (e: MouseEvent) => {
    getCanvasCoordinatesOfMouse(e);
    const c = canvasBg.current!.getContext("2d")!;
    clearBG(canvasBg.current!);
    if (grid.isOn) {
      drawGrid(canvasBg.current!);
    }
    c.beginPath();
    c.moveTo(
      scale * (mouseCoordinates.x - node_size.w / 2),
      scale * (mouseCoordinates.y - node_size.h / 2)
    );
    c.lineTo(
      scale * (mouseCoordinates.x + node_size.w / 2),
      scale * (mouseCoordinates.y - node_size.h / 2)
    );
    c.lineTo(
      scale * (mouseCoordinates.x + node_size.w / 2),
      scale * (mouseCoordinates.y + node_size.h / 2)
    );
    c.lineTo(
      scale * (mouseCoordinates.x - node_size.w / 2),
      scale * (mouseCoordinates.y + node_size.h / 2)
    );
    c.closePath();
    c.strokeStyle = "orange";
    c.stroke();
    window.removeEventListener("mousemove", previewNode);
  };

  const previewPoint = (e: MouseEvent) => {
    getCanvasCoordinatesOfMouse(e);
    const c = canvasBg.current!.getContext("2d")!;
    clearBG(canvasBg.current!);
    if (grid.isOn) {
      drawGrid(canvasBg.current!);
    }
    c.beginPath();
    c.arc(
      scale * mouseCoordinates.x,
      scale * mouseCoordinates.y,
      2 * scale,
      0,
      2 * Math.PI
    );
    c.fillStyle = "orange";
    c.fill();
    window.removeEventListener("mousemove", previewPoint);
  };

  const previewTextLine = (e: MouseEvent) => {
    getCanvasCoordinatesOfMouse(e);
    const c = canvasBg.current!.getContext("2d")!;
    clearBG(canvasBg.current!);
    if (grid.isOn) {
      drawGrid(canvasBg.current!);
    }
    c.beginPath();
    c.moveTo(scale * mouseCoordinates.x, scale * mouseCoordinates.y);
    c.lineTo(scale * (mouseCoordinates.x + 40), scale * mouseCoordinates.y);
    c.lineTo(
      scale * (mouseCoordinates.x + 40),
      scale * (mouseCoordinates.y + 20)
    );
    c.lineTo(scale * mouseCoordinates.x, scale * (mouseCoordinates.y + 20));
    c.closePath();
    c.strokeStyle = "orange";
    c.stroke();
    window.removeEventListener("mousemove", previewTextLine);
  };

  useEffect(() => {
    const bg = canvasBg.current! as HTMLCanvasElement;

    if (grid.isOn) {
      drawGrid(bg);
    } else {
      clearBG(bg);
    }
  }, [grid, scale, mode]);

  useEffect(() => {
    if (mode === "set_point") {
      window.addEventListener("mousemove", previewPoint);
    } else if (mode === "set_node") {
      window.addEventListener("mousemove", previewNode);
    } else if (mode === "set_textline") {
      window.addEventListener("mousemove", previewTextLine);
    } else {
      window.addEventListener("mousemove", getCanvasCoordinatesOfMouse);
    }
  });

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
