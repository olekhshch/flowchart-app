import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface CircleProps {
  x: number;
  y: number;
  r: number;
}

const ChartCircle = ({ x, y, r }: CircleProps) => {
  const { scale } = useSelector((state: RootState) => state.general);
  return (
    <circle
      cx={x * scale}
      cy={y * scale}
      r={r * scale}
      stroke="var(--main)"
      strokeWidth="2"
      fill="white"
    />
  );
};

export default ChartCircle;
