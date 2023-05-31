import React from "react";
import {
  anchorPointPositions,
  setGlobalTriangleDir,
} from "../features/elements/elementsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

type props = { toCreate: boolean }; //depends if the menu is used to create a new triangle or to edit selected triangle(s)

const TriangleMenu = ({ toCreate }: props) => {
  const dispatch = useDispatch();
  const { triangle_dir, selectedIds } = useSelector(
    (state: RootState) => state.elements
  );

  return (
    <div>
      <h4>Triangle</h4>
      <p>Orientation: </p>
      <ul className="list-btns-cont">
        {anchorPointPositions.map((position) => {
          return (
            <li
              key={position}
              className={`${
                triangle_dir === position ? "list-buttons-selected" : ""
              } list-buttons`}
              onClick={() => dispatch(setGlobalTriangleDir(position))}
            >
              {position}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TriangleMenu;
