import React from "react";
import { useDispatch } from "react-redux";
import { leaveSelected } from "../features/elements/elementsSlice";
import { MenuContext } from "../menuContext";
import {
  NameOfElementsArrayKey,
  TypeOfElement,
} from "../features/elements/elementsTypes";
import LinesMenu from "./LinesMenu";

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
  const selectedCountEntries = Object.entries(selectedCount).filter(
    ([key, value]) => !["anchor_points", "overalNumber"].includes(key)
  );

  const { selectedOnly, setSelectedOnly } = React.useContext(MenuContext);

  const dispatch = useDispatch();

  const {} = selectedCount;

  const handleClick = (key: `${TypeOfElement}s`) => {
    dispatch(leaveSelected(key));
    setSelectedOnly(key);
  };

  if (selectedOnly === "lines") {
    return <LinesMenu />;
  }

  return (
    <div>
      Selected: {selectedCount.overalNumber}
      <ul>
        {selectedCountEntries
          .filter(([key, value]) => value !== 0)
          .map(([key, value]) => {
            const keyVal = key as `${TypeOfElement}s`;
            return (
              <li className="list" onClick={() => handleClick(keyVal)}>
                {key}: {value}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default GlobalSelectionMenu;
