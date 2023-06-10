import { ChartPoint, TypeOfElement } from "../features/elements/elementsTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  clearSelection,
  selectElement,
} from "../features/elements/elementsSlice";
import { useContext } from "react";
import { MenuContext } from "../menuContext";

interface LineProps {
  begPoint: ChartPoint;
  endPoint: ChartPoint;
  elementId: string;
  elementType: TypeOfElement;
  arrowEnd: boolean;
  arrowBeg: boolean;
}

const Line = ({
  begPoint,
  endPoint,
  elementId,
  elementType,
  arrowBeg,
  arrowEnd,
}: LineProps) => {
  const dispatch = useDispatch();
  const { setIsMenuOpen, selectedOnly, setSelectedOnly } =
    useContext(MenuContext);

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
    setIsMenuOpen(true);
    if (selectedOnly !== `${elementType}s`) {
      setSelectedOnly(null);
    }
    e.stopPropagation();
  };

  const lineAngle0 = Math.atan((y2 - y1) / (x2 - x1)) * (180 / Math.PI);

  const lineAngle = x2 > x1 ? lineAngle0 : lineAngle0 + 180;

  let xAbeg = x1;
  let yAbeg = y1;
  const XObeg = x1;
  const yObeg = y1;

  const begLinks = begPoint.linkedTo;
  const isLinkedToShapeBeg =
    begLinks.filter((link) => link.elementType === "shape").length > 0;
  if (isLinkedToShapeBeg) {
    xAbeg += 20 * scale;
  }

  let xAend = x2;
  let yAend = y2;
  const XOend = x2;
  const yOend = y2;

  const endLinks = endPoint.linkedTo;
  const isLinkedToShapeEnd =
    endLinks.filter((link) => link.elementType === "shape").length > 0;
  if (isLinkedToShapeEnd) {
    xAend -= 20 * scale;
  }

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
      {arrowBeg && (
        <g
          transform={`rotate(${lineAngle}, ${XObeg}, ${yObeg})`}
          style={{ cursor: "default" }}
          onClick={handleClick}
        >
          <polygon
            points={`${xAbeg}, ${yAbeg} ${xAbeg + 20 * scale}, ${yAbeg} ${
              xAbeg + 20 * scale
            }, ${yAbeg - 6 * scale}`}
            fill={
              selectedIds[`${elementType}s`].includes(elementId)
                ? "orange"
                : "var(--main)"
            }
          />
          <polygon
            points={`${xAbeg}, ${yAbeg} ${xAbeg + 20 * scale}, ${yAbeg} ${
              xAbeg + 20 * scale
            }, ${yAbeg + 6 * scale}`}
            fill={
              selectedIds[`${elementType}s`].includes(elementId)
                ? "orange"
                : "var(--main)"
            }
          />
        </g>
      )}
      {arrowEnd && (
        <g
          transform={`rotate(${lineAngle}, ${XOend}, ${yOend})`}
          style={{ cursor: "default" }}
          onClick={handleClick}
        >
          <polygon
            points={`${xAend}, ${yAend} ${xAend - 20 * scale}, ${yAend} ${
              xAend - 20 * scale
            }, ${yAend - 6 * scale}`}
            fill={
              selectedIds[`${elementType}s`].includes(elementId)
                ? "orange"
                : "var(--main)"
            }
          />
          <polygon
            points={`${xAend}, ${yAend} ${xAend - 20 * scale}, ${yAend} ${
              xAend - 20 * scale
            }, ${yAend + 6 * scale}`}
            fill={
              selectedIds[`${elementType}s`].includes(elementId)
                ? "orange"
                : "var(--main)"
            }
          />
        </g>
      )}
    </>
  );
};

export default Line;
