import { Dispatch } from "@reduxjs/toolkit";
import {
  moveSelected,
  setOriginCoordinates,
} from "../features/elements/elementsSlice";

export const moveSelectedMouseMove = (dispatch: Dispatch) => {
  let IsOriginSet = false;
  const svgCont = document.getElementById("svg-cont")! as HTMLElement;

  const handleClick = () => {
    console.log(IsOriginSet);
    if (!IsOriginSet) {
      dispatch(setOriginCoordinates());
      IsOriginSet = true;
    }
  };
  svgCont.addEventListener("click", handleClick);
};
