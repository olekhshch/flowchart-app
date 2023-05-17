import { ChartPoint } from "../features/elements/elementsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface LineProps {
  begPoint: ChartPoint;
  endPoint: ChartPoint;
}

const Line = ({ begPoint, endPoint }: LineProps) => {
  const { scale } = useSelector((state: RootState) => state.general);
  const x1 = begPoint.coordinates.x * scale;
  const y1 = begPoint.coordinates.y * scale;

  const x2 = endPoint.coordinates.x * scale;
  const y2 = endPoint.coordinates.y * scale;

  return (
    <>
      <line stroke="blue" strokeWidth="2" x1={x1} y1={y1} x2={x2} y2={y2} />
    </>
  );
};

export default Line;
