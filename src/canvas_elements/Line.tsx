import { ChartPoint, TypeOfElement } from "../features/elements/elementsTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  clearSelection,
  selectElement,
} from "../features/elements/elementsSlice";
import { useContext } from "react";
import { MenuContext } from "../context";

interface LineProps {
  begPoint: ChartPoint;
  endPoint: ChartPoint;
  elementId: string;
  elementType: TypeOfElement;
}

const Line = ({ begPoint, endPoint, elementId, elementType }: LineProps) => {
  const dispatch = useDispatch();
  const { setIsMenuOpen } = useContext(MenuContext);

  const { scale } = useSelector((state: RootState) => state.general);
  const { selectedIds } = useSelector((state: RootState) => state.elements);

  const x1 = begPoint.coordinates.x * scale;
  const y1 = begPoint.coordinates.y * scale;

  const x2 = endPoint.coordinates.x * scale;
  const y2 = endPoint.coordinates.y * scale;

  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey === false) {
      dispatch(clearSelection());
    }
    dispatch(selectElement({ elementId, elementType }));
    dispatch(selectElement({ elementId, elementType }));
    setIsMenuOpen(true);
    e.stopPropagation();
  };

  return (
    <>
      <line
        stroke={
          selectedIds[`${elementType}s`].includes(elementId)
            ? "orange"
            : "var(--main)"
        }
        strokeWidth="2"
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        style={{ cursor: "default" }}
        onClick={handleClick}
      />
    </>
  );
};

export default Line;
