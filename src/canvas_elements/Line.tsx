import React from "react";

interface LineProps {
  begPoint: { x: string; y: string };
  endPoint: { x: string; y: string };
}

const Line = ({ begPoint, endPoint }: LineProps) => {
  return (
    <svg width="100" height="100">
      <line
        x1={begPoint.x}
        x2={endPoint.x}
        y1={begPoint.y}
        y2={endPoint.y}
        strokeWidth={2}
        stroke="blue"
        style={{ cursor: "default" }}
      />
    </svg>
  );
};

export default Line;
