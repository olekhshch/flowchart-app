import { createContext } from "react";
import { TypeOfElement } from "./features/elements/elementsTypes";

export type MenuCntxType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (a: boolean) => void;
  selectedOnly: `${TypeOfElement}s` | null;
  setSelectedOnly: (a: `${TypeOfElement}s` | null) => void;
};

const defaultObj: MenuCntxType = {
  isMenuOpen: false,
  setIsMenuOpen: (newValue) => {},
  selectedOnly: null,
  setSelectedOnly: (newType) => {},
};

export const MenuContext = createContext(defaultObj);
