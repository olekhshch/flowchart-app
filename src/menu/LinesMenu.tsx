import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { deleteSelected } from "../features/elements/elementsSlice";

const LinesMenu = () => {
  const dispatch = useDispatch();

  const {
    selectedIds: { lines },
  } = useSelector((state: RootState) => state.elements);

  const overalCount = lines.length;

  return (
    <div>
      <h4>
        {overalCount} {overalCount > 1 ? "lines" : "line"} selected
      </h4>
      <ul>
        <li className="list">Move</li>
        <li className="list">Copy</li>
        <li className="list" onClick={() => dispatch(deleteSelected())}>
          Delete
        </li>
      </ul>
    </div>
  );
};

export default LinesMenu;
