import React from "react";

type Props = {
  iconSize: number;
  colour: string;
};

const TriangleIcon = ({ iconSize, colour }: Props) => {
  const half = iconSize / 2;
  return (
    <svg width={iconSize} height={iconSize} className="icon">
      <polygon
        points={`1, ${half} ${half}, 1 ${iconSize}, ${half}`}
        stroke={colour}
        strokeWidth="2"
        fill="transparent"
      />
      <polygon
        points={`1, ${half} ${half}, ${iconSize} ${iconSize}, ${half}`}
        stroke={colour}
        strokeWidth="1"
        strokeDasharray="6 4"
        fill="transparent"
      />
    </svg>
  );
};

export default TriangleIcon;
