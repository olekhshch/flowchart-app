import React from "react";

type Props = {
  iconSize: number;
  colour: string;
  isPoint: boolean;
};

const CircleIcon = ({ iconSize, colour, isPoint }: Props) => {
  const center = iconSize * 0.5;
  const r = isPoint ? Math.floor(iconSize * 0.1) : Math.floor(center * 0.8);

  return (
    <svg width={iconSize} height={iconSize} className="icon">
      <circle
        cx={center}
        cy={center}
        r={r}
        stroke={colour}
        fill={isPoint ? "white" : "transparent"}
        strokeWidth={2}
      />
    </svg>
  );
};

export default CircleIcon;
