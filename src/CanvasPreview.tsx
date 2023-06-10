import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./app/store";
import { setMouseCoordinates } from "./features/elements/elementsSlice";
import { setMode } from "./features/general/generalSlice";
import { moveSelectedMouseMove } from "./functions/moveSelectedMouseMove";

const CanvasPreview = () => {
  const {
    mode,
    scale,
    canvasSize,
    canvasCoordinates: { left, top },
  } = useSelector((state: RootState) => state.general);

  const { mouseCoordinates, node_size, isFirstClicked, originPoint } =
    useSelector((state: RootState) => state.elements);

  const dispatch = useDispatch();

  const canvasPreview = useRef<HTMLCanvasElement>(null)!;

  const clearPreview = () => {
    const c = canvasPreview.current!.getContext("2d")!;
    c.clearRect(0, 0, canvasSize * scale, canvasSize * scale);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const x0 = e.clientX;
    const y0 = e.clientY;
    const x = (x0 - left) / scale;
    const y = (y0 - top) / scale;

    dispatch(setMouseCoordinates({ x, y }));

    if (mode === "set_point") {
      previewPoint();
    } else if (mode === "set_node") {
      previewNode();
    } else if (mode === "set_textline") {
      previewTextLine();
    } else if (mode === "set_circle") {
      previewCircle();
    } else if (mode === "set_line") {
      previewLine();
    }
    // } else if (mode === "move_selected") {
    //   moveSelectedMouseMove(dispatch);
    // }
  };

  const previewPoint = () => {
    const c = canvasPreview.current!.getContext("2d")!;
    clearPreview();
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
  };

  const previewNode = () => {
    const c = canvasPreview.current!.getContext("2d")!;
    clearPreview();
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
  };

  const previewLine = () => {
    const c = canvasPreview.current!.getContext("2d")!;
    clearPreview();
    c.beginPath();
    if (isFirstClicked) {
      c.moveTo(originPoint.x * scale, originPoint.y * scale);
      c.lineTo(mouseCoordinates.x * scale, mouseCoordinates.y * scale);
      c.closePath();
      c.strokeStyle = "orange";
      c.stroke();
    } else {
      previewPoint();
    }
  };

  const previewTextLine = () => {
    const c = canvasPreview.current!.getContext("2d")!;
    clearPreview();
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
  };

  const previewCircle = () => {
    const c = canvasPreview.current!.getContext("2d")!;
    clearPreview();
    c.beginPath();
    c.arc(
      mouseCoordinates.x * scale,
      mouseCoordinates.y * scale,
      20 * scale,
      0,
      Math.PI * 2
    );
    c.strokeStyle = "orange";
    c.stroke();
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    mode === "edit" && clearPreview();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseCoordinates, mode]);

  // const elementsContainer = document.getElementById(
  //   "elements-container"
  // ) as HTMLDivElement;

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
      ref={canvasPreview}
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
