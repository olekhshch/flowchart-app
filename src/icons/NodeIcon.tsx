import React from "react";

type Props = {
  iconSize: number;
  colour: string;
  isTextLabel: boolean;
};

const NodeIcon = ({ iconSize, colour, isTextLabel }: Props) => {
  const rectY0 = Math.ceil(iconSize / 4);
  const nodeH = (0.5 * iconSize - rectY0) * 2;
  const rectY1 = rectY0 + nodeH;

  const rectX0 = Math.floor((iconSize / 2) * 0.3);
  const nodeW = (0.5 * iconSize - rectX0) * 2;
  const rectX1 = rectX0 + nodeW;

  return (
    <svg width={iconSize} height={iconSize} className="icon">
      <rect
        x={rectX0}
        y={rectY0}
        rx={nodeH * 0.2}
        ry={nodeH * 0.2}
        width={nodeW}
        height={nodeH}
        stroke={colour}
        strokeWidth="2"
        fill="transparent"
      ></rect>
      {isTextLabel && (
        <text
          x={rectX0 + 0.2 * nodeW}
          y={rectY0 + nodeH - 4}
          stroke={colour}
          fontSize={0.6 * nodeH}
          fontWeight="4"
        >
          txt
        </text>
      )}
    </svg>
  );
};

export default NodeIcon;
