import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  clearSelection,
  selectElement,
} from "../features/elements/elementsSlice";
import { MenuContext } from "../context";
import { TypeOfElement } from "../features/elements/elementsTypes";

interface CircleProps {
  x: number;
  y: number;
  r: number;
  id: string;
  pointId: string;
  elementType: TypeOfElement;
}

const ChartCircle = ({ x, y, r, id, pointId, elementType }: CircleProps) => {
  const { selectedIds } = useSelector((state: RootState) => state.elements);
  const { scale } = useSelector((state: RootState) => state.general);
  const dispatch = useDispatch();

  const { setIsMenuOpen } = React.useContext(MenuContext);

  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey === false) {
      dispatch(clearSelection());
    }
    dispatch(selectElement({ elementId: id, elementType: "shape" }));
    dispatch(selectElement({ elementId: pointId, elementType: "point" }));
    setIsMenuOpen(true);
    e.stopPropagation();
  };

  return (
    <circle
      cx={x * scale}
      cy={y * scale}
      r={r * scale}
      stroke={
        selectedIds[`${elementType}s`].includes(id) ? "orange" : "var(--main)"
      }
      strokeWidth="2"
      fill="white"
      onClick={handleClick}
    />
  );
};

export default ChartCircle;
