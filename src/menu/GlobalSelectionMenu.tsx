import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSelected,
  leaveSelected,
} from "../features/elements/elementsSlice";
import { MenuContext } from "../menuContext";
import {
  NameOfElementsArrayKey,
  TypeOfElement,
} from "../features/elements/elementsTypes";
import LinesMenu from "./LinesMenu";
import ConnectionsSelected from "./ConnectionsSelected";
import { setMode } from "../features/general/generalSlice";
import { RootState } from "../app/store";

interface MenuProps {
  selectedCount: MyCountType;
}

export type MyCountType = CountKeys & overalNumber;

type CountKeys = {
  [key in keyof TypeOfElement as `${TypeOfElement}s`]?: number;
};
type overalNumber = {
  overalNumber: number;
};

const GlobalSelectionMenu = ({ selectedCount }: MenuProps) => {
  const { originPoint } = useSelector((state: RootState) => state.elements);

  const selectedCountEntries = Object.entries(selectedCount).filter(
    ([key]) => !["anchor_points", "overalNumber"].includes(key)
  );

  const { selectedOnly, setSelectedOnly } = React.useContext(MenuContext);

  const dispatch = useDispatch();

  const handleClick = (key: `${TypeOfElement}s`) => {
    dispatch(leaveSelected(key));
    setSelectedOnly(key);
  };

  if (selectedOnly === "lines") {
    return <LinesMenu />;
  } else if (selectedOnly === "connections") {
    return <ConnectionsSelected />;
  }

  const movingSelectedMode = () => {
    dispatch(setMode("move_selected"));
  };

  return (
    <div>
      Selected: {selectedCount.overalNumber}
      <ul>
        {selectedCountEntries
          .filter(([key, value]) => value !== 0)
          .map(([key, value]) => {
            const keyVal = key as `${TypeOfElement}s`;
            return (
              <li
                key={keyVal}
                className="list"
                onClick={() => handleClick(keyVal)}
              >
                {key}: {value}
              </li>
            );
          })}
      </ul>
      <ul>
        <li className="list" onClick={movingSelectedMode}>
          Move
        </li>
        <li className="list">Copy</li>
        <li className="list" onClick={() => dispatch(deleteSelected())}>
          Delete
        </li>
      </ul>
    </div>
  );
};

export default GlobalSelectionMenu;
