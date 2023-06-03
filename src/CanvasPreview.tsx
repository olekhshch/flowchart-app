import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./app/store";
import { addPoint } from "./features/elements/elementsSlice";
import { setMode } from "./features/general/generalSlice";

const CanvasPreview = () => {
  const {
    mode,
    scale,
    canvasSize,
    canvasCoordinates: { left, top },
  } = useSelector((state: RootState) => state.general);

  // const getScale = () => scale;
  // const getMode = () => mode;

  // const dispatch = useDispatch();

  // const canvasPreview = useRef<HTMLCanvasElement>(null)!;

  // const clearPreview = () => {
  //   const c = canvasPreview.current!.getContext("2d")!;
  //   c.clearRect(0, 0, canvasSize * scale, canvasSize * scale);
  // };

  // const getCanvasCoordinatesOfMouse = (e: MouseEvent) => {
  //   const x0 = e.clientX;
  //   const y0 = e.clientY;
  //   const x = (x0 - left) / scale;
  //   const y = (y0 - top) / scale;

  //   setMouseCoordinates({ x, y });
  //   // window.removeEventListener("mousemove", getCanvasCoordinatesOfMouse);
  // };

  // const elementsContainer = document.getElementById(
  //   "elements-container"
  // ) as HTMLDivElement;

  // const previewPoint = (e: MouseEvent) => {
  //   getCanvasCoordinatesOfMouse(e);
  //   const c = canvasPreview.current!.getContext("2d")!;
  //   clearPreview();
  //   c.beginPath();
  //   c.arc(
  //     scale * getMouseCoordinates().x,
  //     scale * getMouseCoordinates().y,
  //     2 * scale,
  //     0,
  //     2 * Math.PI
  //   );
  //   c.fillStyle = "orange";
  //   c.fill();
  //   // window.removeEventListener("mousemove", previewPoint);
  // };

  // // useEffect(() => {
  // //   console.log("mouse coord tracking");
  // //   window.addEventListener("mousemove", getCanvasCoordinatesOfMouse);
  // // });

  // const handleClick = (e: MouseEvent) => {
  //   const { top, left } = elementsContainer.getBoundingClientRect();
  //   console.log({ scale }, "click state");
  //   const x = (e.clientX - left) / scale;
  //   const y = (e.clientY - top) / scale;
  //   dispatch(addPoint(getMouseCoordinates()));
  //   dispatch(setMode("edit"));
  //   // elementsContainer.removeEventListener("click", handleClick);
  // };

  // useEffect(() => {
  //   if (mode === "set_point") {
  //     console.log(mode);
  //     window.addEventListener("mousemove", previewPoint);
  //     window.addEventListener("click", handleClick);
  //   } else {
  //     window.addEventListener("mousemove", getCanvasCoordinatesOfMouse);
  //   }

  //   return () => {
  //     // window.removeEventListener("mousemove", previewPoint);
  //     // window.removeEventListener("click", handleClick);
  //   };
  // });

  // // useEffect(() => {
  // //   if (mode === "set_point") {
  // //     console.log(mode);
  // //     elementsContainer.addEventListener("click", setPoint);
  // //   }
  // // });

  return (
    <canvas
      // ref={canvasPreview}
      id="canvas-preview"
      width={canvasSize * scale}
      height={canvasSize * scale}
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    ></canvas>
  );
};

export default CanvasPreview;
