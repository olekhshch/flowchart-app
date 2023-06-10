import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import {
  deleteSelected,
  setBegArrow,
  setEndArrow,
} from "../features/elements/elementsSlice";

const ConnectionsSelected = () => {
  const dispatch = useDispatch();

  const {
    selectedIds: { connections },
    elements,
  } = useSelector((state: RootState) => state.elements);

  const overalCount = connections.length;

  // checks if arrows are turned on for every selected connection
  let begArrowIsOn = false;
  let endArrowIsOn = false;
  let begCounter = 0;
  let endCounter = 0;
  connections.forEach((connectionId) => {
    const connection = elements.connections.find(
      (connection) => connection.id === connectionId
    );
    if (connection) {
      const { arrowBeg, arrowEnd } = connection;
      if (arrowBeg) {
        begCounter += 1;
      }
      if (arrowEnd) {
        endCounter += 1;
      }
    }
  });

  begArrowIsOn = begCounter === overalCount && begCounter > 0 ? true : false;
  endArrowIsOn = endCounter === overalCount && endCounter > 0 ? true : false;

  const setBegginingArrow = () => {
    dispatch(
      setBegArrow({
        ids: connections,
        elementType: "connection",
        isOn: !begArrowIsOn,
      })
    );
  };

  const setEndingArrow = () => {
    dispatch(
      setEndArrow({
        ids: connections,
        elementType: "connection",
        isOn: !endArrowIsOn,
      })
    );
  };

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
      <ul>
        <li className="flex gap-4">
          Arrows:
          <button
            className={`${begArrowIsOn && "btn-active"}`}
            onClick={setBegginingArrow}
          >
            Beginning
          </button>
          <button
            className={`${endArrowIsOn && "btn-active"}`}
            onClick={setEndingArrow}
          >
            Ending
          </button>
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default ConnectionsSelected;
