import React, { useState } from "react";
import {
  BrokenLineDirection,
  ChartPoint,
  TypeOfElement,
} from "../features/elements/elementsTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  clearSelection,
  deselectElement,
  selectElement,
  setBrokenLineTurnCoord,
} from "../features/elements/elementsSlice";
import { MenuContext } from "../menuContext";

export type BrokenLineProps = {
  begPoint: ChartPoint;
  endPoint: ChartPoint;
  direction: BrokenLineDirection;
  turnCoordinate: number;
  id: string;
  elementType: TypeOfElement;
};

const BrokenLine = ({
  begPoint,
  endPoint,
  direction,
  turnCoordinate,
  id,
  elementType,
}: BrokenLineProps) => {
  const { scale, canvasCoordinates } = useSelector(
    (state: RootState) => state.general
  );

  const [isResizeClick, setIsResizeClick] = useState(false); // heps prevent selection action after moving the handle

  const checkIfResize = () => isResizeClick;

  const { selectedIds } = useSelector((state: RootState) => state.elements);
  const handle = React.useRef(null);

  const isSelected = () => {
    if (elementType === "connection") {
      return selectedIds.connections.includes(id);
    }
    return false;
  };

  const { setIsMenuOpen } = React.useContext(MenuContext);

  const dispatch = useDispatch();
  const xA = begPoint.coordinates.x * scale;
  const yA = begPoint.coordinates.y * scale;
  const xB = endPoint.coordinates.x * scale;
  const yB = endPoint.coordinates.y * scale;

  let x = turnCoordinate * scale;
  let y = yA;

  const handleClick = (e: React.MouseEvent) => {
    const isResize = checkIfResize();
    const isSelected = selectedIds[`${elementType}s`].includes(id);

    if (!e.shiftKey) {
      dispatch(clearSelection());
      if (isSelected) {
        dispatch(selectElement({ elementId: id, elementType }));
      }
    }

    if (
      e.shiftKey &&
      selectedIds[`${elementType}s`].includes(id) &&
      !isResize
    ) {
      dispatch(deselectElement({ elementId: id, elementType }));
    } else if (!checkIfResize()) {
      dispatch(selectElement({ elementId: id, elementType }));
      setIsMenuOpen(true);
    }
    setIsResizeClick(false);
    e.stopPropagation();
  };

  const handleMouseDownV = (e: React.MouseEvent) => {
    const x0 = e.clientX;

    const handleMouseMove = (ev: MouseEvent) => {
      const x = (ev.clientX - canvasCoordinates.left) / scale;
      dispatch(setBrokenLineTurnCoord({ id, newCoord: x }));
      setIsResizeClick(!(x0 > ev.clientX - 5 && x0 < ev.clientX + 5));
      if (selectedIds[`${elementType}s`].includes(id)) {
        setIsResizeClick(true);
      }
      ev.stopPropagation();
    };
    window.addEventListener("mousemove", handleMouseMove);
    const handleMouseUp = (event: MouseEvent) => {
      if (event.clientX === x0) {
        setIsResizeClick(false);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      event.stopPropagation();
    };
    window.addEventListener("mouseup", handleMouseUp);

    e.stopPropagation();
  };

  const handleMouseDownH = (e: React.MouseEvent) => {
    const y0 = e.clientY;

    const handleMouseMove = (ev: MouseEvent) => {
      const y = (ev.clientY - canvasCoordinates.top) / scale;
      dispatch(setBrokenLineTurnCoord({ id, newCoord: y }));
      setIsResizeClick(!(y0 > ev.clientY - 5 && y0 < ev.clientY + 5));
      if (selectedIds[`${elementType}s`].includes(id)) {
        setIsResizeClick(true);
      }
      ev.stopPropagation();
    };
    window.addEventListener("mousemove", handleMouseMove);
    const handleMouseUp = (event: MouseEvent) => {
      if (event.clientX === y0) {
        setIsResizeClick(false);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      event.stopPropagation();
    };
    window.addEventListener("mouseup", handleMouseUp);

    e.stopPropagation();
  };

  if (direction === "V") {
    return (
      <>
        <line
          x1={xA}
          x2={x}
          y1={yA}
          y2={y}
          strokeWidth="2"
          stroke={isSelected() ? "orange" : "var(--main)"}
          style={{ cursor: "default" }}
          onClick={handleClick}
        />
        <line
          x1={x}
          y1={y}
          x2={x}
          y2={yB}
          strokeWidth="2"
          stroke={isSelected() ? "orange" : "var(--main)"}
          onMouseDown={handleMouseDownV}
          onClick={handleClick}
          style={{ cursor: "col-resize" }}
          ref={handle}
        />
        <line
          x1={x}
          y1={yB}
          x2={xB}
          y2={yB}
          strokeWidth="2"
          stroke={isSelected() ? "orange" : "var(--main)"}
          style={{ cursor: "default" }}
          onClick={handleClick}
        />
      </>
    );
  }

  x = xA;
  y = turnCoordinate * scale;

  return (
    <>
      <line
        x1={xA}
        x2={x}
        y1={yA}
        y2={y}
        style={{ cursor: "default" }}
        strokeWidth="2"
        stroke={isSelected() ? "orange" : "var(--main)"}
        onClick={handleClick}
      />
      <line
        x1={x}
        y1={y}
        x2={xB}
        y2={y}
        strokeWidth="2"
        stroke={isSelected() ? "orange" : "var(--main)"}
        style={{ cursor: "row-resize" }}
        ref={handle}
        onMouseDown={handleMouseDownH}
        onClick={handleClick}
      />
      <line
        x1={xB}
        y1={y}
        x2={xB}
        y2={yB}
        strokeWidth="2"
        style={{ cursor: "default" }}
        stroke={isSelected() ? "orange" : "var(--main)"}
        onClick={handleClick}
      />
    </>
  );
};

export default BrokenLine;
