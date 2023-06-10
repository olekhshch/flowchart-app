import React from "react";

type Props = {
  iconSize: number;
  colour: string;
};

const LineIcon = ({ iconSize, colour }: Props) => {
  return (
    <svg width={iconSize} height={iconSize} className="icon">
      <line
        x1="0"
        y1="0"
        x2={iconSize}
        y2={iconSize}
        stroke={colour}
        strokeWidth="2"
      ></line>
    </svg>
  );
};

export default LineIcon;
