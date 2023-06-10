import React from "react";

type Props = {
  iconSize: number;
  colour: string;
};

const ConnectionIcon = ({ iconSize, colour }: Props) => {
  return (
    <svg width={iconSize} height={iconSize} className="icon">
      <path
        d={`M 4 4 h ${0.3 * iconSize} c 4 0, 4 0 ,4 4 v 0 ${
          0.6 * iconSize
        } c 0 4, 0 4, 4 4 h ${0.2 * iconSize}`}
        stroke={colour}
        strokeWidth="2"
        fill="transparent"
      ></path>
      <circle fill="white" cx="4" cy="4" r="4" />
    </svg>
  );
};

export default ConnectionIcon;
