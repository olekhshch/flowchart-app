import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { deleteSelected } from "../features/elements/elementsSlice";

const ConnectionsSelected = () => {
  const dispatch = useDispatch();

  const {
    selectedIds: { connections },
  } = useSelector((state: RootState) => state.elements);

  const overalCount = connections.length;

  return (
    <div>
      <h4>
        {overalCount} {overalCount !== 1 ? "connections" : "connection"}{" "}
        selected
      </h4>
      <ul>
        <li className="list">Move</li>
        <li className="list" onClick={() => dispatch(deleteSelected())}>
          Delete
        </li>
      </ul>
    </div>
  );
};

export default ConnectionsSelected;
