import { createContext } from "react";
import { TypeOfElement } from "./features/elements/elementsTypes";

export interface MyContext {
  isMenuOpen: boolean;
  setIsMenuOpen: (a: boolean) => void;
  selectedOnly: `${TypeOfElement}s` | null;
  setSelectedOnly: (a: `${TypeOfElement}s` | null) => void;
}
const contextObj: MyContext = {
  isMenuOpen: false,
  setIsMenuOpen: (newValue) => {},
  selectedOnly: null,
  setSelectedOnly: (newType) => {},
};

export const MenuContext = createContext<MyContext>(contextObj);
