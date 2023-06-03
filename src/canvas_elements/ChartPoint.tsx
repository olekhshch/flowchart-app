import React, { useContext } from "react";
import {
  addToDraft,
  clearDraft,
  clearSelection,
  connectTwoPoints,
  deselectElement,
  selectElement,
  setPointCoordinates,
} from "../features/elements/elementsSlice";
import {
  ChartPoint,
  PointCoordinates,
} from "../features/elements/elementsTypes";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setMode } from "../features/general/generalSlice";
import { MenuContext } from "../menuContext";

interface CPProps {
  point: ChartPoint;
  scale: number;
}

interface styledProps {
  coordinates: PointCoordinates;
  scale: number;
}

const ChartPointEl = ({ point, scale }: CPProps) => {
  const { setIsMenuOpen } = useContext(MenuContext);

  const dispatch = useDispatch();

  const { mode } = useSelector((state: RootState) => state.general);
  const { draft, selectedIds } = useSelector(
    (state: RootState) => state.elements
  );

  const [isSelected, setIsSelected] = React.useState(
    selectedIds.points.includes(point.id)
  );

  React.useEffect(() => {
    setIsSelected(selectedIds.points.includes(point.id));
  }, [selectedIds, setIsSelected, point]);

  const {
    coordinates: { x, y },
  } = point;

  const elCoord: PointCoordinates = {
    y: y - 3,
    x: x - 3,
  };

  const handleMouseDown = (ev: React.MouseEvent) => {
    const x0 = ev.clientX;
    const y0 = ev.clientY;
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const dX = x - x0;
      const dY = y - y0;
      const newX = point.coordinates.x + dX / scale;
      const newY = point.coordinates.y + dY / scale;
      dispatch(
        setPointCoordinates({
          pointId: point.id,
          coordinates: { newX, newY },
        })
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mouseup", handleMouseUp);
    ev.stopPropagation();
  };

  const handleClick = (e: React.MouseEvent) => {
    if (mode === "connect_points") {
      dispatch(addToDraft([point.id, point.type, point.coordinates, null]));
      if (draft.length === 1) {
        dispatch(setMode("edit"));
        dispatch(connectTwoPoints());
        dispatch(clearDraft());
        setIsMenuOpen(false);
      }
    } else {
      if (!e.shiftKey) {
        dispatch(clearSelection());
      }

      if (
        !e.ctrlKey ||
        (!selectedIds[`${point.type}s`].includes(point.id) && e.ctrlKey)
      ) {
        dispatch(
          selectElement({ elementId: point.id, elementType: point.type })
        );
        setIsMenuOpen(true);
      } else if (e.ctrlKey) {
        dispatch(
          deselectElement({ elementId: point.id, elementType: point.type })
        );
      }
    }
  };

  return (
    <Point
      coordinates={elCoord}
      scale={scale}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      data-point-type={point.type}
      data-id={point.id}
      style={{ backgroundColor: isSelected ? "orange" : "white" }}
    />
  );
};

export default ChartPointEl;

export const Point = styled.div`
  position: absolute;
  left: ${(props: styledProps) => props.coordinates.x * props.scale}px;
  top: ${(props: styledProps) => props.coordinates.y * props.scale}px;
  width: ${(props) => props.scale * 6}px;
  height: ${(props) => props.scale * 6}px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 50%;
  cursor: default;

  :hover {
    box-shadow: 0 0 3px black;
  }
`;
