import React from "react";
import styled from "styled-components";

interface APProps {
  position: "top" | "right" | "bottom" | "left";
}

interface styledProps {
  coordinates: { top: string; left: string };
}
const AnchorPoint = ({ position }: APProps) => {
  const coord = { top: "", left: "" };

  switch (position) {
    case "top":
      coord.top = "-3px";
      coord.left = "50% - 3px";
      break;
    case "right":
      coord.top = "50% - 3px";
      coord.left = "100% - 3px";
      break;
    case "bottom":
      coord.top = "100% - 3px";
      coord.left = "50% - 3px";
      break;
    case "left":
      coord.top = "50% - 3px";
      coord.left = "-3px";
  }

  return <Point coordinates={coord} onMouseDown={(e) => e.stopPropagation()} />;
};

export default AnchorPoint;

const Point = styled.div`
  position: absolute;
  left: calc(${(props: styledProps) => props.coordinates.left});
  top: calc(${(props: styledProps) => props.coordinates.top});
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
  cursor: default;

  :hover {
    box-shadow: 0 0 3px black;
  }
`;
